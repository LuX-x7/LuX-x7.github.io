"""
ddpm_minimal.py —— 扩散模型（DDPM）的最小可运行实现
====================================================================
对应正文式 (2.x)（前向闭式解）、式 (4.x)（简化损失）与算法 1 / 算法 2。

为了让它在 CPU 上几秒钟就能跑完，这里用二维玩具数据：
八个高斯构成的环。训练完成后可以直接看到采样结果。

依赖：torch（必需）、matplotlib（可选，用于画图）。用法：

    python code/ddpm_minimal.py

作者注：这段代码的目的是“逐行对照公式”，因此刻意不做任何工程优化，
不要拿它去训真正的图像模型。
"""

from __future__ import annotations

import math

import torch
import torch.nn as nn

# ----------------------------------------------------------------------------
# 1. 噪声调度：线性调度，abt_t = prod_{s<=t} alpha_s
# ----------------------------------------------------------------------------
T = 200                                   # 为了跑得快，只取 200 步
beta = torch.linspace(1e-4, 2e-2, T)      # beta_t
alpha = 1.0 - beta                        # alpha_t = 1 - beta_t
abar = torch.cumprod(alpha, dim=0)        # abar_t


def q_sample(x0: torch.Tensor, t: torch.Tensor, noise: torch.Tensor) -> torch.Tensor:
    """前向闭式解（正文命题 2.1）：

        x_t = sqrt(abar_t) * x0 + sqrt(1 - abar_t) * noise

    注意它是一步算出来的，不需要真的走 t 步 —— 这正是训练代价与 T 无关的原因。
    """
    shape = (-1,) + (1,) * (x0.dim() - 1)
    a = abar[t].sqrt().view(shape)
    s = (1.0 - abar[t]).sqrt().view(shape)
    return a * x0 + s * noise


# ----------------------------------------------------------------------------
# 2. 把一个时间步 t 编码成输入特征（原论文用正弦位置编码）
# ----------------------------------------------------------------------------
def time_embedding(t: torch.Tensor, dim: int = 32) -> torch.Tensor:
    half = dim // 2
    freqs = torch.exp(-math.log(10000.0) * torch.arange(half, dtype=torch.float32) / half)
    ang = t.float().unsqueeze(1) * freqs.unsqueeze(0)
    return torch.cat([ang.sin(), ang.cos()], dim=1)


class NoisePredictor(nn.Module):
    """噪声预测网络 eps_theta(x_t, t) —— 结构本身不是重点。"""

    def __init__(self, dim: int = 2, hidden: int = 128):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(dim + 32, hidden), nn.SiLU(),
            nn.Linear(hidden, hidden), nn.SiLU(),
            nn.Linear(hidden, hidden), nn.SiLU(),
            nn.Linear(hidden, dim),
        )

    def forward(self, x: torch.Tensor, t: torch.Tensor) -> torch.Tensor:
        return self.net(torch.cat([x, time_embedding(t, 32)], dim=1))


# ----------------------------------------------------------------------------
# 3. 玩具数据：二维平面上的八个高斯（环状排布）
# ----------------------------------------------------------------------------
def sample_data(n: int) -> torch.Tensor:
    k = torch.randint(0, 8, (n,))
    center = torch.stack([
        2.0 * math.cos(k * math.pi / 4.0),
        2.0 * math.sin(k * math.pi / 4.0),
    ], dim=1)
    return center + 0.18 * torch.randn(n, 2)


# ----------------------------------------------------------------------------
# 4. 训练：算法 1
# ----------------------------------------------------------------------------
def train(model: NoisePredictor, steps: int = 4000, batch: int = 256, lr: float = 2e-3):
    opt = torch.optim.Adam(model.parameters(), lr=lr)
    for it in range(1, steps + 1):
        x0 = sample_data(batch)                              # 干净样本
        t = torch.randint(0, T, (batch,))                    # 随机噪声等级
        noise = torch.randn_like(x0)                         # 随机噪声
        xt = q_sample(x0, t, noise)                          # 一步合成 x_t
        loss = ((model(xt, t) - noise) ** 2).mean()          # 看图猜噪声
        opt.zero_grad()
        loss.backward()
        opt.step()
        if it % 500 == 0:
            print(f"[train] step {it:5d}  loss = {loss.item():.4f}")
    return model


# ----------------------------------------------------------------------------
# 5. 采样：算法 2
# ----------------------------------------------------------------------------
@torch.no_grad()
def sample(model: NoisePredictor, n: int, sigma_mode: str = "beta") -> torch.Tensor:
    """
    sigma_mode = "beta" : sigma_t^2 = beta_t          （随机采样，DDPM 论文选项之一）
    sigma_mode = "zero" : sigma_t   = 0                （确定性采样，结果可复现）
    """
    x = torch.randn(n, 2)                                  # x_T ~ N(0, I)
    for ti in reversed(range(T)):
        t = torch.full((n,), ti, dtype=torch.long)
        eps = model(x, t)
        a_t, ab = alpha[ti], abar[ti]
        # 由预测的噪声得到这一步的均值（正文式 (4.x)）
        mean = (x - beta[ti] / (1.0 - ab).sqrt() * eps) / a_t.sqrt()
        if sigma_mode == "beta" and ti > 0:
            x = mean + beta[ti].sqrt() * torch.randn_like(x)
        else:
            x = mean
    return x


# ----------------------------------------------------------------------------
# 6. 主流程
# ----------------------------------------------------------------------------
def main() -> None:
    torch.manual_seed(0)
    model = NoisePredictor()
    train(model, steps=4000)

    for mode in ("beta", "zero"):
        xs = sample(model, n=512, sigma_mode=mode)
        # 用“到最近数据簇中心的平均距离”做一个非常粗糙的质量指标
        centers = torch.stack([
            2.0 * torch.cos(torch.arange(8) * math.pi / 4.0),
            2.0 * torch.sin(torch.arange(8) * math.pi / 4.0),
        ], dim=1)
        d = torch.cdist(xs, centers).min(dim=1).values.mean().item()
        print(f"[sample] sigma={mode:4s}  mean-dist-to-centers = {d:.3f}  "
              f"(越小越贴合八个高斯簇)")

    # 可选：画图
    try:
        import matplotlib
        matplotlib.use("Agg")
        import matplotlib.pyplot as plt

        fig, axes = plt.subplots(1, 3, figsize=(9, 3), sharex=True, sharey=True)
        axes[0].scatter(*sample_data(1024).T, s=4, alpha=0.5)
        axes[0].set_title("data")
        axes[1].scatter(*sample(model, 1024, "beta").T, s=4, alpha=0.5)
        axes[1].set_title(r"DDPM  $\sigma_t^2=\beta_t$")
        axes[2].scatter(*sample(model, 1024, "zero").T, s=4, alpha=0.5)
        axes[2].set_title(r"DDPM  $\sigma_t=0$")
        for ax in axes:
            ax.set_aspect("equal")
        fig.tight_layout()
        fig.savefig("ddpm_minimal.png", dpi=150)
        print("[plot] 已保存 ddpm_minimal.png")
    except Exception as exc:  # pragma: no cover
        print(f"[plot] 跳过绘图：{exc}")


if __name__ == "__main__":
    main()
