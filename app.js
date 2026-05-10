/* ============================================================
   GeoCart Spatial Toolkit — Core JavaScript Utilities
   Shared across all modules
   ============================================================ */

'use strict';

// ── Theme Manager ──────────────────────────────────────────
const ThemeManager = {
  STORAGE_KEY: 'geocart-theme',

  init() {
    const saved = localStorage.getItem(this.STORAGE_KEY) || 'dark';
    this.apply(saved);
  },

  toggle() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    this.apply(next);
  },

  apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(this.STORAGE_KEY, theme);
    // Update all toggle button icons on page
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.textContent = theme === 'dark' ? '☀' : '☾';
      btn.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    });
  }
};

// ── Toast Notification System ──────────────────────────────
const Toast = {
  container: null,

  init() {
    if (!document.getElementById('toast-container')) {
      this.container = document.createElement('div');
      this.container.id = 'toast-container';
      document.body.appendChild(this.container);
    } else {
      this.container = document.getElementById('toast-container');
    }
  },

  show(message, type = 'info', duration = 3500) {
    if (!this.container) this.init();
    const icons = { success: '✓', error: '✕', info: '●', warning: '▲' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span style="color:var(--${type === 'info' ? 'accent' : type})">${icons[type]}</span> ${message}`;
    this.container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  success(msg) { this.show(msg, 'success'); },
  error(msg)   { this.show(msg, 'error'); },
  info(msg)    { this.show(msg, 'info'); },
  warning(msg) { this.show(msg, 'warning'); }
};

// ── Copy to Clipboard ──────────────────────────────────────
function copyToClipboard(text, btn) {
  if (!text || text === '—' || text === '') return;
  navigator.clipboard.writeText(text).then(() => {
    if (btn) {
      btn.textContent = 'COPIED';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = 'COPY';
        btn.classList.remove('copied');
      }, 2000);
    }
    Toast.success('Copied to clipboard');
  }).catch(() => {
    // Fallback for older browsers
    const el = document.createElement('textarea');
    el.value = text;
    el.style.position = 'fixed';
    el.style.opacity = '0';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    if (btn) {
      btn.textContent = 'COPIED';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = 'COPY'; btn.classList.remove('copied'); }, 2000);
    }
    Toast.success('Copied to clipboard');
  });
}

// ── Modal Manager ──────────────────────────────────────────
const ModalManager = {
  open(id) {
    const overlay = document.getElementById(id);
    if (overlay) {
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  },
  close(id) {
    const overlay = document.getElementById(id);
    if (overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  },
  closeAll() {
    document.querySelectorAll('.modal-overlay.active').forEach(el => {
      el.classList.remove('active');
    });
    document.body.style.overflow = '';
  }
};

// Close modal on overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    ModalManager.closeAll();
  }
});

// ── Tab System ─────────────────────────────────────────────
function initTabs(containerEl) {
  if (!containerEl) return;
  const tabs = containerEl.querySelectorAll('.tab');
  const panels = containerEl.querySelectorAll('.tab-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.target);
      if (target) target.classList.add('active');
    });
  });

  // Activate first tab if none active
  if (!containerEl.querySelector('.tab.active')) {
    tabs[0]?.click();
  }
}

// ── Format Utilities ──────────────────────────────────────
const Format = {
  number(n, decimals = 4) {
    if (n === null || n === undefined || isNaN(n)) return '—';
    return Number(n).toFixed(decimals);
  },
  area(sqm) {
    if (!sqm || isNaN(sqm)) return '—';
    if (sqm >= 1e6) return `${(sqm / 1e6).toFixed(4)} km²`;
    if (sqm >= 1e4) return `${(sqm / 1e4).toFixed(4)} ha`;
    return `${sqm.toFixed(2)} m²`;
  },
  distance(m) {
    if (!m || isNaN(m)) return '—';
    if (m >= 1000) return `${(m / 1000).toFixed(3)} km`;
    return `${m.toFixed(2)} m`;
  },
  date(d) {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('en-KE', {
      year: 'numeric', month: 'short', day: '2-digit'
    });
  },
  duration(mins) {
    if (!mins || isNaN(mins)) return '—';
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  }
};

// ── LocalStorage Helpers ──────────────────────────────────
const Store = {
  get(key, fallback = null) {
    try {
      const val = localStorage.getItem(key);
      return val !== null ? JSON.parse(val) : fallback;
    } catch { return fallback; }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      Toast.error('Storage full — unable to save');
      return false;
    }
  },
  remove(key) { localStorage.removeItem(key); },
  clear(prefix) {
    if (prefix) {
      Object.keys(localStorage).filter(k => k.startsWith(prefix)).forEach(k => localStorage.removeItem(k));
    } else {
      localStorage.clear();
    }
  }
};

// ── CSV Export ────────────────────────────────────────────
function exportCSV(data, filename, headers) {
  if (!data || data.length === 0) {
    Toast.warning('No data to export');
    return;
  }
  const keys = headers || Object.keys(data[0]);
  const csv = [
    keys.join(','),
    ...data.map(row => keys.map(k => {
      const v = row[k] ?? '';
      return `"${String(v).replace(/"/g, '""')}"`;
    }).join(','))
  ].join('\r\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
  Toast.success(`Exported: ${filename}`);
}

// ── CSV Import ────────────────────────────────────────────
function importCSV(file) {
  return new Promise((resolve, reject) => {
    if (!file || !file.name.endsWith('.csv')) {
      reject(new Error('Please select a .csv file'));
      return;
    }
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const lines = e.target.result.split(/\r?\n/).filter(l => l.trim());
        const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
        const rows = lines.slice(1).map(line => {
          const vals = line.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || [];
          const row = {};
          headers.forEach((h, i) => {
            row[h] = (vals[i] || '').replace(/^"|"$/g, '').trim();
          });
          return row;
        }).filter(r => Object.values(r).some(v => v));
        resolve({ headers, rows });
      } catch (err) {
        reject(new Error('CSV parse error: ' + err.message));
      }
    };
    reader.onerror = () => reject(new Error('File read error'));
    reader.readAsText(file);
  });
}

// ── GeoJSON Export ─────────────────────────────────────────
function exportGeoJSON(geojson, filename) {
  const blob = new Blob([JSON.stringify(geojson, null, 2)], { type: 'application/geo+json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
  Toast.success(`Exported: ${filename}`);
}

// ── ID Generator ──────────────────────────────────────────
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// ── Debounce ──────────────────────────────────────────────
function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// ── Global Init ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  Toast.init();
  // Bind all theme toggles on page
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', () => ThemeManager.toggle());
  });
  // Init tabs
  document.querySelectorAll('[data-tabs]').forEach(el => initTabs(el));
});
