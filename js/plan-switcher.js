/**
 * プラン切り替えモジュール（モック用）
 * 全ページで共通利用。localStorageでプラン状態を管理。
 */
(function() {
  const PLANS = [
    { id: 'free', label: '無料', color: '#6b7280', bgClass: 'bg-gray-500' },
    { id: 'plan1', label: 'プラン1', color: '#3b82f6', bgClass: 'bg-blue-500' },
    { id: 'plan2', label: 'プラン2', color: '#f59e0b', bgClass: 'bg-amber-500' }
  ];

  function getCurrentPlan() {
    return localStorage.getItem('mockPlan') || 'free';
  }

  function setCurrentPlan(planId) {
    localStorage.setItem('mockPlan', planId);
    updateUI();
    // カスタムイベントを発火（各ページのAlpineコンポーネントで利用可能）
    window.dispatchEvent(new CustomEvent('planChanged', { detail: { plan: planId } }));
  }

  function getPlanInfo(planId) {
    return PLANS.find(p => p.id === planId) || PLANS[0];
  }

  function updateUI() {
    const current = getCurrentPlan();
    document.querySelectorAll('[data-plan-btn]').forEach(btn => {
      const planId = btn.getAttribute('data-plan-btn');
      const plan = getPlanInfo(planId);
      if (planId === current) {
        btn.style.background = plan.color;
        btn.style.color = '#fff';
        btn.style.borderColor = plan.color;
      } else {
        btn.style.background = 'rgba(55, 65, 81, 0.5)';
        btn.style.color = '#9ca3af';
        btn.style.borderColor = 'rgba(75, 85, 99, 0.5)';
      }
    });
    // バッジ更新
    document.querySelectorAll('[data-plan-badge]').forEach(badge => {
      const plan = getPlanInfo(current);
      badge.textContent = plan.label;
      badge.style.background = plan.color + '33';
      badge.style.color = plan.color;
    });
  }

  function createSwitcherHTML() {
    const container = document.createElement('div');
    container.id = 'plan-switcher';
    container.style.cssText = 'position:fixed;top:8px;right:8px;z-index:9999;display:flex;align-items:center;gap:2px;background:rgba(17,24,39,0.95);border:1px solid rgba(75,85,99,0.5);border-radius:8px;padding:3px;backdrop-filter:blur(8px);';

    const label = document.createElement('span');
    label.textContent = '🛠️';
    label.style.cssText = 'font-size:10px;padding:0 4px;';
    container.appendChild(label);

    PLANS.forEach(plan => {
      const btn = document.createElement('button');
      btn.setAttribute('data-plan-btn', plan.id);
      btn.textContent = plan.label;
      btn.style.cssText = 'font-size:10px;padding:3px 8px;border-radius:6px;border:1px solid transparent;cursor:pointer;transition:all 0.2s;font-weight:500;white-space:nowrap;';
      btn.addEventListener('click', () => setCurrentPlan(plan.id));
      container.appendChild(btn);
    });

    return container;
  }

  // DOM Ready時にスイッチャーを挿入
  function init() {
    document.body.appendChild(createSwitcherHTML());
    updateUI();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // グローバルAPI
  window.PlanSwitcher = {
    getCurrentPlan,
    setCurrentPlan,
    getPlanInfo,
    PLANS
  };
})();
