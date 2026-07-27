class Component extends DCLogic {
  CHARACTERS = [];
  TYPES = ['吧唧','色纸','立牌','拍立得','麻将','镭射票','海报','透卡','亚克力挂件','娃','团子','毛绒挂件','实用周边','其他'];
  STATUSES = ['已下单','待补款','已补款','待尾款','已尾款','排发中','已发货','已归家','已出物'];
  STATUS_COLOR = {'已归家':'#12a85f','已到货':'#12a85f','已发货':'#2f6fdb','在途/运输中':'#c8860d','待补款':'#d9701f','已补款':'#2f6fdb','待尾款':'#d9701f','已尾款':'#2f6fdb','排发中':'#7c5cd6','已下单未发货':'#2f6fdb','想要/计划购买':'#7c5cd6','出售中':'#d9701f','已出物':'#6f6996','已出/已卖出':'#6f6996'};
  FORMS = ['通用','人脸','皮套'];
  TRADE_TAGS = ['hold','转单资料','提确','补邮','补车马','定尾','捆','包邮','可刀','不刀'];
  GLOSSARY = { '空气谷':'已购买但尚未收到的谷子（在途 / 待补款 / 待尾款 / 排发中都算）。','已归家':'已经收到、真正摆进柜子里的谷子。','已出物':'已卖出或正在出售的谷子。','海景':'高溢价、很贵才能拿下的谷子。','湖景':'溢价没海景那么夸张，中等价位。','梦情':'非常想要、情有独钟的本命谷。','普谷':'原价或平价就能买到的普通谷子。','绝版':'已停产、官方不再补货。','再贩':'官方重新贩售的批次。','受注':'接受预订后再生产（受注生产）。','在库':'现货、有库存可直接买。','头铁产物':'明知贵/风险大还是冲了。','赌博产物':'盲抽/一番赏这类靠运气抽到的。','回血':'卖出后赚回成本，甚至盈利。','置换':'盲抽到的谷子换成自己想要的款。','收现':'盲抽后不留货，直接折现给别人。','自抽':'自己抽到的，不置换不收现。','抱盒':'整盒一次性购入。','单领':'只领取其中单个，不整套买。','hold':'先占着 / 保留，暂不确认。','转单资料':'把订单转让给别人。','提确':'提醒确认（催付款 / 催发货）。','可刀':'可以还价。','不刀':'一口价，不还价。' };
  RARITY_TAGS = ['梦情','湖景','海景','普谷','绝版','再贩','受注','在库','头铁产物','赌博产物'];
  REMINDER_TYPES = ['补款','尾款','排发','到货','集运'];
  CHANNELS = ['团名','群名','其他'];
  SOURCES = ['日谷','国谷','同人'];
  SOURCE_METHODS = {
    '日谷': ['通贩','场贩','代购','代理','扫街','拼团','抱盒','单买','盲抽','二手'],
    '国谷': ['通贩','场贩','拼团','单买','抱盒','盲抽','二手'],
    '同人': ['通贩','场贩','拼团','单买','代购','二手']
  };
  SOURCE_PLATFORMS = {
    '日谷': ['东映','PB官店','A店','AmiAmi','Movic官店','骏河屋','煤炉','日拍','曼达拉','甜瓜','虎穴','乐天','日亚','K书','指南针','其他'],
    '国谷': ['淘宝','天猫','京东','拼多多','抖音','微信','QQ群','微博','小红书','哔哩哔哩','漫展','线下店','其他'],
    '同人': ['微博','小红书','QQ群','微信','淘宝','闲鱼','CP展','Comicup','CWT','Booth','Pixiv Factory','其他']
  };
  MAIN_WORK = 'w_main';
  ALL_WORKS = '__all__';
  DEFAULT_GROUP = '自定义系列';
  SUPA_URL = 'https://kgifcpdajnyhxxmenazz.supabase.co';
  SUPA_KEY = 'sb_publishable_Bvg4r_n3JiokW3cY3NDo3A_9M2CNfaU';
  SUPA_IMAGE_BUCKET = 'goods-images';
  SUPA_SHIPPING_BUCKET = 'goods_shipping';
  CLOUD_IMAGE_MAX_SIDE = 960;
  CLOUD_IMAGE_MAX_BYTES = 220 * 1024;
  CLOUD_IMAGE_QUALITY = 0.72;
  PLATFORM_BRAND = { 'PB官店': '万代', 'Premium Bandai': '万代', '万代官网': '万代', 'Movic官店': 'Movic', '东映': '东映', '安利美特': 'Animate', 'A店': 'Animate' };
  FIELD_DEFAULTS = { character: '角色', type: '种类', series: '系列', channel: '平台', purchaseChannel: '渠道', status: '状态', form: '形态', acquire: '来源', method: '购买方式', tags: '交易标签', rarity: '稀有度 / 心动标签', set: '系列收藏 / 套装' };
  CHAR_IMG = { '诺克斯': 'assets/c_nox.webp', 'NOX': 'assets/r_blue.webp', 'MIDNIGHT SHADOW': 'assets/r_nox_midnight.webp', 'NOX KNIGHT': 'assets/r_lady.webp', 'ZEZTZ': 'assets/r_red.webp', '西格': 'assets/c_zeke.webp', 'DAWN': 'assets/r_zeztz.webp', '宁梦': 'assets/c_nemu.webp', '南云成华': 'assets/c_nagumo.webp', 'ZERO': 'assets/c_zero.webp', '万津莫': 'assets/c_matsu.webp', '万津美浪': 'assets/c_minami.webp', '富士见铁也': 'assets/c_fujimi.webp', 'THE LADY': 'assets/c_lady.webp', 'CODE': 'assets/c_code.webp' };
  imgUrls = {};
  cloudImageMap = {};
  state = { items: [], view: null, shipWatermark: (function(){try{return localStorage.getItem('zzz_ship_watermark')!=='0';}catch(e){return true;}})(), sets: [], lastSetId: '', setMenuOpen: false, feeOpen: false, colInfoOpen: false, setInfoOpen: false, recentWorks: [], collapsedGroups: {}, reminderMenuOpen: false, monthlyBudget: '', budgets: {}, ledgerDetailKey: '', ledgerDetailType: 'day', ledgerDetailLabel: '', tableSortKey: '', tableSortDir: 'desc', tableHiddenCols: [], tableColumnMenuOpen: false, nameStyleMode: 'default', displayMode: 'standard', dashboardCards: null, group: 'all', groupBy: 'none', search: '', charSel: [], typeSel: [], seriesFilter: '全部', formSel: [], statusSel: [], acquireSel: [], channelSel: [], purchaseChannelSel: [], customFilterSel: {}, customFilterOrder: {}, channels: [], channelMenuOpen: false, purchaseChannels: [], purchaseChannelMenuOpen: false, typesList: [], typeMenuOpen: false, seriesList: [], seriesMenuOpen: false, formMenuOpen: false, statusMenuOpen: false, acquireMenuOpen: false, reminderTypes: [], hiddenTypes: [], hiddenChannels: [], hiddenPurchaseChannels: [], works: [], currentWorkId: 'w_main', workGroupLabel: '系列IP', workMenuOpen: false, mobileMode: 'auto', filtersOpen: false, fieldLabels: {}, filterOn: { character: true, type: true, series: true, form: true, acquire: true, channel: true, purchaseChannel: true, status: false }, statsOn: null, deletedFields: [], customFields: [], optBuf: {}, settingsOpen: false, dataManageOpen: false, settingsDraft: null, collectorName: '', currency: '', accent: '', sbUrl: '', sbKey: '', sbStatus: '', cloudSyncId: '', cloudSyncCode: '', cloudCodeInput: '', cloudStatus: '', cloudBusy: false, cloudPending: false, cloudLastSyncedAt: '', cloudRemoteUpdatedAt: '', modalOpen: false, editing: null, draft: null, savedAt: 0, batchMode: false, selectedIds: [], bulkEditIds: [], bulkEditIndex: 0, ledgerRange: 'month', ledgerMode: 'month', ledgerYear: String(new Date().getFullYear()), ledgerMonth: String(new Date().getMonth()+1), ledgerWeek: '', ledgerPieBy: 'character', ledgerPieActive: 0, batchEditOpen: false, batchEditField: '', batchOn: null, shippingOpen: false, shippingRecords: [], shippingBatches: [], shippingDraft: null, shippingPreviewNotice: '', shippingPreviewPaid: '', shippingPreviewCn: '', shippingPreviewGroup: '', shippingPreviewBatch: '', shippingPreviewPackageKey: '', itemEvidenceDrafts: [], itemEvidenceExistingIds: [], itemEvidenceOpen: false, exportGroup: '', exportSearch: '', exportIds: [], shipAddCollapsed: true, shippingViewChannel: null, relinkRecordId: null, relinkItemIds: [], relinkSearch: '', relinkNote: '', relinkGroup: '', relinkNoteOpen: false, relinkImages: [], relinkNewFiles: [], relinkRecordType: '', mobileMineOpen: false, cloudPageOpen: false, modalTab: 'edit', shippingRolesCustom: (() => { try { return JSON.parse(localStorage.getItem('zzz_shipping_roles') || '{}') || {}; } catch (e) { return {}; } })(), shipRoleManageOpen: false, shipRoleManageType: '', itemShipDraftOpen: false, itemShipItemsPanelOpen: false, linkExistingShipOpen: false, linkExistingSearch: '', linkExistingChannel: '', genericSelectOpen: false, genericSelectTitle: '', genericSelectOptions: [], genericSelectValue: '', genericSelectAnchor: null, authReady: true, authUser: (function(){ try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (/^sb-.*-auth-token$/.test(k) && localStorage.getItem(k)) return { provisional: true, user_metadata: {} }; } } catch (e) {} return null; })(), syncConflict: null, syncConflictChoice: '', initialSyncReady: false, authMode: 'login', authUsername: '', authPassword: '', authPassword2: '', authError: '', authBusy: false };

  setRoot = (el) => { this.rootEl = el; if (el) { this.applyThemeVars(); this.applyBg(); } };
  applyThemeVars() {
    const a = this.state.accent || this.props.accent || '#ff3355';
    const vars = {
      '--accent': a,
      '--accent-soft': this.accentAlpha(0.12),
      '--accent-softer': this.accentAlpha(0.06),
      '--accent-border': this.accentAlpha(0.22),
      '--accent-shadow': this.accentAlpha(0.13),
      '--accent-bg-a': this.accentLight(0.96),
      '--accent-bg-b': this.accentLight(0.9),
      '--accent-bg-c': this.accentLight(0.84)
    };
    [this.rootEl, document.documentElement].forEach(el => {
      if (!el || !el.style) return;
      Object.keys(vars).forEach(k => el.style.setProperty(k, vars[k]));
    });
  }
  setImportRef = (el) => { this.importRef = el; };
  setExcelImportRef = (el) => { this.excelImportRef = el; };
  stop = (e) => { if (e && e.stopPropagation) e.stopPropagation(); };
  legacyVendorOf(it) { return String((it && (it.vendor || it.maker || it.manufacturer || it.factory || it.brand || it['厂商'])) || '').trim(); }

  componentDidMount() {
    let items = [], hasStoredItems = false;
    try { const raw = localStorage.getItem('zzz_goods_v1'); if (raw != null) { hasStoredItems = true; items = JSON.parse(raw) || []; } } catch (e) { items = []; }
    if (!Array.isArray(items)) items = [];
    if (!hasStoredItems && !items.length) { items = this.samples(); }
    // 仅补全缺失的新字段默认值（不覆盖任何已有值）；历史厂商字段只复制到平台，不删除原字段。
    items = items.map(it => {
      const next = { form: '通用', series: '', heat: 0, rate: '', otherFee: '', supplementPriceDate: '', finalPriceDate: '', shipDomDate: '', shipIntlDate: '', otherFeeDate: '', sellDate: '', acquire: '', method: '', purchaseChannel: '', stockDays: '', swapped: '未置换', swapTo: '', swapCharacter: '', swapImageId: null, imageId2: null, imageId3: null, imageId4: null, group: '收藏', workId: 'w_main', reminderType: '', reminderDate: '', specialType: '', specialDate: '', setName: '', setTotal: '', setVariant: '', timeline: [], tags: [], rarity: [], ...it };
      const legacyVendor = this.legacyVendorOf(next);
      if (!next.channel && legacyVendor) next.channel = legacyVendor;
      return next;
    });
    items.forEach(it => { if (!it.workId) it.workId = 'w_main'; });
    try { localStorage.setItem('zzz_goods_v1', JSON.stringify(items)); } catch (e) {}
    // 作品 / 系列IP
    let works = null; try { works = JSON.parse(localStorage.getItem('zzz_works') || 'null'); } catch (e) {}
    if (!Array.isArray(works) || !works.length) works = [{ id: 'w_main', group: this.DEFAULT_GROUP, name: '默认作品' }];
    let currentWorkId = localStorage.getItem('zzz_current_work') || this.ALL_WORKS;
    if (currentWorkId !== this.ALL_WORKS && !works.some(w => w.id === currentWorkId)) currentWorkId = this.ALL_WORKS;
    let recentWorks = []; try { recentWorks = JSON.parse(localStorage.getItem('zzz_recent_works') || '[]') || []; } catch (e) {}
    recentWorks = recentWorks.filter(id => works.some(w => w.id === id));
    // 套装表 + 一次性迁移
    let sets = []; try { sets = JSON.parse(localStorage.getItem('zzz_sets') || '[]') || []; } catch (e) {}
    if (!localStorage.getItem('zzz_sets_migrated')) {
      const byKey = {}; sets.forEach(s => { byKey[(s.workId || this.MAIN_WORK) + '::' + s.name] = s; });
      items.forEach(it => { const nm = (it.setName || '').trim(); if (!nm) return; const wid = it.workId || this.MAIN_WORK; const k = wid + '::' + nm; if (!byKey[k]) { const s = { id: 'set_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5), name: nm, total: Math.max(0, parseInt(it.setTotal) || 0), workId: wid }; byKey[k] = s; sets.push(s); } else if (!byKey[k].total && parseInt(it.setTotal)) { byKey[k].total = parseInt(it.setTotal); } it.setId = byKey[k].id; });
      try { localStorage.setItem('zzz_sets', JSON.stringify(sets)); localStorage.setItem('zzz_goods_v1', JSON.stringify(items)); localStorage.setItem('zzz_sets_migrated', '1'); } catch (e) {}
    }
    let lastSetId = localStorage.getItem('zzz_last_set') || '';
    let workGroupLabel = localStorage.getItem('zzz_work_group_label') || '系列IP';
    // 设置
    let title = '谷子收纳', subtitle = '梦 境 特 工 档 案', footer = '梦境特工档案 · コードナンバー：収集家';
    let collectorName = '', currency = '', accent = '';
    let fieldLabels = {}; try { fieldLabels = JSON.parse(localStorage.getItem('zzz_field_labels') || '{}') || {}; } catch (e) {}
    fieldLabels = { ...this.FIELD_DEFAULTS, ...fieldLabels };
    let filterOn = {}; try { filterOn = JSON.parse(localStorage.getItem('zzz_filter_on') || 'null') || null; } catch (e) {}
    if (!filterOn) filterOn = { character: true, type: true, series: false, form: false, acquire: true, channel: true, purchaseChannel: true, status: false };
    else filterOn = { purchaseChannel: true, ...filterOn };
    let statsOn = null; try { statsOn = JSON.parse(localStorage.getItem('zzz_stats_on') || 'null') || null; } catch (e) {}
    let batchOn = null; try { batchOn = JSON.parse(localStorage.getItem('zzz_batch_on') || 'null') || null; } catch (e) {}
    
    let deletedFields = []; try { deletedFields = JSON.parse(localStorage.getItem('zzz_deleted_fields') || '[]') || []; } catch (e) {}
    let customFields = []; try { customFields = JSON.parse(localStorage.getItem('zzz_custom_fields') || '[]') || []; } catch (e) {}
    let customFilterOrder = {}; try { customFilterOrder = JSON.parse(localStorage.getItem('zzz_custom_filter_order') || '{}') || {}; } catch (e) {}
    let tableHiddenCols = []; try { tableHiddenCols = JSON.parse(localStorage.getItem('zzz_table_hidden_cols') || '[]') || []; } catch (e) {}
    try {
      title = localStorage.getItem('zzz_title') || title; subtitle = localStorage.getItem('zzz_subtitle') || subtitle; footer = localStorage.getItem('zzz_footer') || footer;
      collectorName = localStorage.getItem('zzz_cn') || ''; currency = localStorage.getItem('zzz_currency') || ''; accent = localStorage.getItem('zzz_accent') || '';
    } catch (e) {}
    let monthlyBudget = ''; try { monthlyBudget = localStorage.getItem('zzz_monthly_budget') || ''; } catch (e) {}
    let budgets = {}; try { budgets = JSON.parse(localStorage.getItem('zzz_budgets') || '{}') || {}; } catch (e) { budgets = {}; }
    if ((!budgets || !Object.keys(budgets).length) && monthlyBudget) { budgets = { [this.monthKey(new Date())]: monthlyBudget }; try { localStorage.setItem('zzz_budgets', JSON.stringify(budgets)); } catch (e) {} }
    let mobileMode = 'auto'; try { mobileMode = localStorage.getItem('zzz_mobile_mode') || 'auto'; } catch(e) {}
    let nameStyleMode = 'default'; try { nameStyleMode = localStorage.getItem('zzz_name_style') || 'default'; } catch(e) {}
    let displayMode = 'standard'; try { displayMode = localStorage.getItem('zzz_display_mode') || 'standard'; } catch(e) {}
    
    let dashboardCards = null; try { dashboardCards = JSON.parse(localStorage.getItem('zzz_dashboard_cards') || 'null'); } catch(e) { dashboardCards = null; }
    if (!dashboardCards || typeof dashboardCards !== 'object') dashboardCards = this.defaultDashboardCards();
    if (!['auto', 'full', 'simple'].includes(mobileMode)) mobileMode = 'auto';
    const isPhone = (() => { try { return !!(window.matchMedia && window.matchMedia('(max-width:640px)').matches); } catch(e) { return false; } })();
    const startView = this.props.startView || ((isPhone && mobileMode !== 'full') ? 'circle' : 'gallery');
    const startGroupBy = 'none';
    const lists = this.loadWorkLists(currentWorkId, items);
    this.charOrder = lists.charOrder;
    let cloudSyncId = '', cloudSyncCode = '', cloudLastSyncedAt = '';
    try { cloudSyncId = localStorage.getItem('zzz_cloud_id') || ''; cloudSyncCode = localStorage.getItem('zzz_cloud_code') || ''; cloudLastSyncedAt = localStorage.getItem('zzz_cloud_last_synced_at') || ''; } catch (e) {}
    const shippingRecords = [], shippingBatches = [];
    this.setState({ items, works, currentWorkId, recentWorks, sets, lastSetId, workGroupLabel, title, subtitle, footer, collectorName, shippingRecords, shippingBatches, currency, accent, monthlyBudget, budgets, nameStyleMode, displayMode, dashboardCards, fieldLabels, filterOn, statsOn, batchOn, deletedFields, customFields, customFilterOrder, tableHiddenCols, cloudSyncId, cloudSyncCode, cloudCodeInput: cloudSyncCode || '', cloudLastSyncedAt, mobileMode, filtersOpen: false, groupBy: startGroupBy, view: startView, ...lists }, () => { this.applyThemeVars(); this.applyBg(); });
    this.loadImages(items);
    this.loadCharAvatars();
    this.loadLogo();
    this.loadWorkLogos();
    this.loadBg();
    this.initSupabase();
    this.checkAuthSession();
    if (cloudSyncCode) setTimeout(() => this.loadShippingFromCloud(cloudSyncCode), 0);
    else setTimeout(() => this.loadLocalShipping(), 0);
    this.logEvent('page_view', { title });
  }
  // 每个作品独立的选项列表；主作品沿用旧的无后缀 key 以兼容历史数据
  wkey(base, id) { id = id || this.state.currentWorkId; return id === this.MAIN_WORK ? base : base + '__' + id; }
  loadWorkLists(workId, itemsArg) {
    if (workId === this.ALL_WORKS) return this.aggregatedLists(itemsArg);
    const items = (itemsArg || this.state.items || []).filter(it => (it.workId || this.MAIN_WORK) === workId);
    const isMain = workId === this.MAIN_WORK;
    const rd = (base, fallback) => { let v = null; try { v = JSON.parse(localStorage.getItem(this.wkey(base, workId)) || 'null'); } catch (e) {} return Array.isArray(v) ? v : fallback(); };
    let charOrder = rd('zzz_char_order', () => isMain ? [...this.CHARACTERS] : []);
    if (isMain) charOrder = [...this.CHARACTERS];
    items.forEach(it => { [it.character, it.swapCharacter].forEach(c => { if (c && !charOrder.includes(c)) charOrder.push(c); }); });
    let typesList = rd('zzz_types', () => [...new Set([...this.TYPES, ...items.map(i => i.type).filter(Boolean)])]);
    let seriesList = rd('zzz_series', () => [...new Set(items.map(i => i.series).filter(Boolean))]);
    let channels = rd('zzz_channels', () => [...new Set(items.map(i => i.channel || this.legacyVendorOf(i)).filter(Boolean))]);
    items.map(i => i.channel).filter(Boolean).forEach(v => { if (!channels.includes(v)) channels.push(v); });
    let purchaseChannels = rd('zzz_purchase_channels', () => [...new Set([...this.CHANNELS, ...items.map(i => i.purchaseChannel).filter(Boolean)])]);
    items.map(i => i.purchaseChannel).filter(Boolean).forEach(v => { if (!purchaseChannels.includes(v)) purchaseChannels.push(v); });
    let formOrder = rd('zzz_form_order', () => [...this.FORMS]); this.FORMS.forEach(f => { if (!formOrder.includes(f)) formOrder.push(f); });
    let acquireOrder = rd('zzz_acquire_order', () => ['日谷','国谷','同人']);
    let methodList = rd('zzz_method', () => [...new Set([].concat(...Object.values(this.SOURCE_METHODS)))]);
    let reminderTypes = rd('zzz_reminder_types', () => [...this.REMINDER_TYPES]); this.REMINDER_TYPES.forEach(r => { if (!reminderTypes.includes(r)) reminderTypes.push(r); });
    items.forEach(it => { if (it.reminderType && !reminderTypes.includes(it.reminderType)) reminderTypes.push(it.reminderType); });
    let hiddenTypes = rd('zzz_hidden_types', () => []);
    let hiddenChannels = rd('zzz_hidden_channels', () => []);
    let hiddenPurchaseChannels = rd('zzz_hidden_purchase_channels', () => []);
    let statusList = rd('zzz_status', () => [...this.STATUSES]);
    items.forEach(it => { if (it.status && !statusList.includes(it.status)) statusList.push(it.status); });
    let tradeTags = rd('zzz_trade_tags', () => [...this.TRADE_TAGS]);
    let rarityTags = rd('zzz_rarity_tags', () => [...this.RARITY_TAGS]);
    items.forEach(it => { (it.tags || []).forEach(t => { if (!tradeTags.includes(t)) tradeTags.push(t); }); (it.rarity || []).forEach(t => { if (!rarityTags.includes(t)) rarityTags.push(t); }); });
    return { charOrder, typesList, seriesList, channels, purchaseChannels, formOrder, acquireOrder, methodList, reminderTypes, hiddenTypes, hiddenChannels, hiddenPurchaseChannels, statusList, tradeTags, rarityTags };
  }
  aggregatedLists(itemsArg) {
    const works = this.state.works || [];
    const merge = (a, b) => { (b || []).forEach(x => { if (x && !a.includes(x)) a.push(x); }); return a; };
    const out = { charOrder: [], typesList: [], seriesList: [], channels: [], purchaseChannels: [], formOrder: [], acquireOrder: [], methodList: [], reminderTypes: [], hiddenTypes: [], hiddenChannels: [], hiddenPurchaseChannels: [], statusList: [], tradeTags: [], rarityTags: [] };
    const wl = works.length ? works : [{ id: this.MAIN_WORK }];
    wl.forEach(w => { const l = this.loadWorkLists(w.id, itemsArg); Object.keys(out).forEach(k => merge(out[k], l[k])); });
    if (!out.charOrder.length) out.charOrder = [...this.CHARACTERS];
    if (!out.typesList.length) out.typesList = [...this.TYPES];
    if (!out.purchaseChannels.length) out.purchaseChannels = [...this.CHANNELS];
    if (!out.formOrder.length) out.formOrder = [...this.FORMS];
    if (!out.statusList.length) out.statusList = [...this.STATUSES];
    if (!out.reminderTypes.length) out.reminderTypes = [...this.REMINDER_TYPES];
    if (!out.tradeTags.length) out.tradeTags = [...this.TRADE_TAGS];
    if (!out.rarityTags.length) out.rarityTags = [...this.RARITY_TAGS];
    return out;
  }
  defaultDraftWorkId() {
    const cw = this.state.currentWorkId; const works = this.state.works || [];
    if (cw && cw !== this.ALL_WORKS && works.some(w => w.id === cw)) return cw;
    const r = (this.state.recentWorks || []).find(id => works.some(w => w.id === id)); if (r) return r;
    return (works[0] && works[0].id) || this.MAIN_WORK;
  }
  draftWorkId(d) {
    const w = d && d.workId; const works = this.state.works || [];
    if (w && w !== this.ALL_WORKS && works.some(x => x.id === w)) return w;
    return this.defaultDraftWorkId();
  }
  toggleDraftWorkMenu = () => this.toggleDraftMenu('draftWorkMenuOpen');
  pickDraftWork = (id) => this.setState(s => ({ draft: { ...s.draft, workId: id }, draftWorkMenuOpen: false }));
  addWorkInline = () => {
    const group = (window.prompt('系列IP（如：假面骑士系列 / 偶像系列）：', this.DEFAULT_GROUP) || '').trim(); if (!group) return;
    const name = (window.prompt('作品名称：') || '').trim(); if (!name) return;
    const id = 'w_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 5);
    this.saveWorks([ ...(this.state.works || []), { id, group, name } ]);
    this.setState(s => ({ draft: { ...s.draft, workId: id }, draftWorkMenuOpen: false }));
  };
  resetScopedFilters(extra) {
    return {
      charSel: [], typeSel: [], seriesFilter: '全部', formSel: [], statusSel: [], acquireSel: [], channelSel: [], purchaseChannelSel: [],
      customFilterSel: {},
      selectedIds: [],
      ...(extra || {})
    };
  }
  switchWork = (id) => {
    if (!id || id === this.state.currentWorkId) return;
    try { localStorage.setItem('zzz_current_work', id); } catch (e) {}
    this.pushRecentWork(id);
    if (id === this.ALL_WORKS) { this.setState(this.resetScopedFilters({ currentWorkId: id, workMenuOpen: false, groupBy: 'none' })); return; }
    const lists = this.loadWorkLists(id);
    this.charOrder = lists.charOrder;
    this.setState(this.resetScopedFilters({ currentWorkId: id, workMenuOpen: false, groupBy: 'none', ...lists }));
  };
  pushRecentWork(id) {
    if (!id || id === this.ALL_WORKS) return;
    let r = [];
    try { r = JSON.parse(localStorage.getItem('zzz_recent_works') || '[]') || []; } catch (e) {}
    r = [id, ...r.filter(x => x !== id)].slice(0, 4);
    try { localStorage.setItem('zzz_recent_works', JSON.stringify(r)); } catch (e) {}
    this.setState({ recentWorks: r });
  }
  saveWorks = (works) => { try { localStorage.setItem('zzz_works', JSON.stringify(works)); } catch (e) {} this.setState({ works }); };
  addWork = () => {
    const group = (window.prompt('系列IP（大类，如：假面骑士系列 / 偶像系列）：', this.DEFAULT_GROUP) || '').trim(); if (!group) return;
    const name = (window.prompt('作品名称（如：仮面ライダーDrive）：') || '').trim(); if (!name) return;
    const id = 'w_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 5);
    this.saveWorks([...this.state.works, { id, group, name }]);
    this.switchWork(id);
  };
  renameWork = (w, ev) => { if (ev) ev.stopPropagation(); const name = (window.prompt('修改作品名称：', w.name) || '').trim(); if (!name || name === w.name) return; this.saveWorks(this.state.works.map(x => x.id === w.id ? { ...x, name } : x)); };
  renameGroup = (w, ev) => { if (ev) ev.stopPropagation(); const group = (window.prompt('修改系列IP（同组的作品会一起改）：', w.group) || '').trim(); if (!group || group === w.group) return; this.saveWorks(this.state.works.map(x => x.group === w.group ? { ...x, group } : x)); };
  delWork = (w, ev) => {
    if (ev) ev.stopPropagation();
    const cnt = this.state.items.filter(it => (it.workId || this.MAIN_WORK) === w.id).length;
    if (!window.confirm('删除作品「' + w.name + '」？会同时删除它下面的 ' + cnt + ' 件谷子。')) return;
    const works = this.state.works.filter(x => x.id !== w.id);
    const items = this.state.items.filter(it => (it.workId || this.MAIN_WORK) !== w.id);
    this.saveWorks(works); this.commit(items);
    if (this.state.currentWorkId === w.id) {
      if (works.length) this.switchWork(works[0].id);
      else { try { localStorage.setItem('zzz_current_work', ''); } catch (e) {} this.setState(this.resetScopedFilters({ currentWorkId: '', charOrder: [], typesList: [], seriesList: [], channels: [], purchaseChannels: [...this.CHANNELS], statusList: [], formOrder: [...this.FORMS], acquireOrder: ['日谷','国谷','同人'], reminderTypes: [...this.REMINDER_TYPES] })); }
    }
  };
  addCustomField = () => { const base = this.state.settingsDraft ? (this.state.settingsDraft.customFields || []) : (this.state.customFields || []); const cf = [...base, { key: 'cf_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5), label: '新字段' }]; if (this.state.settingsDraft) this.updateSettingsDraft({ customFields: cf }); else { try { localStorage.setItem('zzz_custom_fields', JSON.stringify(cf)); } catch (e) {} this.setState({ customFields: cf }); } };
  setCustomFieldLabel = (key) => (e) => { const cf = (this.state.customFields || []).map(f => f.key === key ? { ...f, label: e.target.value } : f); try { localStorage.setItem('zzz_custom_fields', JSON.stringify(cf)); } catch (er) {} this.setState({ customFields: cf }); };
  renameCustomFieldLabel = (key) => { const f = (this.state.customFields || []).find(x => x.key === key); if (!f) return; const nv = (window.prompt('把字段名「' + f.label + '」改成：', f.label) || '').trim(); if (!nv || nv === f.label) return; const cf = (this.state.customFields || []).map(x => x.key === key ? { ...x, label: nv } : x); try { localStorage.setItem('zzz_custom_fields', JSON.stringify(cf)); } catch (e) {} this.setState({ customFields: cf }); };
  delCustomField = (key) => {
    const cf = (this.state.customFields || []).filter(f => f.key !== key);
    const filterOn = { ...(this.state.filterOn || {}) };
    const statsOn = { ...(this.state.statsOn || {}) };
    const batchOn = { ...(this.state.batchOn || {}) };
    const customFilterSel = { ...(this.state.customFilterSel || {}) };
    delete filterOn[key]; delete statsOn[key]; delete batchOn[key]; delete customFilterSel[key];
    const items = (this.state.items || []).map(it => it.custom ? { ...it, custom: Object.fromEntries(Object.entries(it.custom).filter(([k]) => k !== key)) } : it);
    try { localStorage.setItem('zzz_custom_fields', JSON.stringify(cf)); localStorage.setItem('zzz_filter_on', JSON.stringify(filterOn)); localStorage.setItem('zzz_stats_on', JSON.stringify(statsOn)); localStorage.setItem('zzz_batch_on', JSON.stringify(batchOn)); } catch (e) {}
    let settingsDraft = this.state.settingsDraft;
    if (settingsDraft) {
      const dFilterOn = { ...(settingsDraft.filterOn || {}) }; const dStatsOn = { ...(settingsDraft.statsOn || {}) };
      delete dFilterOn[key]; delete dStatsOn[key];
      settingsDraft = { ...settingsDraft, customFields: cf, filterOn: dFilterOn, statsOn: dStatsOn };
    }
    this.setState({ customFields: cf, filterOn, statsOn, batchOn, customFilterSel, items, settingsDraft });
    this.commit(items);
  };
  onCustomDraft = (key) => (e) => { const v = e.target.value; this.setState(s => ({ draft: { ...s.draft, custom: { ...(s.draft.custom || {}), [key]: v } } })); };
  toggleCustomMenu = (key) => () => this.setState(s => ({ customMenuOpen: { ...(s.customMenuOpen || {}), [key]: !(s.customMenuOpen || {})[key] } }));
  pickCustom = (key, v) => this.setState(s => ({ draft: { ...s.draft, custom: { ...(s.draft.custom || {}), [key]: v } }, customMenuOpen: { ...(s.customMenuOpen || {}), [key]: false } }));
  addOptionTo = (which, lsKey, promptText) => () => { const v = (window.prompt(promptText) || '').trim(); if (!v) return; const cur = this.state[which] || []; if (cur.includes(v)) return; const arr = [...cur, v]; const wid = this.state.currentWorkId === this.ALL_WORKS ? this.MAIN_WORK : this.state.currentWorkId; try { localStorage.setItem(this.wkey(lsKey, wid), JSON.stringify(arr)); } catch (e) {} this.setState({ [which]: arr }); };
  toggleWorkMenu = () => this.setState(s => ({ workMenuOpen: !s.workMenuOpen }));
  toggleMobileMode = () => {
    const next = (this.state.mobileMode || 'auto') === 'full' ? 'auto' : 'full';
    try { localStorage.setItem('zzz_mobile_mode', next); } catch(e) {}
    this.setState({ mobileMode: next });
  };
  toggleFiltersOpen = () => this.setState(s => ({ filtersOpen: !s.filtersOpen }));

  // ===== Supabase（云同步、快照与事件）=====
  initSupabase() {
    this.sb = null;
    this.dataSb = null;
    this.loadCloudImageMap();
    const url = this.SUPA_URL, key = this.SUPA_KEY;
    if (url && key && window.supabase && window.supabase.createClient) {
      try {
        // 登录客户端只负责 Auth。旧数据库的 RLS 仅给 anon 放行；若复用登录客户端，
        // 登录后请求会变成 authenticated，反而看不到旧同步码且无法更新旧收藏库。
        const authSb = window.supabase.createClient(url, key);
        const dataSb = window.supabase.createClient(url, key, {
          auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }
        });
        this.dataSb = dataSb;
        this.sb = new Proxy(authSb, {
          get(target, prop) {
            if (prop === 'from') return dataSb.from.bind(dataSb);
            if (prop === 'storage') return dataSb.storage;
            return target[prop];
          }
        });
      } catch (e) { this.sb = null; this.dataSb = null; }
    }
  }
  AUTH_EMAIL_DOMAIN = '@guzi-app.com';
  authEmailFor(username) {
    const raw = String(username || '').trim().toLowerCase();
    // 允许中文等任意用户名：ASCII 直接用，非 ASCII 转成十六进制，保证邮箱本地部分合法且唯一
    let local = '';
    for (const ch of raw) {
      if (/[a-z0-9]/.test(ch)) local += ch;
      else { const cp = ch.codePointAt(0).toString(16); local += 'x' + cp; }
    }
    if (!local) local = 'u0';
    return local + this.AUTH_EMAIL_DOMAIN;
  }
  async findCloudCollectionByCode(code, fields = 'id,sync_code,data,updated_at') {
    const normalized = String(code || '').trim().toUpperCase();
    if (!this.sb || !normalized) return { row: null, count: 0 };
    // 不使用 single/maybeSingle：旧库若意外有重复码，它们会因“必须是单行”而直接报错。
    const { data, error } = await this.sb.from('collections').select(fields).eq('sync_code', normalized).order('updated_at', { ascending: false }).limit(2);
    if (error) throw error;
    const rows = Array.isArray(data) ? data : [];
    return { row: rows[0] || null, count: rows.length };
  }
  async ensureAccountCloudCollection(user, preferredCode = '') {
    if (!this.sb || !user) throw new Error('账号或云端尚未就绪');
    const meta = user.user_metadata || {};
    const localCode = (() => { try { return localStorage.getItem('zzz_cloud_code') || ''; } catch (e) { return ''; } })();
    let code = String(preferredCode || meta.sync_code || localCode || this.genSyncCode()).trim().toUpperCase();
    let found = await this.findCloudCollectionByCode(code);
    let createdNow = false;
    if (!found.row) {
      const now = new Date().toISOString();
      const payload = { sync_code: code, client_uuid: this.clientUuid(), cn: this.state.collectorName || null, title: this.state.title || null, data: this.cloudSnapshot(), updated_at: now };
      const inserted = await this.sb.from('collections').insert([payload]);
      if (inserted.error) throw inserted.error;
      found = await this.findCloudCollectionByCode(code);
      if (!found.row) throw new Error('云端收藏库已提交，但当前账号无权读取；请检查 Supabase collections 表的 RLS 权限');
      createdNow = true;
    }
    if (meta.sync_code !== code) {
      const updated = await this.sb.auth.updateUser({ data: { ...meta, sync_code: code } });
      if (updated.error) throw updated.error;
    }
    try {
      localStorage.setItem('zzz_cloud_id', found.row.id || '');
      localStorage.setItem('zzz_cloud_code', code);
    } catch (e) {}
    this.setState({ cloudSyncId: found.row.id || '', cloudSyncCode: code, cloudCodeInput: '', cloudRemoteUpdatedAt: found.row.updated_at || '' });
    return { code, row: found.row, duplicateCount: found.count, createdNow };
  }
  async checkAuthSession() {
    if (!this.sb || !this.sb.auth) { this.setState({ authReady: true, authUser: null }); return; }
    const failSafe = setTimeout(() => { if (!this.state.authReady) this.setState({ authReady: true }); }, 6000);
    try {
      const { data } = await this.sb.auth.getSession();
      const user = data && data.session ? data.session.user : null;
      if (user) { this.setState({ authReady: true, authUser: user }); await this.onAuthedUser(user); }
      else { this.setState({ authReady: true, authUser: null }); }
    } catch (e) { this.setState({ authReady: true, authUser: null }); }
    finally { clearTimeout(failSafe); }
  }
  async ensureUsernameAsCn(user) {
    const meta = (user && user.user_metadata) || {};
    const username = String(meta.username || '').trim();
    if (!username) return '';
    let current = String(this.state.collectorName || '').trim();
    if (!current) {
      try { current = String(localStorage.getItem('zzz_cn') || '').trim(); } catch (e) {}
    }
    if (current) return current;
    try { localStorage.setItem('zzz_cn', username); } catch (e) {}
    await new Promise(resolve => this.setState({ collectorName: username }, resolve));
    return username;
  }
  // 登录成功后：账号负责定位云端库；同步码只作为兼容旧排发资料的内部关联键。
  async onAuthedUser(user) {
    try {
      await this.ensureUsernameAsCn(user);
      const linked = await this.ensureAccountCloudCollection(user);
      const warning = linked.duplicateCount > 1 ? '；检测到旧同步码存在重复云端记录，已使用最新一条' : '';
      await this.migrateLocalShippingToCloud(linked.code);
      await this.loadShippingFromCloud(linked.code);
      const remoteAt = (linked.row && linked.row.updated_at) || '';
      const localAt = this.state.cloudLastSyncedAt || (() => { try { return localStorage.getItem('zzz_cloud_last_synced_at') || ''; } catch (e) { return ''; } })();
      if (linked.createdNow) {
        if (remoteAt) { try { localStorage.setItem('zzz_cloud_last_synced_at', remoteAt); } catch (e) {} }
        this.setState({ initialSyncReady: true, syncConflict: null, cloudPending: false, cloudLastSyncedAt: remoteAt, cloudRemoteUpdatedAt: remoteAt, cloudStatus: '账号云端已建立并完成首次同步' + warning + '。' });
        return;
      }
      const remoteNewer = remoteAt && (!localAt || new Date(remoteAt).getTime() > new Date(localAt).getTime() + 1000);
      if (remoteNewer) {
        // 自动同步：云端较新时，直接以云端为准拉取，不再询问
        this.setState({ syncConflict: null, cloudRemoteUpdatedAt: remoteAt });
        try { await this.pullCloud(true); } catch (e) {}
        this.setState({ initialSyncReady: true, cloudPending: false });
        return;
      }
      this.setState({ initialSyncReady: true, syncConflict: null, cloudStatus: '账号云端已连接，自动同步已开启' + warning + '。', cloudPending: false, cloudRemoteUpdatedAt: remoteAt || localAt });
    } catch (e) {
      this.setState({ initialSyncReady: false, cloudStatus: '账号已登录，但云端连接失败：' + ((e && e.message) || e) });
    }
  }
  openSyncConflict = (remoteAt, localAt) => {
    this.setState({ initialSyncReady: false, cloudBusy: false, cloudPending: true, cloudRemoteUpdatedAt: remoteAt || '', syncConflict: { remoteAt: remoteAt || '', localAt: localAt || '' }, cloudStatus: '云端与本机版本不同，请选择要保留的版本。' });
  };
  chooseCloudVersion = async () => {
    if (this.state.cloudBusy) return;
    this.setState({ syncConflictChoice: 'cloud', cloudStatus: '正在使用云端版本覆盖本机…' });
    await this.pullCloud(true);
  };
  chooseLocalVersion = async () => {
    if (this.state.cloudBusy) return;
    this.setState({ syncConflictChoice: 'local', cloudStatus: '正在使用本机版本覆盖云端…' });
    await this.pushCloud(false, true);
  };
  onAuthUsername = (e) => this.setState({ authUsername: e && e.target ? e.target.value : '' });
  onAuthPassword = (e) => this.setState({ authPassword: e && e.target ? e.target.value : '' });
  onAuthPassword2 = (e) => this.setState({ authPassword2: e && e.target ? e.target.value : '' });
  switchAuthMode = (m) => () => this.setState({ authMode: m, authError: '' });
  doRegister = async () => {
    const u = String(this.state.authUsername || '').trim();
    const p = String(this.state.authPassword || '');
    if (!u) { this.setState({ authError: '请输入用户名' }); return; }
    if (u.length < 2) { this.setState({ authError: '用户名太短' }); return; }
    if (p.length < 8) { this.setState({ authError: '密码至少 8 位' }); return; }
    if (!this.sb || !this.sb.auth) { this.setState({ authError: '云端未就绪' }); return; }
    this.setState({ authBusy: true, authError: '' });
    try {
      // 生成/沿用同步码：本机已有旧码则迁移绑定，否则新建
      let code = (() => { try { return localStorage.getItem('zzz_cloud_code') || ''; } catch (e) { return ''; } })();
      if (!code) code = this.genSyncCode();
      const { data, error } = await this.sb.auth.signUp({ email: this.authEmailFor(u), password: p, options: { data: { username: u, sync_code: code } } });
      if (error) { this.setState({ authBusy: false, authError: /already/i.test(error.message) ? '这个用户名已被注册' : ('注册失败：' + error.message) }); return; }
      // 有些项目 signUp 后需要再登录一次
      let user = data && data.user;
      if (!(data && data.session)) {
        const r = await this.sb.auth.signInWithPassword({ email: this.authEmailFor(u), password: p });
        if (r.error) { this.setState({ authBusy: false, authError: '注册成功但自动登录失败，请手动登录' , authMode: 'login' }); return; }
        user = r.data.user;
      }
      try { localStorage.setItem('zzz_cloud_code', code); } catch (e) {}
      await this.onAuthedUser(user);
      this.setState({ authBusy: false, authUser: user, authPassword: '', authPassword2: '' });
    } catch (e) { this.setState({ authBusy: false, authError: '注册失败：' + ((e && e.message) || e) }); }
  };
  doLogin = async () => {
    const u = String(this.state.authUsername || '').trim();
    const p = String(this.state.authPassword || '');
    if (!u || !p) { this.setState({ authError: '请输入用户名和密码' }); return; }
    if (!this.sb || !this.sb.auth) { this.setState({ authError: '云端未就绪' }); return; }
    this.setState({ authBusy: true, authError: '' });
    try {
      const { data, error } = await this.sb.auth.signInWithPassword({ email: this.authEmailFor(u), password: p });
      if (error) { this.setState({ authBusy: false, authError: '用户名或密码不对' }); return; }
      await this.onAuthedUser(data.user);
      this.setState({ authBusy: false, authUser: data.user, authPassword: '' });
    } catch (e) { this.setState({ authBusy: false, authError: '登录失败：' + ((e && e.message) || e) }); }
  };
  doLogout = async () => {
    if (!window.confirm('确定退出登录？')) return;
    try { if (this.sb && this.sb.auth) await this.sb.auth.signOut(); } catch (e) {}
    this.setState({ authUser: null, authUsername: '', authPassword: '', authPassword2: '', authMode: 'login' });
  };
  genSyncCode() { const s = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; let c = ''; for (let i = 0; i < 8; i++) c += s[Math.floor(Math.random() * s.length)]; return c; }
  clientUuid() { let id = localStorage.getItem('zzz_client_uuid'); if (!id) { id = (crypto && crypto.randomUUID) ? crypto.randomUUID() : ('u_' + Date.now().toString(36) + Math.random().toString(36).slice(2)); try { localStorage.setItem('zzz_client_uuid', id); } catch (e) {} } return id; }
  sbMeta() { return { client_uuid: this.clientUuid(), collector_name: (this.state.collectorName || '').slice(0, 40) || null }; }
  async logEvent(name, payload) { if (!this.sb) return; try { await this.sb.from('client_events').insert([{ ...this.sbMeta(), event_name: name, payload: payload || {} }]); } catch (e) {} }
  async uploadSnapshot(it) {
    if (!this.sb || !it) return;
    const w = this.state.works.find(x => x.id === (it.workId || this.MAIN_WORK)) || {};
    try {
      await this.sb.from('collection_snapshots').insert([{ ...this.sbMeta(), item_local_id: String(it.id || ''), work_group: w.group || null, work_name: w.name || null, item_name: String(it.name || '未命名').slice(0, 160), item_character: it.character || null, item_type: it.type || null, item_series: it.series || null, item_channel: it.channel || null, item_status: it.status || null, quantity: this.num(it.qty || 1), official_price: this.num(it.originalPrice) || null, buy_price: this.num(it.buyPrice) || null, sell_price: this.num(it.sellPrice) || null, currency: this.cur(), buy_date: it.buyDate || null }]);
    } catch (e) {}
  }

  // ===== 云同步（文字数据 + 配置，图片仍保存在本机）=====
  loadCloudImageMap() {
    if (this._cloudImageMapLoaded) return this.cloudImageMap || {};
    this._cloudImageMapLoaded = true;
    try { this.cloudImageMap = JSON.parse(localStorage.getItem('zzz_cloud_image_map') || '{}') || {}; } catch (e) { this.cloudImageMap = {}; }
    return this.cloudImageMap;
  }
  saveCloudImageMap(map) {
    this.cloudImageMap = map || {};
    try { localStorage.setItem('zzz_cloud_image_map', JSON.stringify(this.cloudImageMap)); } catch (e) {}
  }
  imageIdsOf(it) {
    return [it && it.imageId, it && it.imageId2, it && it.imageId3, it && it.imageId4, it && it.swapImageId].filter(Boolean);
  }
  async decodeBlobImage(blob) {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('image decode failed')); };
      img.src = url;
    });
  }
  canvasToBlob(canvas, type, quality) {
    return new Promise(resolve => canvas.toBlob(resolve, type, quality));
  }
  async compressImageBlob(blob) {
    const img = await this.decodeBlobImage(blob);
    let maxSide = this.CLOUD_IMAGE_MAX_SIDE;
    let quality = this.CLOUD_IMAGE_QUALITY;
    let last = null;
    for (let i = 0; i < 5; i++) {
      const scale = Math.min(1, maxSide / Math.max(img.naturalWidth || img.width, img.naturalHeight || img.height));
      const w = Math.max(1, Math.round((img.naturalWidth || img.width) * scale));
      const h = Math.max(1, Math.round((img.naturalHeight || img.height) * scale));
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext('2d', { alpha: false });
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);
      let out = await this.canvasToBlob(canvas, 'image/webp', quality);
      let mime = 'image/webp', ext = 'webp';
      if (!out) { out = await this.canvasToBlob(canvas, 'image/jpeg', quality); mime = 'image/jpeg'; ext = 'jpg'; }
      if (out) last = { blob: out, width: w, height: h, size: out.size, mime: out.type || mime, ext };
      if (last && last.size <= this.CLOUD_IMAGE_MAX_BYTES) return last;
      maxSide = Math.max(520, Math.round(maxSide * 0.82));
      quality = Math.max(0.5, quality - 0.08);
    }
    return last || { blob, width: img.naturalWidth || img.width || 0, height: img.naturalHeight || img.height || 0, size: blob.size, mime: blob.type || 'image/jpeg', ext: (String(blob.type).includes('png') ? 'png' : 'jpg') };
  }
  cloudImagePath(id, ext) {
    const safeId = String(id || '').replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 120);
    return 'clients/' + this.clientUuid() + '/' + safeId + '.' + (ext || 'webp');
  }
  async uploadCloudImage(id) {
    if (!this.sb || !id) return null;
    const map = this.loadCloudImageMap();
    if (map[id] && map[id].url) return map[id];
    const original = await this.idbGet(id);
    if (!original) return map[id] || null;
    const packed = await this.compressImageBlob(original);
    const path = this.cloudImagePath(id, packed.ext);
    const { error } = await this.sb.storage.from(this.SUPA_IMAGE_BUCKET).upload(path, packed.blob, { upsert: true, contentType: packed.mime, cacheControl: '31536000' });
    if (error) throw error;
    const pub = this.sb.storage.from(this.SUPA_IMAGE_BUCKET).getPublicUrl(path);
    const meta = { url: pub && pub.data ? pub.data.publicUrl : '', path, width: packed.width, height: packed.height, size: packed.size, mime: packed.mime, updated_at: new Date().toISOString() };
    map[id] = meta;
    this.saveCloudImageMap(map);
    return meta;
  }
  async syncCloudImagesForItems(items) {
    const map = this.loadCloudImageMap();
    if (!this.sb) return { map, total: 0, uploaded: 0, failed: 0 };
    const ids = [...new Set((items || []).flatMap(it => this.imageIdsOf(it)))];
    let uploaded = 0, failed = 0;
    for (const id of ids) {
      if (map[id] && map[id].url) continue;
      try { const meta = await this.uploadCloudImage(id); if (meta && meta.url) uploaded++; } catch (e) { failed++; }
    }
    return { map: this.loadCloudImageMap(), total: ids.length, uploaded, failed };
  }
  compactItemForSummary(it) {
    const e = this.enrich(it || {});
    return { id: String((it && it.id) || ''), name: String((it && it.name) || '').slice(0, 120), character: (it && it.character) || '', type: (it && it.type) || '', status: (it && it.status) || '', qty: e.qty, cost: e.cost, buyDate: (it && it.buyDate) || '' };
  }
  sumBy(items, keyFn, valueFn) {
    const out = {};
    (items || []).forEach(it => { const k = keyFn(it) || '未分类'; out[k] = (out[k] || 0) + valueFn(it); });
    return out;
  }
  collectionSummaryPayload(syncCode) {
    const items = this.state.items || [];
    const workById = Object.fromEntries((this.state.works || []).map(w => [w.id, w]));
    let totalQty = 0, totalSpent = 0, totalSell = 0, totalProfit = 0;
    const byMonth = {};
    items.forEach(it => {
      const e = this.enrich(it);
      totalQty += e.qty; totalSpent += e.cost;
      if (e.sold || e.sell > 0) { totalSell += e.revenue; totalProfit += e.profit; }
      this.cashFlowEntries(it).forEach(cf => { const k = String(cf.date || '').slice(0, 7); if (k) byMonth[k] = Math.round(((byMonth[k] || 0) + cf.amount) * 100) / 100; });
    });
    return {
      sync_code: syncCode || this.state.cloudSyncCode || localStorage.getItem('zzz_cloud_code') || null,
      client_uuid: this.clientUuid(),
      collector_name: (this.state.collectorName || '').slice(0, 80) || null,
      title: (this.state.title || '').slice(0, 120) || null,
      item_count: items.length,
      total_quantity: totalQty,
      total_spent: Math.round(totalSpent * 100) / 100,
      total_sell: Math.round(totalSell * 100) / 100,
      total_profit: Math.round(totalProfit * 100) / 100,
      currency: this.cur(),
      by_status: this.sumBy(items, it => it.status, it => this.enrich(it).qty),
      by_character: this.sumBy(items, it => it.character, it => this.enrich(it).qty),
      by_type: this.sumBy(items, it => it.type, it => this.enrich(it).qty),
      by_work: this.sumBy(items, it => ((workById[it.workId] || {}).name || ''), it => this.enrich(it).qty),
      by_month: byMonth,
      sample_items: items.slice(0, 80).map(it => this.compactItemForSummary(it)),
      updated_at: new Date().toISOString()
    };
  }
  async uploadCollectionSummary(syncCode) {
    if (!this.sb) return;
    const payload = this.collectionSummaryPayload(syncCode);
    if (!payload.sync_code) return;
    try { await this.sb.from('collection_summaries').upsert([payload], { onConflict: 'sync_code' }); } catch (e) {}
  }

  cloudReady() { return !!this.sb; }
  genSyncCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
    return code;
  }
  cloudSnapshot(imageMapArg) {
    const keys = ['zzz_cn','zzz_currency','zzz_accent','zzz_title','zzz_subtitle','zzz_footer','zzz_works','zzz_current_work','zzz_recent_works','zzz_work_group_label','zzz_sets','zzz_last_set','zzz_budgets','zzz_monthly_budget','zzz_dashboard_cards','zzz_name_style','zzz_display_mode','zzz_field_labels','zzz_filter_on','zzz_stats_on','zzz_batch_on','zzz_custom_fields','zzz_deleted_fields','zzz_custom_filter_order','zzz_shipping_roles'];
    const allWorks = this.state.works || [];
    ['zzz_char_order','zzz_types','zzz_series','zzz_channels','zzz_purchase_channels','zzz_form_order','zzz_acquire_order','zzz_status','zzz_hidden_types','zzz_hidden_channels','zzz_hidden_purchase_channels'].forEach(base => {
      allWorks.forEach(w => keys.push(w.id === this.MAIN_WORK ? base : base + '__' + w.id));
    });
    const local = {};
    keys.forEach(k => { try { const v = localStorage.getItem(k); if (v != null) local[k] = v; } catch(e) {} });
    const imageMap = imageMapArg || this.loadCloudImageMap();
    return { version: 2, updated_at: new Date().toISOString(), items: this.state.items || [], imageMap, local, note: 'item images are compressed before upload; logo/background files stay local to save space' };
  }
  async applyCloudSnapshot(data) {
    if (!data || typeof data !== 'object') return;
    try {
      if (data.local) Object.keys(data.local).forEach(k => localStorage.setItem(k, data.local[k]));
      if (Array.isArray(data.items)) localStorage.setItem('zzz_goods_v1', JSON.stringify(data.items));
      if (data.imageMap && typeof data.imageMap === 'object') this.saveCloudImageMap({ ...this.loadCloudImageMap(), ...data.imageMap });
    } catch (e) {}
    const items = Array.isArray(data.items) ? data.items : this.state.items;
    let works = this.state.works || [];
    try { works = JSON.parse(localStorage.getItem('zzz_works') || 'null') || works; } catch(e) {}
    if (!Array.isArray(works) || !works.length) works = [{ id: 'w_main', group: this.DEFAULT_GROUP, name: '默认作品' }];
    let currentWorkId = localStorage.getItem('zzz_current_work') || (works[0] && works[0].id) || this.MAIN_WORK;
    if (!works.some(w => w.id === currentWorkId)) currentWorkId = works[0].id;
    let fieldLabels = {}; try { fieldLabels = JSON.parse(localStorage.getItem('zzz_field_labels') || '{}') || {}; } catch(e) {}
    let filterOn = {}; try { filterOn = JSON.parse(localStorage.getItem('zzz_filter_on') || 'null') || {}; } catch(e) {}
    filterOn = { purchaseChannel: true, ...filterOn };
    let statsOn = null; try { statsOn = JSON.parse(localStorage.getItem('zzz_stats_on') || 'null') || null; } catch(e) {}
    let batchOn = null; try { batchOn = JSON.parse(localStorage.getItem('zzz_batch_on') || 'null') || null; } catch(e) {}
    let sets = []; try { sets = JSON.parse(localStorage.getItem('zzz_sets') || '[]') || []; } catch(e) {}
    let budgets = {}; try { budgets = JSON.parse(localStorage.getItem('zzz_budgets') || '{}') || {}; } catch(e) {}
    let recentWorks = []; try { recentWorks = JSON.parse(localStorage.getItem('zzz_recent_works') || '[]') || []; } catch(e) {}
    let dashboardCards = null; try { dashboardCards = JSON.parse(localStorage.getItem('zzz_dashboard_cards') || 'null') || null; } catch(e) {}
    
    let deletedFields = []; try { deletedFields = JSON.parse(localStorage.getItem('zzz_deleted_fields') || '[]') || []; } catch(e) {}
    let customFields = []; try { customFields = JSON.parse(localStorage.getItem('zzz_custom_fields') || '[]') || []; } catch(e) {}
    let customFilterOrder = {}; try { customFilterOrder = JSON.parse(localStorage.getItem('zzz_custom_filter_order') || '{}') || {}; } catch(e) {}
    let shippingRolesCustom = {}; try { shippingRolesCustom = JSON.parse(localStorage.getItem('zzz_shipping_roles') || '{}') || {}; } catch(e) {}
    const lists = this.loadWorkLists(currentWorkId, items);
    this.charOrder = lists.charOrder;
    this.setState({
      items, works, currentWorkId,
      workGroupLabel: localStorage.getItem('zzz_work_group_label') || this.state.workGroupLabel,
      collectorName: localStorage.getItem('zzz_cn') || '', currency: localStorage.getItem('zzz_currency') || '', accent: localStorage.getItem('zzz_accent') || '',
      title: localStorage.getItem('zzz_title') || this.state.title, subtitle: localStorage.getItem('zzz_subtitle') || this.state.subtitle, footer: localStorage.getItem('zzz_footer') || this.state.footer,
      fieldLabels: { ...this.FIELD_DEFAULTS, ...fieldLabels }, filterOn, statsOn, batchOn, sets, budgets, recentWorks, dashboardCards: dashboardCards || this.state.dashboardCards, lastSetId: localStorage.getItem('zzz_last_set') || '', nameStyleMode: localStorage.getItem('zzz_name_style') || this.state.nameStyleMode, displayMode: localStorage.getItem('zzz_display_mode') || this.state.displayMode, deletedFields, customFields, customFilterOrder, shippingRolesCustom, ...lists, savedAt: Date.now()
    }, () => { this.applyThemeVars(); this.applyBg(); this.loadImages(items); });
  }
  mergeCloudAndLocal = async () => {
    const code = this.shippingSyncCode();
    if (!this.sb || !code) { this.setState({ cloudStatus: '账号云端尚未连接。' }); return; }
    this.setState({ cloudBusy: true, cloudStatus: '正在合并云端、本机与排发资料…' });
    try {
      let row = null;
      const id = this.state.cloudSyncId || localStorage.getItem('zzz_cloud_id') || '';
      if (id) {
        const q = await this.sb.from('collections').select('id,sync_code,data,updated_at').eq('id', id).limit(1);
        if (q.error) throw q.error;
        row = Array.isArray(q.data) ? q.data[0] : null;
      }
      if (!row) row = (await this.findCloudCollectionByCode(code)).row;
      const remote = (row && row.data && typeof row.data === 'object') ? row.data : {};
      const local = this.cloudSnapshot();
      const byId = new Map();
      (Array.isArray(remote.items) ? remote.items : []).forEach(it => { if (it && it.id != null) byId.set(String(it.id), it); });
      (Array.isArray(local.items) ? local.items : []).forEach(it => { if (it && it.id != null) byId.set(String(it.id), it); });
      const merged = {
        ...remote,
        ...local,
        version: Math.max(Number(remote.version) || 0, Number(local.version) || 0, 2),
        updated_at: new Date().toISOString(),
        items: Array.from(byId.values()),
        imageMap: { ...(remote.imageMap || {}), ...(local.imageMap || {}) },
        local: { ...(remote.local || {}), ...(local.local || {}) }
      };
      await this.applyCloudSnapshot(merged);
      const shipResult = await this.migrateLocalShippingToCloud(code);
      const now = new Date().toISOString();
      const targetId = (row && row.id) || this.state.cloudSyncId;
      const update = await this.sb.from('collections').update({ data: merged, updated_at: now, client_uuid: this.clientUuid() }).eq('id', targetId).select('id,sync_code,updated_at');
      if (update.error) throw update.error;
      const updatedRow = Array.isArray(update.data) ? update.data[0] : null;
      if (!updatedRow) throw new Error('合并结果未能写回云端，请检查 collections 表的更新权限');
      localStorage.setItem('zzz_cloud_last_synced_at', updatedRow.updated_at || now);
      await this.loadShippingFromCloud(code);
      this.setState({ cloudBusy: false, cloudPending: false, cloudLastSyncedAt: updatedRow.updated_at || now, cloudRemoteUpdatedAt: updatedRow.updated_at || now, cloudStatus: '合并完成：收藏共 ' + merged.items.length + ' 件；本地排发资料新增上传 ' + shipResult.migrated + ' 份。' });
    } catch (e) {
      this.setState({ cloudBusy: false, cloudPending: true, cloudStatus: '合并失败：' + ((e && e.message) || e) });
    }
  };
  markCloudPending = (message = '') => {
    if (!this.state.cloudSyncCode && !localStorage.getItem('zzz_cloud_code')) return;
    this.setState({ cloudPending: true, cloudStatus: message || '本机有未上传的修改。请完成整理后手动上传到云端。' });
  };
  fmtCloudTime(v) {
    if (!v) return '未知';
    const d = new Date(v);
    return isNaN(d.getTime()) ? String(v) : d.toLocaleString('zh-CN', { hour12: false });
  }
  checkCloudVersion = async () => {
    const code = String(this.state.cloudSyncCode || this.state.cloudCodeInput || localStorage.getItem('zzz_cloud_code') || '').trim().toUpperCase();
    if (!this.cloudReady() || !code) { this.setState({ cloudStatus: '还没有连接同步代码。' }); return; }
    this.setState({ cloudBusy: true, cloudStatus: '正在检查云端版本…' });
    try {
      const data = (await this.findCloudCollectionByCode(code, 'id,sync_code,updated_at,data')).row;
      if (!data) throw new Error('没有找到云端收藏库');
      const remoteAt = data.updated_at || (data.data && data.data.updated_at) || '';
      const localAt = this.state.cloudLastSyncedAt || localStorage.getItem('zzz_cloud_last_synced_at') || '';
      const remoteNewer = remoteAt && (!localAt || new Date(remoteAt).getTime() > new Date(localAt).getTime() + 1000);
      const msg = remoteNewer
        ? '发现云端有较新版本：' + this.fmtCloudTime(remoteAt) + (this.state.cloudPending ? '；本机也有未上传修改，请先决定保留哪一边。' : '。可点击“读取云端数据”。')
        : '云端没有发现比本机同步记录更新的版本。云端时间：' + this.fmtCloudTime(remoteAt);
      this.setState({ cloudSyncId: data.id, cloudSyncCode: data.sync_code, cloudRemoteUpdatedAt: remoteAt, cloudStatus: msg, cloudBusy: false });
    } catch (e) { this.setState({ cloudStatus: '检查失败：' + ((e && e.message) || e), cloudBusy: false }); }
  };
  createCloudCollection = async () => {
    if (!this.cloudReady()) { this.setState({ cloudStatus: 'Supabase 未连接，请检查网络或配置。' }); return; }
    this.setState({ cloudBusy: true, cloudPending: false, cloudStatus: '正在创建同步代码…' });
    try {
      for (let i = 0; i < 8; i++) {
        const code = this.genSyncCode();
        const imgSync = await this.syncCloudImagesForItems(this.state.items || []);
        const snap = this.cloudSnapshot(imgSync.map);
        const inserted = await this.sb.from('collections').insert([{ sync_code: code, client_uuid: this.clientUuid(), cn: ((this.state.settingsDraft && this.state.settingsDraft.collectorName) || this.state.collectorName || null), title: ((this.state.settingsDraft && this.state.settingsDraft.title) || this.state.title || null), data: snap }]);
        if (!inserted.error) {
          const data = (await this.findCloudCollectionByCode(code, 'id,sync_code,updated_at')).row;
          if (!data) throw new Error('云端记录已提交，但当前账号无权读取；请检查 collections 表权限');
          localStorage.setItem('zzz_cloud_id', data.id); localStorage.setItem('zzz_cloud_code', data.sync_code); localStorage.setItem('zzz_cloud_last_synced_at', new Date().toISOString());
          await this.uploadCollectionSummary(data.sync_code);
          this.setState({ cloudSyncId: data.id, cloudSyncCode: data.sync_code, cloudCodeInput: data.sync_code, cloudStatus: '同步代码已生成！当前资料已上传到云端。以后换电脑、换手机，记得带上它一起出发～', cloudBusy: false, cloudPending: false, cloudLastSyncedAt: new Date().toISOString() });
          return;
        }
      }
      this.setState({ cloudStatus: '创建失败，请稍后再试。', cloudBusy: false, cloudPending: false });
    } catch (e) { this.setState({ cloudStatus: '创建失败：' + (e.message || e), cloudBusy: false, cloudPending: false }); }
  };
  onCloudCodeInput = (e) => this.setState({ cloudCodeInput: (e.target.value || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8) });
  connectCloudCollection = async () => {
    const code = (this.state.cloudCodeInput || '').trim().toUpperCase();
    if (!code) { this.setState({ cloudStatus: '请先输入旧同步代码。' }); return; }
    if (!this.cloudReady()) { this.setState({ cloudStatus: 'Supabase 未连接，请检查网络或配置。' }); return; }
    if (!this.state.authUser) { this.setState({ cloudStatus: '请先登录账号。' }); return; }
    this.setState({ cloudBusy: true, cloudPending: false, cloudStatus: '正在迁移旧云端与排发资料…' });
    try {
      const oldCollection = await this.findCloudCollectionByCode(code);
      const oldDocsQuery = await this.sb.from('shipping_documents').select('id').eq('sync_code', code).limit(1);
      if (oldDocsQuery.error) throw oldDocsQuery.error;
      const hasOldShipping = Array.isArray(oldDocsQuery.data) && oldDocsQuery.data.length > 0;
      if (!oldCollection.row && !hasOldShipping) throw new Error('没有找到这个旧同步码对应的收藏或排发资料');
      const linked = await this.ensureAccountCloudCollection(this.state.authUser, code);
      const migrated = await this.migrateLocalShippingToCloud(linked.code);
      const records = await this.loadShippingFromCloud(linked.code);
      const count = records.length;
      this.setState({ cloudSyncId: linked.row.id, cloudSyncCode: linked.code, cloudCodeInput: '', cloudStatus: '旧资料已绑定到当前账号。排发中心已读取 ' + count + ' 份资料；如需继承收藏主数据，请点击“合并云端与本机”。', cloudBusy: false, cloudPending: false, cloudRemoteUpdatedAt: linked.row.updated_at || '' });
    } catch (e) { this.setState({ cloudStatus: '旧资料迁移失败：' + (e.message || e), cloudBusy: false, cloudPending: false }); }
  };
  // 手机端快捷同步：点一下选择上传或读取
  mobileCloudSync = () => {
    if (this.state.mobileMineOpen) this.setState({ mobileMineOpen: false });
    if (this.state.cloudBusy) { return; }
    const hasCode = !!(this.state.cloudSyncCode || localStorage.getItem('zzz_cloud_code'));
    if (!hasCode) { alert('账号云端尚未建立。请先到「设置 → 账号云端」检查连接。'); this.openSettings && this.openSettings(); return; }
    const pending = this.state.cloudPending ? '（本机有未上传的修改）' : '';
    const up = window.confirm('云端同步' + pending + '\n\n点「确定」= 上传到云端（用本机资料覆盖云端）\n点「取消」= 换成读取云端数据到本机');
    if (up) { this.pushCloud(); }
    else { const ok = window.confirm('读取云端数据会用云端资料覆盖本机当前内容。\n\n确定要读取吗？'); if (ok) this.pullCloud(); }
  };
  pushCloud = async (auto, forceOverwrite) => {
    const code = String(this.state.cloudSyncCode || localStorage.getItem('zzz_cloud_code') || '').trim().toUpperCase();
    if (!this.cloudReady() || !code) { if (!auto) this.setState({ cloudStatus: '还没有连接同步代码。', cloudBusy: false }); return; }
    this.setState({ cloudBusy: true, cloudStatus: auto ? '正在自动上传到云端…' : '正在检查并上传到云端…' });
    try {
      const remote = (await this.findCloudCollectionByCode(code, 'id,sync_code,updated_at')).row;
      if (!remote) {
        // 云端还没有这个同步码（新账号首次上传）→ 直接创建
        const imgSync0 = await this.syncCloudImagesForItems(this.state.items || []);
        const now0 = new Date().toISOString();
        const insertPayload = { sync_code: code, client_uuid: this.clientUuid(), cn: this.state.collectorName || null, title: this.state.title || null, data: this.cloudSnapshot(imgSync0.map), updated_at: now0 };
        const inserted = await this.sb.from('collections').insert([insertPayload]);
        if (inserted.error) throw inserted.error;
        const created = (await this.findCloudCollectionByCode(code, 'id,sync_code,updated_at')).row;
        if (!created) throw new Error('云端记录已创建，但当前账号无权读取；请检查 collections 表权限');
        const syncedAt0 = (created && created.updated_at) || now0;
        try { localStorage.setItem('zzz_cloud_id', created ? created.id : ''); localStorage.setItem('zzz_cloud_code', code); localStorage.setItem('zzz_cloud_last_synced_at', syncedAt0); } catch (e) {}
        await this.uploadCollectionSummary(code);
        this.setState({ cloudSyncId: created ? created.id : '', cloudSyncCode: code, cloudCodeInput: code, cloudStatus: '已创建云端收藏库并上传，共 ' + ((this.state.items || []).length) + ' 件谷子。同步时间：' + this.fmtCloudTime(syncedAt0), cloudBusy: false, cloudPending: false, cloudLastSyncedAt: syncedAt0, cloudRemoteUpdatedAt: syncedAt0, syncConflict: null, initialSyncReady: true });
        return;
      }
      const localSyncedAt = this.state.cloudLastSyncedAt || localStorage.getItem('zzz_cloud_last_synced_at') || '';
      const remoteAt = remote.updated_at || '';
      // 冲突弹窗已移除：不论自动还是手动，云端较新时都直接以本机为准覆盖
      const imgSync = await this.syncCloudImagesForItems(this.state.items || []);
      const now = new Date().toISOString();
      const payload = { client_uuid: this.clientUuid(), cn: this.state.collectorName || null, title: this.state.title || null, data: this.cloudSnapshot(imgSync.map), updated_at: now };
      const { data, error } = await this.sb.from('collections').update(payload).eq('id', remote.id).select('id,sync_code,updated_at');
      if (error) throw error;
      if (!Array.isArray(data) || data.length !== 1) throw new Error('同步代码 ' + code + ' 没有匹配到云端收藏库，实际更新 ' + ((data && data.length) || 0) + ' 条记录');
      const syncedAt = data[0].updated_at || now;
      localStorage.setItem('zzz_cloud_id', data[0].id);
      localStorage.setItem('zzz_cloud_code', data[0].sync_code);
      localStorage.setItem('zzz_cloud_last_synced_at', syncedAt);
      await this.uploadCollectionSummary(code);
      const imageTip = imgSync.failed ? '；有 ' + imgSync.failed + ' 张图片上传失败' : '';
      this.setState({ cloudSyncId: data[0].id, cloudSyncCode: data[0].sync_code, cloudCodeInput: data[0].sync_code, cloudStatus: (auto ? '已自动上传到云端（停手 5 分钟触发），共 ' : '已手动上传到云端，共 ') + ((this.state.items || []).length) + ' 件谷子' + imageTip + '。同步时间：' + this.fmtCloudTime(syncedAt), cloudBusy: false, cloudPending: false, cloudLastSyncedAt: syncedAt, cloudRemoteUpdatedAt: syncedAt, syncConflict: null, initialSyncReady: true });
    } catch (e) {
      console.error('pushCloud failed:', e);
      this.setState({ cloudStatus: (auto ? '自动上传失败（稍后会再尝试）：' : '上传失败：') + ((e && e.message) || e), cloudBusy: false, cloudPending: true });
    }
  };
  pullCloud = async (forceReplace) => {
    const code = String(this.state.cloudSyncCode || this.state.cloudCodeInput || localStorage.getItem('zzz_cloud_code') || '').trim().toUpperCase();
    if (!this.cloudReady() || !code) { this.setState({ cloudStatus: '还没有连接同步代码。', cloudBusy: false }); return; }
    if (this.state.cloudPending && !forceReplace) {
      const ok = window.confirm('本机有尚未上传的修改。\n\n读取云端会覆盖本机当前资料。建议先导出 JSON 备份。\n\n确定仍要读取云端吗？');
      if (!ok) { this.setState({ cloudStatus: '已取消读取，本机未上传修改仍保留。' }); return; }
    }
    this.setState({ cloudBusy: true, cloudStatus: '正在从云端读取…' });
    try {
      let data = null;
      const id = this.state.cloudSyncId || localStorage.getItem('zzz_cloud_id') || '';
      if (id) {
        const q = await this.sb.from('collections').select('id,sync_code,data,updated_at').eq('id', id).limit(1);
        if (q.error) throw q.error;
        data = Array.isArray(q.data) ? q.data[0] : null;
      }
      if (!data) data = (await this.findCloudCollectionByCode(code)).row;
      if (!data) throw new Error('没有找到云端收藏库');
      const syncedAt = data.updated_at || (data.data && data.data.updated_at) || new Date().toISOString();
      localStorage.setItem('zzz_cloud_id', data.id);
      localStorage.setItem('zzz_cloud_code', data.sync_code);
      localStorage.setItem('zzz_cloud_last_synced_at', syncedAt);
      await this.applyCloudSnapshot(data.data || {});
      await this.loadShippingFromCloud(data.sync_code);
      const itemCount = Array.isArray(data.data && data.data.items) ? data.data.items.length : 0;
      this.setState({ cloudSyncId: data.id, cloudSyncCode: data.sync_code, cloudCodeInput: data.sync_code, cloudStatus: '已读取云端，共 ' + itemCount + ' 件谷子。云端时间：' + this.fmtCloudTime(syncedAt), cloudBusy: false, cloudPending: false, cloudLastSyncedAt: syncedAt, cloudRemoteUpdatedAt: syncedAt, syncConflict: null, syncConflictChoice: '', initialSyncReady: true });
    } catch (e) {
      console.error('pullCloud failed:', e);
      this.setState({ cloudStatus: '读取失败：' + ((e && e.message) || e), cloudBusy: false, syncConflictChoice: '' });
    }
  };
  disconnectCloud = () => { try { localStorage.removeItem('zzz_cloud_id'); localStorage.removeItem('zzz_cloud_code'); localStorage.removeItem('zzz_cloud_last_synced_at'); } catch(e) {} this.setState({ cloudSyncId: '', cloudSyncCode: '', cloudCodeInput: '', cloudStatus: '已退出云同步，本地数据仍保留。', cloudPending: false, cloudLastSyncedAt: '', cloudRemoteUpdatedAt: '' }); };
  copyCloudCode = async () => { const code = (this.state.cloudSyncCode || this.state.cloudCodeInput || '').trim(); if (!code) { this.setState({ cloudStatus: '还没有同步代码，先生成一个吧。' }); return; } try { await navigator.clipboard.writeText(code); this.setState({ cloudStatus: '已复制同步代码：' + code }); } catch(e) { window.prompt('复制这串同步代码：', code); } };
  clearAllData = async () => {
    const count = (this.state.items || []).length;
    const first = window.confirm('危险操作：将清空本机全部资料，包括收藏、作品、标签、设置和本地图片缓存。\n\n建议先取消并导出备份。确定要继续吗？');
    if (!first) return;
    const second = window.confirm('第二次确认：真的要清空 ' + count + ' 条收藏资料吗？\n\n点击“确定”后会立即删除，无法恢复。');
    if (!second) return;
    clearTimeout(this._cloudTimer);
    try { Object.keys(localStorage).filter(k => k.indexOf('zzz_') === 0).forEach(k => localStorage.removeItem(k)); } catch (e) {}
    try { await this.idbClear(); } catch (e) {}
    const works = [{ id: this.MAIN_WORK, group: this.DEFAULT_GROUP, name: '默认作品' }];
    const filterOn = { character: true, type: true, series: false, form: false, acquire: true, channel: true, purchaseChannel: true, status: false };
    const acquireOrder = ['日谷','国谷','同人'];
    const reminderTypes = [...this.REMINDER_TYPES];
    try {
      localStorage.setItem('zzz_goods_v1', JSON.stringify([]));
      localStorage.setItem('zzz_works', JSON.stringify(works));
      localStorage.setItem('zzz_current_work', this.MAIN_WORK);
      localStorage.setItem('zzz_field_labels', JSON.stringify(this.FIELD_DEFAULTS));
      localStorage.setItem('zzz_filter_on', JSON.stringify(filterOn));
      localStorage.setItem('zzz_purchase_channels', JSON.stringify(this.CHANNELS));
      localStorage.setItem('zzz_form_order', JSON.stringify(this.FORMS));
      localStorage.setItem('zzz_acquire_order', JSON.stringify(acquireOrder));
      localStorage.setItem('zzz_reminder_types', JSON.stringify(reminderTypes));
      localStorage.setItem('zzz_status', JSON.stringify(this.STATUSES));
      localStorage.setItem('zzz_name_style', 'default');
      localStorage.setItem('zzz_display_mode', 'standard');
      localStorage.setItem('zzz_dashboard_cards', JSON.stringify(this.defaultDashboardCards()));
    } catch (e) {}
    this.imgUrls = {};
    this.logoUrl = null;
    this.bgUrl = null;
    this.workLogoUrls = {};
    this.charAssetMap = {};
    this.charImgIds = {};
    this.charImgMap = { ...this.CHAR_IMG };
    this._ciInit = true;
    const lists = this.loadWorkLists(this.MAIN_WORK, []);
    this.charOrder = lists.charOrder;
    this.setState({
      items: [], works, currentWorkId: this.MAIN_WORK, group: 'all', groupBy: 'none', search: '',
      charSel: [], typeSel: [], seriesFilter: '全部', formSel: [], statusSel: [], acquireSel: [], channelSel: [], purchaseChannelSel: [], customFilterSel: {}, customFilterOrder: {},
      workGroupLabel: '系列IP', workMenuOpen: false, fieldLabels: { ...this.FIELD_DEFAULTS }, filterOn, statsOn: null, deletedFields: [], customFields: [], optBuf: {}, purchaseChannels: [...this.CHANNELS], hiddenPurchaseChannels: [], reminderTypes, nameStyleMode: 'default', displayMode: 'standard', dashboardCards: this.defaultDashboardCards(),
      settingsOpen: false, dataManageOpen: false, settingsDraft: null, collectorName: '', currency: '', accent: '', nameStyleMode: 'default', displayMode: 'standard', cloudSyncId: '', cloudSyncCode: '', cloudCodeInput: '', cloudStatus: '本机资料已清空。', cloudBusy: false, cloudPending: false, cloudLastSyncedAt: '', cloudRemoteUpdatedAt: '',
      modalOpen: false, editing: null, draft: null,
      title: '谷子收纳', subtitle: '梦 境 特 工 档 案', footer: '梦境特工档案 · コードナンバー：収集家',
      ...lists, savedAt: Date.now()
    }, () => { this.applyThemeVars(); this.applyBg(); });
  };

  // ===== 设置 =====
  makeSettingsDraft() {
    return {
      collectorName: this.state.collectorName || '',
      currency: this.state.currency || '',
      accent: this.state.accent || this.props.accent || '#ff3355',
      nameStyleMode: this.state.nameStyleMode || 'default',
      displayMode: this.state.displayMode || 'standard',
      dashboardCards: this.normalizeDashboardCards(this.state.dashboardCards),
      title: this.state.title || '',
      subtitle: this.state.subtitle || '',
      footer: this.state.footer || '',
      works: (this.state.works || []).map(w => ({ ...w })),
      currentWorkId: this.state.currentWorkId || this.MAIN_WORK,
      fieldLabels: { ...(this.state.fieldLabels || {}) },
      filterOn: { ...(this.state.filterOn || {}) },
      statsOn: { ...(this.state.statsOn || {}) },
      customFields: (this.state.customFields || []).map(f => ({ ...f }))
    };
  }
  SHIPPING_TYPES = ['本体资料','国际资料','转单资料','拼单资料','商品资料','补充资料'];
  SHIPPING_ROLES = {
    '本体资料':['肾表／群内交款要求','我的付款截图'],
    '国际资料':['国际表／国际通知','我的付款截图'],
    '转单资料':['聊天记录','付款截图','确认截图'],
    '拼单资料':['聊天记录','付款截图','确认截图'],
    '商品资料':['扫街 CN 图','扭蛋 CN 图','订单截图','商品实拍','平铺'],
    '补充资料':['国内运费截图','其他截图','其他附件']
  };
  shippingRoles(type) { const custom = (this.state.shippingRolesCustom || {})[type]; return (custom && custom.length ? custom : this.SHIPPING_ROLES[type]) || ['其他附件']; }
  shippingRoleLabel(raw) {
    const text=String(raw||'其他附件');
    const labels={
      '肾表／群内交款要求':'肾表／群内交款要求',
      '我的付款截图':'我的付款截图',
      '国际表／国际通知':'国际表／国际通知',
      '聊天记录':'聊天记录',
      '付款截图':'付款截图',
      '确认截图':'确认截图',
      '扫街 CN 图':'扫街 CN 图',
      '扭蛋 CN 图':'扭蛋 CN 图',
      '订单截图':'订单截图',
      '商品实拍':'商品实拍',
      '国内运费截图':'国内运费截图',
      '其他截图':'其他截图',
      '其他附件':'其他附件'
    };
    return labels[text]||text;
  }
  shippingTypeLabel(raw) {
    const text=String(raw||'补充资料');
    const labels={
      '本体资料':'本体资料',
      '国际资料':'国际资料',
      '转单资料':'转单资料',
      '拼单资料':'拼单资料',
      '商品资料':'商品资料',
      '补充资料':'补充资料'
    };
    return {module:labels[text]||text,role:''};
  }
  onItemEvidencePick = (role) => (e) => {
    const files=[...((e&&e.target&&e.target.files)||[])];
    if(!files.length)return;
    const valid=[];
    for(const f of files){if(!/^image\/(png|jpeg|webp)$/i.test(f.type||'')){alert('只支持 PNG、JPG、WEBP 图片。');continue;}if(f.size>10*1024*1024){alert('单张资料图片不能超过 10 MB：'+(f.name||''));continue;}valid.push({role,file:f,filename:f.name||role});}
    this.setState(st=>({itemEvidenceDrafts:[...(st.itemEvidenceDrafts||[]),...valid]}));
    e.target.value='';
  };
  onItemEvidenceExistingSelect = (e) => { const id=String((e&&e.target&&e.target.value)||''); if(!id)return; this.setState(st=>({itemEvidenceExistingIds:[...new Set([...(st.itemEvidenceExistingIds||[]),id])]})); e.target.value=''; };
  openItemEvidenceExistingSelect = (ev) => { const opts = (this.state.shippingRecords||[]).filter(r=>r.type==='本体资料').map(r=>({ value:r.id, label:[r.group,r.title,r.note,(r.images||[]).length+'张图'].filter(Boolean).join(' · ') })); if (!opts.length) { alert('还没有「本体资料」类型的资料可选。'); return; } this.openGenericSelect('选择已有本体资料', opts, '', (id) => { if(!id) return; this.setState(st=>({ itemEvidenceExistingIds:[...new Set([...(st.itemEvidenceExistingIds||[]),id])] })); }, ev); };
  async linkExistingDocumentsToItem(item){const ids=this.state.itemEvidenceExistingIds||[];if(!ids.length||!item||!item.id||!this.sb)return;const rows=ids.map(document_id=>({document_id,item_id:item.id,sync_code:this.shippingSyncCode()}));const{error}=await this.sb.from('shipping_document_items').upsert(rows,{onConflict:'document_id,item_id'});if(error)throw error;}
  async ensureShippingChannel(code,name){
    const channelName=String(name||'').trim(); if(!channelName)throw new Error('请先填写渠道 / 排发群。');
    const payload={sync_code:code,client_uuid:this.clientUuid(),channel_name:channelName,cn:(this.state.collectorName||'').trim()||null};
    const{data,error}=await this.sb.from('shipping_channels').upsert([payload],{onConflict:'sync_code,channel_name'}).select('id,channel_name');if(error)throw error;const row=Array.isArray(data)?data[0]:null;if(!row)throw new Error('渠道已提交但无法读取，请检查 shipping_channels 表权限');return row;
  }
  async createShippingDocument(code,d){
    const channel=await this.ensureShippingChannel(code,d.group);
    const payload={sync_code:code,client_uuid:this.clientUuid(),channel_id:channel.id,document_group:d.type||'补充资料',title:(d.title||d.type||'资料').trim(),note:(d.note||'').trim()||null};
    const{data,error}=await this.sb.from('shipping_documents').insert([payload]).select('id');if(error)throw error;const row=Array.isArray(data)?data[0]:null;if(!row)throw new Error('排发资料已提交但无法读取，请检查 shipping_documents 表权限');return row.id;
  }
  async uploadDocumentImages(code,documentId,group,files){
    let sort=0; const uploaded=[];
    try{
      for(const entry of (files||[])){
        const file=entry.file; const ext=((file.type||'').split('/')[1]||'jpg').replace('jpeg','jpg');
        const filename=Date.now()+'_'+Math.random().toString(36).slice(2,9)+'.'+ext;
        const path=[this.safeStoragePart(code),this.safeStoragePart(group),'documents',documentId,filename].join('/');
        const{error:ue}=await this.sb.storage.from(this.SUPA_SHIPPING_BUCKET).upload(path,file,{upsert:false,contentType:file.type||'image/jpeg',cacheControl:'3600'});if(ue)throw ue;
        uploaded.push(path);const pub=this.sb.storage.from(this.SUPA_SHIPPING_BUCKET).getPublicUrl(path);
        const row={document_id:documentId,image_role:entry.role||'其他附件',storage_bucket:this.SUPA_SHIPPING_BUCKET,storage_path:path,public_url:pub&&pub.data?pub.data.publicUrl:null,original_filename:file.name||null,mime_type:file.type||null,file_size:file.size||null,sort_order:sort++};
        const{error:ie}=await this.sb.from('shipping_document_images').insert([row]);if(ie)throw ie;
      }
    }catch(e){if(uploaded.length)await this.sb.storage.from(this.SUPA_SHIPPING_BUCKET).remove(uploaded);throw e;}
  }
  async linkDocumentItems(documentId,itemIds,code){const rows=[...new Set(itemIds||[])].map(item_id=>({document_id:documentId,item_id,sync_code:code}));if(!rows.length)return;const{error}=await this.sb.from('shipping_document_items').upsert(rows,{onConflict:'document_id,item_id'});if(error)throw error;}
  async uploadPendingItemEvidence(item){
    const files=this.state.itemEvidenceDrafts||[],existing=this.state.itemEvidenceExistingIds||[];if(!files.length&&!existing.length)return;
    const code=this.shippingSyncCode();
    if(!code){const now=Date.now();const meta=this.loadLocalShippingMeta();
      if(files.length){const imgs=[];for(let i=0;i<files.length;i++){const f=files[i];const id='shipimg_'+now+'_'+i+'_'+Math.random().toString(36).slice(2,6);await this.idbPut(id,f.file||f);imgs.push({id,role:f.role||'本体资料',filename:(f.file&&f.file.name)||f.filename||'图片'});}
        meta.push({id:'shiploc_'+now+'_'+Math.random().toString(36).slice(2,6),group:String((item&&item.purchaseChannel)||'').trim(),cn:(this.state.collectorName||'').trim(),type:'本体资料',title:'本体资料',note:'录入谷子时创建',itemIds:[item.id],createdAt:now,imgs});}
      existing.forEach(rid=>{const m=meta.find(x=>x.id===rid);if(m&&!(m.itemIds||[]).includes(item.id))m.itemIds=[...(m.itemIds||[]),item.id];});
      this.persistLocalShippingMeta(meta);await this.loadLocalShipping();return;}
    if(!this.sb)throw new Error('云端未就绪，谷子已保存在本机。');
    const group=String((item&&item.purchaseChannel)||'').trim();
    if(files.length){const documentId=await this.createShippingDocument(code,{group,type:'本体资料',title:'本体资料',note:'录入谷子时创建'});await this.uploadDocumentImages(code,documentId,group,files);await this.linkDocumentItems(documentId,[item.id],code);}
    await this.linkExistingDocumentsToItem(item);await this.loadShippingFromCloud(code);
  }
  newShippingDraft(){return{group:'',type:'本体资料',role:'肾表／群内交款要求',files:[],itemIds:[],note:'',search:'',status:'全部'};}
  shippingPackageKey(r){return String((r&&r.group)||'未分类渠道')+'||排发中心';}
  loadLocalShippingMeta(){try{return JSON.parse(localStorage.getItem('zzz_shipping_local')||'[]')||[];}catch(e){return[];}}
  persistLocalShippingMeta(arr){try{localStorage.setItem('zzz_shipping_local',JSON.stringify(arr));}catch(e){}}
  async migrateLocalShippingToCloud(codeArg='') {
    const code = String(codeArg || this.shippingSyncCode()).trim().toUpperCase();
    if (!this.sb || !code) return { migrated: 0, skipped: 0, failed: 0 };
    const meta = this.loadLocalShippingMeta();
    const markerKey = 'zzz_shipping_migrated__' + code;
    let done = [];
    try { done = JSON.parse(localStorage.getItem(markerKey) || '[]') || []; } catch (e) { done = []; }
    const migratedIds = new Set(done);
    let migrated = 0, skipped = 0, failed = 0;
    for (const m of meta) {
      if (!m || !m.id || migratedIds.has(m.id)) { skipped++; continue; }
      try {
        const files = [];
        for (const im of (m.imgs || [])) {
          const blob = await this.idbGet(im.id);
          if (blob) files.push({ file: blob, role: im.role || '其他附件', filename: im.filename || '图片' });
        }
        const documentId = await this.createShippingDocument(code, { group: m.group || '未分类渠道', type: m.type || '补充资料', title: m.title || m.type || '资料', note: m.note || '从本机迁移' });
        if (files.length) await this.uploadDocumentImages(code, documentId, m.group || '未分类渠道', files);
        if ((m.itemIds || []).length) await this.linkDocumentItems(documentId, m.itemIds, code);
        migratedIds.add(m.id);
        localStorage.setItem(markerKey, JSON.stringify(Array.from(migratedIds)));
        migrated++;
      } catch (e) {
        console.error('migrateLocalShippingToCloud failed:', m && m.id, e);
        failed++;
      }
    }
    return { migrated, skipped, failed };
  }
  async loadLocalShipping(){
    const meta=this.loadLocalShippingMeta();const records=[];
    for(const m of meta){const imgs=[];for(const im of (m.imgs||[])){let url='';try{const b=await this.idbGet(im.id);if(b)url=URL.createObjectURL(b);}catch(e){}imgs.push({id:im.id,role:im.role,image:url,localId:im.id,filename:im.filename});}
      records.push({id:m.id,local:true,group:m.group||'',cn:m.cn||'',type:m.type||'补充资料',typeLabel:this.shippingTypeLabel(m.type||'补充资料').module,title:m.title||'',note:m.note||'',images:imgs,image:(imgs[0]&&imgs[0].image)||'',itemIds:m.itemIds||[],createdAt:m.createdAt||0,updatedAt:m.createdAt||0});}
    records.sort((a,b)=>(a.createdAt||0)-(b.createdAt||0));
    this.setState({shippingRecords:records},()=>this.autoPairShipping());return records;
  }
  safeStoragePart(v){const s=String(v||'').trim().replace(/[^a-zA-Z0-9_-]+/g,'_').replace(/^_+|_+$/g,'').slice(0,80);return s||'x';}
  shippingSyncCode(){return String(this.state.cloudSyncCode||localStorage.getItem('zzz_cloud_code')||'').trim().toUpperCase();}
  openShipping=()=>this.setState({shippingOpen:true,shipNotice:'',shippingDraft:this.newShippingDraft(),mobileMineOpen:false},()=>{this.autoPairShipping();if(this.shippingSyncCode())this.loadShippingFromCloud();else this.loadLocalShipping();});
  closeShipping=()=>this.setState({shippingOpen:false});
  closeShipMenus(extra={}){return{shipTypeMenuOpen:false,shipRoleMenuOpen:false,shipStatusMenuOpen:false,shipGroupMenuOpen:false,...extra};}
  // ==== 通用自定义下拉（替代原生 select，避免 iPhone 弹出系统滚轮）====
  // 用法：openGenericSelect(title, options:[{value,label}], currentValue, onPickFn)
  openGenericSelect = (title, options, current, onPick, ev) => {
    this._genericSelectPick = onPick;
    let anchor = null;
    try {
      const el = ev && (ev.currentTarget || ev.target);
      if (el && el.getBoundingClientRect) { const r = el.getBoundingClientRect(); anchor = { left: r.left, right: r.right, top: r.top, bottom: r.bottom, width: r.width }; }
    } catch (e) {}
    this.setState({ genericSelectOpen: true, genericSelectTitle: title || '选择', genericSelectOptions: options || [], genericSelectValue: current, genericSelectAnchor: anchor });
  };
  closeGenericSelect = () => this.setState({ genericSelectOpen: false, genericSelectOptions: [], genericSelectAnchor: null });
  pickGenericSelect = (v) => () => { const fn = this._genericSelectPick; this.closeGenericSelect(); if (fn) fn(v); };
  toggleShipMenu=(key)=>()=>this.setState(s=>this.closeShipMenus({[key]:!s[key]}));
  pickShip=(k,v)=>()=>this.setState(st=>{const d={...(st.shippingDraft||this.newShippingDraft()),[k]:v};if(k==='type')d.role=this.shippingRoles(v)[0]||'其他附件';return{shippingDraft:d,...this.closeShipMenus()};});
  onShipField=(k)=>(e)=>{const v=e&&e.target?e.target.value:'';this.setState(st=>{const d={...(st.shippingDraft||this.newShippingDraft()),[k]:v};if(k==='type')d.role=this.shippingRoles(v)[0]||'其他附件';if(k==='group')d.itemIds=[];return{shippingDraft:d};});};
  onShipImage=(e)=>{const files=[...((e&&e.target&&e.target.files)||[])];if(!files.length)return;this.setState(st=>{const d=st.shippingDraft||this.newShippingDraft(),add=[];for(const f of files){if(/^image\/(png|jpeg|webp)$/i.test(f.type||'')&&f.size<=10*1024*1024)add.push({role:d.role||'其他附件',file:f,filename:f.name||'图片'});}return{shippingDraft:{...d,files:[...(d.files||[]),...add]}};});e.target.value='';};
  clearShipImages=()=>this.setState(st=>({shippingDraft:{...(st.shippingDraft||this.newShippingDraft()),files:[]}}));
  toggleShipItem=(id)=>()=>this.setState(st=>{const d=st.shippingDraft||this.newShippingDraft(),a=Array.isArray(d.itemIds)?d.itemIds:[];return{shippingDraft:{...d,itemIds:a.includes(id)?a.filter(x=>x!==id):[...a,id]}};});
  // ==== 生成排发长图：独立的选谷子器（自带团筛选 + 勾选，不依赖左边新增表单）====
  toggleAddFormCollapsed=()=>this.setState(st=>({shipAddCollapsed:!st.shipAddCollapsed}));
  onExportGroup=(e)=>{const v=e&&e.target?e.target.value:'';this.setState({exportGroup:v});};
  openExportGroupSelect = (ev) => { const opts = [{ value:'', label:'全部团／渠道' }, ...(this._exportGroupOpts||[]).map(g => ({ value:g, label:g }))]; this.openGenericSelect('筛选团／渠道', opts, this.state.exportGroup || '', (v) => this.setState({ exportGroup: v }), ev); };
  onExportSearch=(e)=>{const v=e&&e.target?e.target.value:'';this.setState({exportSearch:v});};
  toggleExportItem=(id)=>()=>this.setState(st=>{const a=Array.isArray(st.exportIds)?st.exportIds:[];return{exportIds:a.includes(id)?a.filter(x=>x!==id):[...a,id]};});
  // 导出选谷子器可见的谷子：只列出「有关联排发资料」的谷子，按团/渠道 + 搜索过滤
  exportVisibleItems(){
    const group=String(this.state.exportGroup||'').trim();
    const q=String(this.state.exportSearch||'').trim().toLowerCase();
    const recs=this.state.shippingRecords||[];
    const idsWithRecords=new Set(recs.flatMap(r=>r.itemIds||[]));
    // 每个谷子关联到的团/渠道集合
    const itemGroups={};
    recs.forEach(r=>{(r.itemIds||[]).forEach(id=>{(itemGroups[id]=itemGroups[id]||new Set()).add(String(r.group||'未分类渠道'));});});
    return (this.state.items||[]).filter(it=>{
      if(!idsWithRecords.has(it.id))return false;
      if(group&&!(itemGroups[it.id]&&itemGroups[it.id].has(group)))return false;
      if(q){const hay=[it.name,it.character,it.type,it.subtype,it.series,it.note,it.purchaseChannel].map(x=>String(x||'').toLowerCase()).join(' ');if(!hay.includes(q))return false;}
      return true;
    });
  }
  selectAllExportItems=()=>this.setState(st=>{const ids=this.exportVisibleItems().map(x=>x.id);return{exportIds:[...new Set([...(st.exportIds||[]),...ids])]};});
  clearExportItems=()=>this.setState({exportIds:[]});
  setShippingViewChannel=(g)=>()=>this.setState({shippingViewChannel:g});
  shippingVisibleItems(draft=null){const d=draft||this.state.shippingDraft||this.newShippingDraft(),group=String(d.group||'').trim().toLowerCase(),q=String(d.search||'').trim().toLowerCase(),status=String(d.status||'全部');return(this.state.items||[]).filter(it=>{const sameGroup=!group||String(it.purchaseChannel||'').trim().toLowerCase()===group,sameStatus=status==='全部'||String(it.status||'')===status,hay=[it.name,it.character,it.type,it.subtype,it.series,it.note,it.purchaseChannel,it.channel,it.setName].map(x=>String(x||'').toLowerCase()).join(' ');return sameGroup&&sameStatus&&(!q||hay.includes(q));});}
  selectAllVisibleShipItems=()=>this.setState(st=>{const d=st.shippingDraft||this.newShippingDraft(),ids=this.shippingVisibleItems(d).map(x=>x.id);return{shippingDraft:{...d,itemIds:[...new Set([...(d.itemIds||[]),...ids])]}};});
  clearShipItems=()=>this.setState(st=>({shippingDraft:{...(st.shippingDraft||this.newShippingDraft()),itemIds:[]}}));
  // ==== 修改某份资料关联了哪些谷子（取消 / 补关联）====
  openRelinkRecord=(recordId)=>()=>{const rec=(this.state.shippingRecords||[]).find(r=>r.id===recordId);if(!rec)return;this.setState({relinkRecordId:recordId,relinkItemIds:[...(rec.itemIds||[])],relinkSearch:'',relinkNote:rec.note||'',relinkGroup:rec.group||'',relinkNoteOpen:false,relinkImages:(rec.images||[]).map(im=>({...im,toRemove:false})),relinkNewFiles:[],relinkRecordType:rec.type||'补充资料'});};
  closeRelink=()=>this.setState({relinkRecordId:null,relinkItemIds:[],relinkSearch:'',relinkNote:'',relinkGroup:'',relinkNoteOpen:false,relinkImages:[],relinkNewFiles:[],relinkRecordType:''});
  onRelinkGroup=(e)=>{const v=e&&e.target?e.target.value:'';this.setState({relinkGroup:v});};
  openRelinkGroupSelect=(ev)=>{const opts=[...new Set([...(this.state.purchaseChannels||[]),...(this.state.channels||[]),...((this.state.shippingRecords||[]).map(r=>r.group).filter(Boolean))])].map(g=>({value:g,label:g}));if(!opts.length){alert('还没有可选的团／渠道。可先在谷子的「渠道」里添加。');return;}this.openGenericSelect('选择团／渠道',opts,this.state.relinkGroup||'',(v)=>this.setState({relinkGroup:v}),ev);};
  toggleRelinkNote=()=>this.setState(st=>({relinkNoteOpen:!st.relinkNoteOpen}));
  toggleRelinkImageRemove=(imgId)=>()=>this.setState(st=>({relinkImages:(st.relinkImages||[]).map(im=>im.id===imgId?{...im,toRemove:!im.toRemove}:im)}));
  setRelinkImageRole=(imgId)=>(e)=>{const v=e&&e.target?e.target.value:'';this.setState(st=>({relinkImages:(st.relinkImages||[]).map(im=>im.id===imgId?{...im,role:v}:im)}));};
  onRelinkNewFiles=(e)=>{const files=[...((e&&e.target&&e.target.files)||[])];if(!files.length)return;this.setState(st=>{const type=st.relinkRecordType||'补充资料';const defRole=this.shippingRoles(type)[0];const add=[];for(const f of files){if(/^image\/(png|jpeg|webp)$/i.test(f.type||'')&&f.size<=10*1024*1024)add.push({file:f,role:defRole,filename:f.name||'图片'});}return{relinkNewFiles:[...(st.relinkNewFiles||[]),...add]};});e.target.value='';};
  removeRelinkNewFile=(idx)=>()=>this.setState(st=>({relinkNewFiles:(st.relinkNewFiles||[]).filter((_,i)=>i!==idx)}));
  setRelinkNewFileRole=(idx)=>(e)=>{const v=e&&e.target?e.target.value:'';this.setState(st=>({relinkNewFiles:(st.relinkNewFiles||[]).map((f,i)=>i===idx?{...f,role:v}:f)}));};
  toggleRelinkItem=(id)=>()=>this.setState(st=>{const a=st.relinkItemIds||[];return{relinkItemIds:a.includes(id)?a.filter(x=>x!==id):[...a,id]};});
  onRelinkNote=(e)=>{const v=e&&e.target?e.target.value:'';this.setState({relinkNote:v});};
  onRelinkSearch=(e)=>{const v=e&&e.target?e.target.value:'';this.setState({relinkSearch:v});};
  saveRelink=async()=>{
    const recordId=this.state.relinkRecordId;const rec=(this.state.shippingRecords||[]).find(r=>r.id===recordId);if(!rec)return;
    const nextIds=[...new Set(this.state.relinkItemIds||[])];
    const prevIds=rec.itemIds||[];
    const nextNote=String(this.state.relinkNote||'').trim();
    const nextGroup=String(this.state.relinkGroup||'').trim();
    const relinkImages=this.state.relinkImages||[];
    const imagesToRemove=relinkImages.filter(im=>im.toRemove);
    const roleChanges=relinkImages.filter(im=>!im.toRemove).filter(im=>{const orig=(rec.images||[]).find(x=>x.id===im.id);return orig&&orig.role!==im.role;});
    const newFiles=this.state.relinkNewFiles||[];
    if(rec.local){
      const meta=this.loadLocalShippingMeta();const m=meta.find(x=>x.id===recordId);
      if(m){
        m.itemIds=nextIds;m.note=nextNote;if(nextGroup)m.group=nextGroup;
        if(imagesToRemove.length){const removeIds=new Set(imagesToRemove.map(x=>x.id));m.imgs=(m.imgs||[]).filter(im=>!removeIds.has(im.id));for(const im of imagesToRemove){try{await this.idbPut(im.id,null);}catch(e){}}}
        for(const rc of roleChanges){const target=(m.imgs||[]).find(im=>im.id===rc.id);if(target)target.role=rc.role;}
        if(newFiles.length){const now=Date.now();m.imgs=m.imgs||[];for(let i=0;i<newFiles.length;i++){const f=newFiles[i];const id='shipimg_'+now+'_'+i+'_'+Math.random().toString(36).slice(2,6);await this.idbPut(id,f.file);m.imgs.push({id,role:f.role||'其他附件',filename:f.filename||(f.file&&f.file.name)||'图片'});}}
        this.persistLocalShippingMeta(meta);
      }
      this.closeRelink();await this.loadLocalShipping();return;
    }
    if(!this.sb){alert('云端未就绪，暂时无法修改。');return;}
    const code=this.shippingSyncCode();
    this.setState({cloudBusy:true});
    try{
      const toAdd=nextIds.filter(id=>!prevIds.includes(id));
      const toRemove=prevIds.filter(id=>!nextIds.includes(id));
      if(toAdd.length)await this.linkDocumentItems(recordId,toAdd,code);
      for(const item_id of toRemove){const{error}=await this.sb.from('shipping_document_items').delete().eq('document_id',recordId).eq('item_id',item_id);if(error)throw error;}
      if(nextNote!==String(rec.note||'').trim()){const{error:ne}=await this.sb.from('shipping_documents').update({note:nextNote}).eq('id',recordId);if(ne)throw ne;}
      if(nextGroup&&nextGroup!==String(rec.group||'').trim()){const ch=await this.ensureShippingChannel(code,nextGroup);const{error:ce}=await this.sb.from('shipping_documents').update({channel_id:ch.id}).eq('id',recordId);if(ce)throw ce;}
      if(imagesToRemove.length){
        const paths=imagesToRemove.map(im=>im.storagePath).filter(Boolean);
        if(paths.length){const{error:re}=await this.sb.storage.from(this.SUPA_SHIPPING_BUCKET).remove(paths);if(re)throw re;}
        const ids=imagesToRemove.map(im=>im.id).filter(Boolean);
        if(ids.length){const{error:de}=await this.sb.from('shipping_document_images').delete().in('id',ids);if(de)throw de;}
      }
      for(const rc of roleChanges){const{error:ue}=await this.sb.from('shipping_document_images').update({image_role:rc.role}).eq('id',rc.id);if(ue)throw ue;}
      if(newFiles.length)await this.uploadDocumentImages(code,recordId,nextGroup||rec.group,newFiles);
      this.setState({cloudBusy:false});this.closeRelink();await this.loadShippingFromCloud(code);
    }catch(e){this.setState({cloudBusy:false});alert('保存失败：'+((e&&e.message)||e));}
  };
  switchModalTab = (tab) => () => {
    if (tab === 'ship' && !this.state.editing) { this.saveItem({ thenShip: true }); return; }
    this.setState({ modalTab: tab, itemShipDraftOpen: false });
  };
  curEditItemId() { return this.state.editing || (this.state.draft && this.state.draft.id) || ''; }
  itemShipRecordsFor(itemId) { return (this.state.shippingRecords || []).filter(r => (r.itemIds || []).includes(itemId)); }
  openItemAddShip = () => { const id = this.curEditItemId(); const base = this.newShippingDraft(); this.setState({ shippingDraft: { ...base, itemIds: id ? [id] : [] }, itemShipDraftOpen: true, itemShipItemsPanelOpen: false, shipNotice: '' }); };
  closeItemAddShip = () => this.setState({ itemShipDraftOpen: false, shipNotice: '' });
  toggleItemShipItemsPanel = () => this.setState(s => ({ itemShipItemsPanelOpen: !s.itemShipItemsPanelOpen }));
  openLinkExistingShip = () => this.setState({ linkExistingShipOpen: true, linkExistingSearch: '', linkExistingChannel: '' });
  closeLinkExistingShip = () => this.setState({ linkExistingShipOpen: false, linkExistingSearch: '', linkExistingChannel: '' });
  onLinkExistingSearch = (e) => { const v = e && e.target ? e.target.value : ''; this.setState({ linkExistingSearch: v }); };
  setLinkExistingChannel = (g) => () => this.setState({ linkExistingChannel: g });
  linkRecordToCurrentItem = (recordId) => () => {
    const curId = this.curEditItemId();
    this.openRelinkRecord(recordId)();
    if (curId) this.setState(st => { const ids = st.relinkItemIds || []; return ids.includes(curId) ? {} : { relinkItemIds: [...ids, curId] }; });
    this.setState({ linkExistingShipOpen: false });
  };
  unlinkItemFromRecord = (recordId) => async () => {
    const curId = this.curEditItemId(); if (!curId) return;
    const rec = (this.state.shippingRecords || []).find(r => r.id === recordId); if (!rec) return;
    if (!window.confirm('把这条资料从当前谷子移除？（其他关联的谷子不受影响，资料本身不会被删除）')) return;
    const nextIds = (rec.itemIds || []).filter(x => x !== curId);
    if (rec.local) { const meta = this.loadLocalShippingMeta(); const m = meta.find(x => x.id === recordId); if (m) { m.itemIds = nextIds; this.persistLocalShippingMeta(meta); } await this.loadLocalShipping(); return; }
    if (!this.sb) { alert('云端未就绪，暂时无法修改关联。'); return; }
    try { const { error } = await this.sb.from('shipping_document_items').delete().eq('document_id', recordId).eq('item_id', curId); if (error) throw error; await this.loadShippingFromCloud(this.shippingSyncCode()); }
    catch (e) { alert('移除失败：' + ((e && e.message) || e)); }
  };
  openShipRoleManage = (type) => () => this.setState({ shipRoleManageOpen: true, shipRoleManageType: type });
  closeShipRoleManage = () => this.setState({ shipRoleManageOpen: false });
  saveShippingRolesCustom(map) { try { localStorage.setItem('zzz_shipping_roles', JSON.stringify(map)); } catch (e) {} this.setState({ shippingRolesCustom: map }); }
  shipRoleAdd = () => { const type = this.state.shipRoleManageType; const v = (window.prompt('新增角色分类') || '').trim(); if (!v) return; const l = this.shippingRoles(type); if (l.includes(v)) { alert('已存在'); return; } this.saveShippingRolesCustom({ ...(this.state.shippingRolesCustom || {}), [type]: [v, ...l] }); };
  shipRoleRename = (name) => () => { const type = this.state.shipRoleManageType; const nv = (window.prompt('把「' + name + '」改成：', name) || '').trim(); if (!nv || nv === name) return; const l = this.shippingRoles(type).map(x => x === name ? nv : x); this.saveShippingRolesCustom({ ...(this.state.shippingRolesCustom || {}), [type]: l }); };
  shipRoleDelete = (name) => () => { const type = this.state.shipRoleManageType; const l = this.shippingRoles(type); if (l.length <= 1) { alert('至少要保留一个角色分类。'); return; } if (!window.confirm('删除「' + name + '」？已经用这个分类标记的图片仍会保留原名称文字。')) return; this.saveShippingRolesCustom({ ...(this.state.shippingRolesCustom || {}), [type]: l.filter(x => x !== name) }); };
  shipRoleMove = (name, dir) => () => { const type = this.state.shipRoleManageType; const l = this.shippingRoles(type).slice(); const i = l.indexOf(name); const j = i + dir; if (i < 0 || j < 0 || j >= l.length) return; const t = l[i]; l[i] = l[j]; l[j] = t; this.saveShippingRolesCustom({ ...(this.state.shippingRolesCustom || {}), [type]: l }); };
  reuseLastShipItems=()=>this.setState(st=>{const rs=st.shippingRecords||[],group=String((st.shippingDraft||{}).group||'').trim(),last=[...rs].reverse().find(r=>!group||r.group===group);return{shippingDraft:{...(st.shippingDraft||this.newShippingDraft()),itemIds:last?[...(last.itemIds||[])]:[]}};});
  async loadShippingFromCloud(codeArg=''){
    const code=String(codeArg||this.shippingSyncCode()).trim().toUpperCase();if(!this.sb||!code){await this.loadLocalShipping();return[];}
    try{
      const{data:channels,error:ce}=await this.sb.from('shipping_channels').select('id,channel_name,cn').eq('sync_code',code);if(ce)throw ce;const cmap=Object.fromEntries((channels||[]).map(c=>[c.id,c]));
      const{data:docs,error:de}=await this.sb.from('shipping_documents').select('id,sync_code,channel_id,document_group,title,note,created_at,updated_at').eq('sync_code',code).order('created_at',{ascending:true});if(de)throw de;
      const ids=(docs||[]).map(d=>d.id);let links=[],images=[];
      if(ids.length){const a=await this.sb.from('shipping_document_items').select('document_id,item_id').in('document_id',ids);if(a.error)throw a.error;links=a.data||[];const b=await this.sb.from('shipping_document_images').select('id,document_id,image_role,storage_bucket,storage_path,public_url,original_filename,mime_type,file_size,sort_order,created_at').in('document_id',ids).order('sort_order',{ascending:true});if(b.error)throw b.error;images=b.data||[];}
      const records=(docs||[]).map(d=>{const ch=cmap[d.channel_id]||{};const imgs=images.filter(x=>x.document_id===d.id).map(x=>({id:x.id,role:x.image_role,image:x.public_url||'',storageBucket:x.storage_bucket,storagePath:x.storage_path,filename:x.original_filename,sortOrder:x.sort_order||0}));return{id:d.id,group:ch.channel_name||'',cn:ch.cn||'',type:d.document_group||'补充资料',typeLabel:this.shippingTypeLabel(d.document_group||'补充资料').module,title:d.title||'',note:d.note||'',images:imgs,image:(imgs[0]&&imgs[0].image)||'',itemIds:links.filter(x=>x.document_id===d.id).map(x=>x.item_id),createdAt:d.created_at?Date.parse(d.created_at):0,updatedAt:d.updated_at?Date.parse(d.updated_at):0};});
      this.setState({shippingRecords:records},()=>this.autoPairShipping());await this.loadShippingBatches(code);return records;
    }catch(e){console.error('loadShippingFromCloud failed',e);this.setState({cloudStatus:'资料读取失败：'+((e&&e.message)||e)});return[];}
  }
  autoPairShipping=()=>{const rs=this.state.shippingRecords||[];if(!rs.length)return;const key=this.state.shippingPreviewPackageKey||this.shippingPackageKey(rs[0]);this.setState({shippingPreviewPackageKey:key,shippingPreviewGroup:key.split('||')[0]||'',shippingPreviewBatch:'按所选谷子动态汇总'});};
  async loadShippingBatches(codeArg){const code=String(codeArg||this.shippingSyncCode()).trim().toUpperCase();if(!this.sb||!code){this.setState({shippingBatches:[]});return[];}try{const{data,error}=await this.sb.from('shipping_batches').select('id,sync_code,channel_id,batch_name,cn,note,item_count,document_count,export_filename,item_ids,document_ids,exported_at,created_at,updated_at').eq('sync_code',code).order('exported_at',{ascending:false}).limit(50);if(error)throw error;const channelIds=[...new Set((data||[]).map(x=>x.channel_id).filter(Boolean))];let cmap={};if(channelIds.length){const r=await this.sb.from('shipping_channels').select('id,channel_name').in('id',channelIds);if(r.error)throw r.error;cmap=Object.fromEntries((r.data||[]).map(x=>[x.id,x.channel_name]));}const rows=(data||[]).map(x=>({...x,group:cmap[x.channel_id]||'未分类渠道',dateText:x.exported_at?new Date(x.exported_at).toLocaleString('zh-CN',{hour12:false}):''}));this.setState({shippingBatches:rows});return rows;}catch(e){console.warn('读取排发历史失败',e);this.setState({shippingBatches:[]});return[];}}
  async createShippingBatch(records,items,group,filename){const code=this.shippingSyncCode();if(!this.sb||!code)return null;const channel=await this.ensureShippingChannel(code,group||'未分类渠道');const itemIds=[...new Set((items||[]).map(x=>x.id).filter(Boolean))],documentIds=[...new Set((records||[]).map(x=>x.id).filter(Boolean))];const now=new Date().toISOString(),batchName=`${group||'未分类渠道'} · ${new Date().toLocaleDateString('zh-CN')}`;const payload={sync_code:code,client_uuid:this.clientUuid(),channel_id:channel.id,batch_name:batchName,cn:(this.state.collectorName||'').trim()||null,note:null,item_count:itemIds.length,document_count:documentIds.length,export_filename:filename,item_ids:itemIds,document_ids:documentIds,exported_at:now};const{data,error}=await this.sb.from('shipping_batches').insert([payload]).select('id');if(error)throw error;const batch=Array.isArray(data)?data[0]:null;if(!batch)throw new Error('排发历史已提交但无法读取，请检查 shipping_batches 表权限');const rows=(items||[]).map(it=>({batch_id:batch.id,item_id:it.id,sync_code:code,item_snapshot:{name:it.name||'',character:it.character||'',type:it.type||'',qty:it.qty||1,status:it.status||''}}));if(rows.length){const r=await this.sb.from('shipping_batch_items').insert(rows);if(r.error)throw r.error;}await this.loadShippingBatches(code);return batch.id;}
  deleteShippingBatch=(id)=>async()=>{if(!confirm('删除这条排发历史？只会删除历史记录，不会删除谷子或资料。'))return;if(!this.sb)return;const{error}=await this.sb.from('shipping_batches').delete().eq('id',id);if(error){alert('删除失败：'+error.message);return;}await this.loadShippingBatches();};
  saveShipping=async()=>{const d=this.state.shippingDraft||this.newShippingDraft(),code=this.shippingSyncCode();if(!d.group.trim()){this.setState({shipNotice:'请先填写团／渠道。'});return;}if(!(d.files||[]).length){this.setState({shipNotice:'请至少选择一张资料图片。'});return;}
    if(!code){this.setState({cloudBusy:true,shipNotice:''});try{const now=Date.now();const imgs=[];for(let i=0;i<d.files.length;i++){const f=d.files[i];const id='shipimg_'+now+'_'+i+'_'+Math.random().toString(36).slice(2,6);await this.idbPut(id,f.file||f);imgs.push({id,role:f.role||d.role||'其他附件',filename:f.filename||(f.file&&f.file.name)||'图片'});}
      const rec={id:'shiploc_'+now+'_'+Math.random().toString(36).slice(2,6),group:d.group.trim(),cn:(this.state.collectorName||'').trim(),type:d.type,title:d.type,note:(d.note||'').trim(),itemIds:[...new Set(d.itemIds||[])],createdAt:now,imgs};
      const meta=this.loadLocalShippingMeta();meta.push(rec);this.persistLocalShippingMeta(meta);
      const next={...this.newShippingDraft(),group:d.group.trim(),itemIds:[...(d.itemIds||[])],type:d.type,role:this.shippingRoles(d.type)[0]};
      await this.loadLocalShipping();
      this.setState({shippingDraft:next,shippingPreviewPackageKey:d.group.trim()+'||排发中心',shippingPreviewGroup:d.group.trim(),cloudBusy:false,shipNotice:((d.itemIds||[]).length?'资料已保存到本机，并完成谷子关联。':'资料已保存到本机，还没有关联谷子，之后可以在「已有资料」里点"改关联"补上。')+'（账号云端恢复后可跨设备同步）'});
    }catch(e){this.setState({cloudBusy:false,shipNotice:'资料保存失败：'+((e&&e.message)||e)});}return;}
    this.setState({cloudBusy:true,shipNotice:''});try{const documentId=await this.createShippingDocument(code,{...d,title:d.type});await this.uploadDocumentImages(code,documentId,d.group,d.files);await this.linkDocumentItems(documentId,d.itemIds,code);const next={...this.newShippingDraft(),group:d.group.trim(),itemIds:[...(d.itemIds||[])],type:d.type,role:this.shippingRoles(d.type)[0]};await this.loadShippingFromCloud(code);this.setState({shippingDraft:next,shippingPreviewPackageKey:d.group.trim()+'||排发中心',shippingPreviewGroup:d.group.trim(),cloudBusy:false,shipNotice:(d.itemIds||[]).length?'排发资料已上传，并完成谷子关联。':'排发资料已上传，还没有关联谷子，之后可以在「已有资料」里点"改关联"补上。'});}catch(e){this.setState({cloudBusy:false,shipNotice:'资料上传失败：'+((e&&e.message)||e)});}};
  deleteShipping=(id)=>async()=>{if(!confirm('删除这份业务资料？其中全部图片及谷子关联都会一起删除。'))return;const rec=(this.state.shippingRecords||[]).find(x=>x.id===id);if(!rec)return;if(rec.local){const meta=this.loadLocalShippingMeta().filter(m=>m.id!==id);this.persistLocalShippingMeta(meta);for(const im of (rec.images||[])){try{await this.idbPut(im.localId||im.id,null);}catch(e){}}await this.loadLocalShipping();return;}if(!this.sb)return;try{const paths=(rec.images||[]).map(x=>x.storagePath).filter(Boolean);if(paths.length){const{error}=await this.sb.storage.from(this.SUPA_SHIPPING_BUCKET).remove(paths);if(error)throw error;}const{error:de}=await this.sb.from('shipping_documents').delete().eq('id',id);if(de)throw de;await this.loadShippingFromCloud();}catch(e){alert('删除失败：'+((e&&e.message)||e));}};
  viewShippingPackage=(key)=>()=>this.setState({shippingPreviewPackageKey:key,shippingPreviewGroup:String(key||'').split('||')[0]||'',shippingPreviewBatch:'按所选谷子动态汇总'});
  selectedShippingItemIds(){const ex=this.state.exportIds||[];if(ex.length)return[...new Set(ex)];const d=this.state.shippingDraft||this.newShippingDraft();return[...new Set(d.itemIds||[])];}
  selectedShippingRecords(){const selected=this.selectedShippingItemIds();return(this.state.shippingRecords||[]).filter(r=>(r.itemIds||[]).some(id=>selected.includes(id)));}
  loadShipImage(src){return new Promise((resolve,reject)=>{const img=new Image();img.crossOrigin='anonymous';img.onload=()=>resolve(img);img.onerror=reject;img.src=src;});}
  async shipSourceBlob(src,type='image/png'){const img=await this.loadShipImage(src);const c=document.createElement('canvas');c.width=Math.max(1,img.naturalWidth||img.width);c.height=Math.max(1,img.naturalHeight||img.height);const x=c.getContext('2d');x.drawImage(img,0,0,c.width,c.height);const blob=await new Promise(resolve=>c.toBlob(resolve,type));if(!blob)throw new Error('图片转换失败');return blob;}
  isPhoneDevice(){try{return !!(window.matchMedia&&window.matchMedia('(max-width:640px)').matches);}catch(e){return false;}}
  stampCnWatermark(ctx,x,y,w,h,cn){const t=String(cn||'').trim();if(!t)return;const text='CN：'+t;const fs=Math.max(20,Math.round(Math.min(w,h)*0.062));ctx.save();ctx.font='800 '+fs+'px sans-serif';ctx.textAlign='right';ctx.textBaseline='top';const pad=Math.round(fs*0.7);const tw=ctx.measureText(text).width;const px=x+w-pad, py=y+pad;
    // 半透明圆角底 + 亮色描边，右上角明显但不挡图
    const bx=px-tw-fs*0.6, by=py-fs*0.28, bw=tw+fs*1.2, bh=fs*1.55, r=fs*0.5;
    ctx.beginPath();ctx.moveTo(bx+r,by);ctx.arcTo(bx+bw,by,bx+bw,by+bh,r);ctx.arcTo(bx+bw,by+bh,bx,by+bh,r);ctx.arcTo(bx,by+bh,bx,by,r);ctx.arcTo(bx,by,bx+bw,by,r);ctx.closePath();
    ctx.fillStyle=this.accentColor();ctx.shadowColor='rgba(40,29,73,0.28)';ctx.shadowBlur=fs*0.5;ctx.shadowOffsetY=fs*0.15;ctx.fill();ctx.shadowColor='transparent';
    ctx.fillStyle='#fff';ctx.fillText(text,px,py);ctx.restore();}
  async watermarkedImageBlob(img,cn,type){const w=Math.max(1,img.naturalWidth||img.width),h=Math.max(1,img.naturalHeight||img.height);const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');x.drawImage(img,0,0,w,h);this.stampCnWatermark(x,0,0,w,h,cn);const out=await this.canvasToBlob(c,type||'image/png',0.92);return out||await this.canvasToBlob(c,'image/png');}
  safeDownloadName(v){return String(v||'图片').replace(/[\/:*?"<>|]/g,'_');}
  async shareOrDownloadFiles(files){
    if(this.isPhoneDevice()&&navigator.share&&navigator.canShare&&navigator.canShare({files})){try{await navigator.share({files});return true;}catch(e){if(e&&e.name==='AbortError')return false;}}
    files.forEach(f=>this.downloadBlob(f,f.name||'图片'));return true;
  }
  downloadShippingRecord=(recordId)=>async()=>{const rec=(this.state.shippingRecords||[]).find(r=>r.id===recordId);if(!rec)return;const cn=(this.state.shipWatermark!==false)?(this.state.collectorName||rec.cn||'').trim():'';try{const rows=[];for(let i=0;i<(rec.images||[]).length;i++){const im=rec.images[i];if(!im.image)continue;const requestedType=/\.webp$/i.test(im.filename||'')?'image/webp':/\.jpe?g$/i.test(im.filename||'')?'image/jpeg':'image/png';const srcImg=await this.loadShipImage(im.image);const blob=await this.watermarkedImageBlob(srcImg,cn,requestedType);const ext=blob.type.includes('png')?'png':blob.type.includes('webp')?'webp':'jpg';const base=this.safeDownloadName(im.filename||((rec.typeLabel||rec.type||'排发资料')+'_'+(i+1)));rows.push(new File([blob],base.replace(/\.[^.]+$/,'')+'.'+ext,{type:blob.type||requestedType}));}if(!rows.length){alert('这份资料暂时没有可下载的图片。');return;}await this.shareOrDownloadFiles(rows);}catch(e){alert((this.isPhoneDevice()?'分享':'下载')+'失败：'+((e&&e.message)||e));}};
  exportSelectedShipping=async()=>{const selected=this.selectedShippingItemIds();if(!selected.length){alert('请先在左侧勾选本次排发的谷子。');return;}const records=this.selectedShippingRecords();if(!records.length){alert('所选谷子还没有关联资料。');return;}try{const group=String((this.state.shippingDraft||{}).group||records[0].group||'未分类渠道');const items=selected.map(id=>(this.state.items||[]).find(it=>it.id===id)).filter(Boolean);const cn=(this.state.collectorName||records[0].cn||'未填写').trim();const order=this.SHIPPING_TYPES;const sorted=[...records].sort((a,b)=>order.indexOf(a.type)-order.indexOf(b.type)||(a.createdAt||0)-(b.createdAt||0));const flat=[];for(const r of sorted)for(const im of (r.images||[]))if(im.image)flat.push({r,im,img:await this.loadShipImage(im.image)});const W=1200,pad=55,inner=W-pad*2,itemLines=items.map((it,i)=>`${i+1}. ${it.name||'未命名'}${it.qty?' ×'+it.qty:''}`);let H=230+Math.max(1,itemLines.length)*34+40;flat.forEach(({img})=>{const scale=Math.min(inner/img.width,1300/img.height,1);H+=82+Math.round(img.height*scale)+30;});H+=60;if(H>30000){alert('生成图片过长，请分两次导出。');return;}const c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,W,H);x.textAlign='center';x.fillStyle='#251d49';x.font='900 40px sans-serif';x.fillText('排发资料',W/2,62);x.font='800 30px sans-serif';x.fillText('CN：'+cn,W/2,108);x.font='22px sans-serif';x.fillStyle='#6f6996';x.fillText('渠道：'+group,W/2,145);x.fillStyle='#ff3355';x.fillRect(pad,170,inner,5);let y=208;x.textAlign='left';x.fillStyle='#251d49';x.font='800 23px sans-serif';x.fillText(`本次排发谷子（${items.length}）`,pad,y);y+=38;x.font='20px sans-serif';x.fillStyle='#544f7e';for(const line of itemLines){x.fillText(line,pad+10,y);y+=34;}y+=18;for(const {r,im,img} of flat){x.fillStyle='#f4f1fa';x.fillRect(pad,y,inner,54);x.fillStyle='#251d49';x.font='800 22px sans-serif';x.fillText(`${r.typeLabel||this.shippingTypeLabel(r.type).module} · ${this.shippingRoleLabel(im.role)}${r.note?' · '+r.note:''}`,pad+16,y+35);y+=68;const scale=Math.min(inner/img.width,1300/img.height,1),dw=Math.round(img.width*scale),dh=Math.round(img.height*scale),dx=pad+(inner-dw)/2;x.fillStyle='#faf9fc';x.fillRect(pad,y,inner,dh);x.drawImage(img,dx,y,dw,dh);this.stampCnWatermark(x,dx,y,dw,dh,(this.state.shipWatermark!==false)?cn:'');y+=dh+30;}x.textAlign='center';x.fillStyle='#938db0';x.font='17px sans-serif';x.fillText('由谷子收纳 · 排发中心生成',W/2,H-25);const filename=this.safeDownloadName(`排发资料_${cn}_${group}_${items.length}件.png`);const blob=await new Promise(resolve=>c.toBlob(resolve,'image/png'));if(!blob)throw new Error('图片生成失败');await this.shareOrDownloadFiles([new File([blob],filename,{type:'image/png'})]);try{await this.createShippingBatch(sorted,items,group,filename);}catch(historyError){console.warn('排发长图已导出，但历史记录保存失败',historyError);this.setState({cloudStatus:'长图已导出；排发历史未保存：'+((historyError&&historyError.message)||historyError)});}}catch(e){alert((this.isPhoneDevice()?'分享':'导出')+'失败：'+((e&&e.message)||e));}};
  exportShippingPackage = () => this.exportSelectedShipping();
  toggleShipWatermark = () => { const v = this.state.shipWatermark === false; try { localStorage.setItem('zzz_ship_watermark', v ? '1' : '0'); } catch(e){} this.setState({ shipWatermark: v }); };
  openDataManage = () => this.setState({ dataManageOpen: true, mobileMineOpen: false });
  openWorkManage = () => this.setState({ workManageOpen: true });
  closeWorkManage = () => this.setState({ workManageOpen: false });
  closeDataManage = () => this.setState({ dataManageOpen: false });
  confirmExcelExport = () => { if (confirm('确认导出 Excel 文件？')) this.doExcelExport(); };
  confirmExcelTemplate = () => { if (confirm('确认下载 Excel 导入模板？')) this.doExcelTemplate(); };
  confirmJsonExport = () => { if (confirm('确认导出完整 JSON 备份？')) this.doExport(); };
  confirmExcelImport = () => { if (confirm('确认选择 Excel 文件导入？导入前请确认文件来源可靠。')) this.triggerExcelImport(); };
  confirmJsonImport = () => { if (confirm('确认选择 JSON 备份导入？导入后会替换当前资料，请先做好备份。')) this.triggerImport(); };
  openSettings = () => this.setState({ settingsOpen: true, settingsDraft: this.makeSettingsDraft(), mobileMineOpen: false });
  cancelSettings = () => this.setState({ settingsOpen: false, settingsDraft: null });
  closeSettings = this.cancelSettings;
  updateSettingsDraft = (patch) => this.setState(s => ({ settingsDraft: { ...(s.settingsDraft || this.makeSettingsDraft()), ...patch } }));
  onDraftSettingField = (key) => (e) => this.updateSettingsDraft({ [key]: e.target.value });
  saveSettings = () => {
    const d = this.state.settingsDraft || this.makeSettingsDraft();
    try {
      localStorage.setItem('zzz_cn', d.collectorName || '');
      localStorage.setItem('zzz_currency', d.currency || '');
      localStorage.setItem('zzz_accent', d.accent || '');
      localStorage.setItem('zzz_name_style', d.nameStyleMode || 'default');
      localStorage.setItem('zzz_display_mode', d.displayMode || 'standard');
      localStorage.setItem('zzz_dashboard_cards', JSON.stringify(this.normalizeDashboardCards(d.dashboardCards))); 
      localStorage.setItem('zzz_title', d.title || '');
      localStorage.setItem('zzz_subtitle', d.subtitle || '');
      localStorage.setItem('zzz_footer', d.footer || '');
      localStorage.setItem('zzz_works', JSON.stringify(d.works || []));
      localStorage.setItem('zzz_field_labels', JSON.stringify(d.fieldLabels || {}));
      localStorage.setItem('zzz_filter_on', JSON.stringify(d.filterOn || {}));
      localStorage.setItem('zzz_stats_on', JSON.stringify(d.statsOn || {}));
      localStorage.setItem('zzz_custom_fields', JSON.stringify(d.customFields || []));
    } catch (e) {}
    let works = Array.isArray(d.works) ? d.works.map(w => ({ id: w.id || ('w_' + Date.now().toString(36)), group: (w.group || this.DEFAULT_GROUP).trim ? (w.group || this.DEFAULT_GROUP).trim() : (w.group || this.DEFAULT_GROUP), name: (w.name || '未命名作品').trim ? (w.name || '未命名作品').trim() : (w.name || '未命名作品') })) : [];
    works = works.filter(w => w.id && w.name);
    if (!works.length) works = [{ id: this.MAIN_WORK, group: this.DEFAULT_GROUP, name: '默认作品' }];
    let currentWorkId = d.currentWorkId || this.state.currentWorkId;
    if (!works.some(w => w.id === currentWorkId)) currentWorkId = works[0].id;
    try { localStorage.setItem('zzz_current_work', currentWorkId); localStorage.setItem('zzz_works', JSON.stringify(works)); } catch (e) {}
    const validWorkIds = new Set(works.map(w => w.id));
    const safeItems = (this.state.items || []).filter(it => validWorkIds.has(it.workId || this.MAIN_WORK));
    const workLists = this.loadWorkLists(currentWorkId, safeItems);
    this.setState(this.resetScopedFilters({
      settingsOpen: false,
      settingsDraft: null,
      items: safeItems,
      collectorName: d.collectorName || '',
      currency: d.currency || '',
      accent: d.accent || '', nameStyleMode: d.nameStyleMode || 'default', displayMode: (d.displayMode === 'simple' ? 'standard' : (d.displayMode || 'standard')), dashboardCards: this.normalizeDashboardCards(d.dashboardCards),
      title: d.title || '',
      subtitle: d.subtitle || '',
      footer: d.footer || '',
      works,
      currentWorkId,
      fieldLabels: d.fieldLabels || {},
      filterOn: d.filterOn || {},
      statsOn: d.statsOn || {},
      customFields: d.customFields || [],
      ...workLists
    }), () => { this.applyThemeVars(); this.applyBg(); if (this.state.cloudSyncId) this.markCloudPending(); });
  };
  onSettingField = (key, lsKey) => (e) => { const v = e.target.value; try { localStorage.setItem(lsKey, v); } catch (er) {} this.setState({ [key]: v }, () => { if (key === 'accent') { this.applyThemeVars(); this.applyBg(); } }); };
  async loadLogo() { try { const b = await this.idbGet('zzz_logo'); if (b) { this.logoUrl = URL.createObjectURL(b); this.forceUpdate(); } } catch (e) {} }
  async loadWorkLogos() { this.workLogoUrls = this.workLogoUrls || {}; let ch = false; for (const w of (this.state.works || [])) { try { const b = await this.idbGet('zzz_worklogo_' + w.id); if (b) { this.workLogoUrls[w.id] = URL.createObjectURL(b); ch = true; } } catch (e) {} } if (ch) this.forceUpdate(); }
  applyBg() {
    if (!this.rootEl) return;
    if (this.bgUrl) {
      this.rootEl.style.background = `linear-gradient(180deg,rgba(255,255,255,.78),rgba(255,255,255,.9)), url(${this.bgUrl}) center/cover fixed`;
    } else {
      this.rootEl.style.background = `radial-gradient(circle at 14% -10%,${this.accentLight(0.84)} 0%,rgba(255,255,255,0) 42%), radial-gradient(circle at 96% 2%,${this.accentLight(0.9)} 0%,rgba(255,255,255,0) 38%), linear-gradient(180deg,${this.accentLight(0.96)} 0%,#f9fbff 50%,#fff 100%)`;
    }
  }
  async loadBg() { try { const b = await this.idbGet('zzz_bg'); if (b) { this.bgUrl = URL.createObjectURL(b); this.applyBg(); this.forceUpdate(); } } catch (e) {} }
  uploadWorkLogo = (workId) => { const inp = document.createElement('input'); inp.type = 'file'; inp.accept = 'image/*'; inp.onchange = async () => { const f = inp.files && inp.files[0]; if (!f) return; try { await this.idbPut('zzz_worklogo_' + workId, f); this.workLogoUrls = this.workLogoUrls || {}; this.workLogoUrls[workId] = URL.createObjectURL(f); this.forceUpdate(); } catch (e) { alert('Logo 保存失败：' + e); } }; inp.click(); };
  uploadBg = () => { const inp = document.createElement('input'); inp.type = 'file'; inp.accept = 'image/*'; inp.onchange = async () => { const f = inp.files && inp.files[0]; if (!f) return; try { await this.idbPut('zzz_bg', f); this.bgUrl = URL.createObjectURL(f); this.applyBg(); this.forceUpdate(); } catch (e) { alert('背景保存失败：' + e); } }; inp.click(); };
  clearBg = () => { this.bgUrl = null; try { this.idbPut('zzz_bg', null); } catch (e) {} this.applyBg(); this.forceUpdate(); };
  workLogo(id) { return (this.workLogoUrls && this.workLogoUrls[id]) || ''; }
  flabel(key) { return (this.state.fieldLabels && this.state.fieldLabels[key]) || this.FIELD_DEFAULTS[key] || key; }
  isFieldVisible(key) { return !(this.state.deletedFields || []).includes(key); }
  deleteBaseField = (key) => () => {
    const name = this.flabel(key);
    if (this.state.settingsDraft) {
      if (!window.confirm('删除字段「' + name + '」？对应编辑项、顶部筛选和分组会一起隐藏。')) return;
      const d = this.state.settingsDraft;
      const deletedFields = [...new Set([...(this.state.deletedFields || []), key])];
      const filterOn = { ...(d.filterOn || {}) }; const statsOn = { ...(d.statsOn || {}) };
      delete filterOn[key]; delete statsOn[key];
      this.setState({ deletedFields, settingsDraft: { ...d, filterOn, statsOn } });
      try { localStorage.setItem('zzz_deleted_fields', JSON.stringify(deletedFields)); } catch (e) {}
      return;
    }
    if (!window.confirm('确定删除字段「' + name + '」吗？删除后编辑页、顶部筛选、分组都会一起隐藏。')) return;
    const deletedFields = [...new Set([...(this.state.deletedFields || []), key])];
    const filterOn = { ...(this.state.filterOn || {}) };
    const statsOn = { ...(this.state.statsOn || {}) };
    filterOn[key] = false;
    statsOn[key] = false;
    const patch = { deletedFields, filterOn, statsOn };
    if (key === 'character') patch.charSel = [];
    else if (key === 'type') patch.typeSel = [];
    else if (key === 'series') patch.seriesFilter = '全部';
    else if (key === 'form') patch.formSel = [];
    else if (key === 'status') patch.statusSel = [];
    else if (key === 'acquire') patch.acquireSel = [];
    else if (key === 'channel') patch.channelSel = [];
    else if (key === 'purchaseChannel') patch.purchaseChannelSel = [];
    if (this.state.groupBy === key) patch.groupBy = 'none';
    try { localStorage.setItem('zzz_deleted_fields', JSON.stringify(deletedFields)); localStorage.setItem('zzz_filter_on', JSON.stringify(filterOn)); localStorage.setItem('zzz_stats_on', JSON.stringify(statsOn)); } catch (e) {}
    this.setState(patch);
  };
  restoreBaseFields = () => {
    if (!window.confirm('确定恢复所有默认字段吗？')) return;
    const deletedFields = [];
    try { localStorage.setItem('zzz_deleted_fields', JSON.stringify(deletedFields)); } catch (e) {}
    this.setState({ deletedFields });
  };
  setFieldLabel = (key) => (e) => { const v = e.target.value; const fieldLabels = { ...this.state.fieldLabels, [key]: v }; try { localStorage.setItem('zzz_field_labels', JSON.stringify(fieldLabels)); } catch (er) {} this.setState({ fieldLabels }); };
  toggleFilterOn = (key) => () => {
    const nextVal = !this.state.filterOn[key];
    const filterOn = { ...this.state.filterOn, [key]: nextVal };
    const patch = { filterOn };
    // 关闭某个顶部筛选时，同步清空这个筛选，避免看不见的筛选还在生效
    if (!nextVal) {
      if (key === 'character') patch.charSel = [];
      else if (key === 'type') patch.typeSel = [];
      else if (key === 'series') patch.seriesFilter = '全部';
      else if (key === 'form') patch.formSel = [];
      else if (key === 'status') patch.statusSel = [];
      else if (key === 'acquire') patch.acquireSel = [];
      else if (key === 'method') patch.methodSel = [];
      else if (key === 'set') patch.setSel = [];
      else if (key === 'channel') patch.channelSel = [];
      else if (key === 'purchaseChannel') patch.purchaseChannelSel = [];
      else if (key === 'tags') patch.tagSel = [];
      else if (key === 'rarity') patch.raritySel = [];
      else patch.customFilterSel = { ...(this.state.customFilterSel || {}), [key]: [] };
    }
    try { localStorage.setItem('zzz_filter_on', JSON.stringify(filterOn)); } catch (e) {}
    this.setState(patch);
  };
  toggleStatsOn = (key) => () => {
    const cur = this.state.statsOn || {};
    const statsOn = { ...cur, [key]: cur[key] === false };
    try { localStorage.setItem('zzz_stats_on', JSON.stringify(statsOn)); } catch (e) {}
    this.setState({ statsOn });
  };
  toggleBatchOn = (key) => () => {
    const cur = this.state.batchOn || {};
    const batchOn = { ...cur, [key]: cur[key] === false };
    try { localStorage.setItem('zzz_batch_on', JSON.stringify(batchOn)); } catch (e) {}
    this.setState({ batchOn });
  };
  setOptionsText = (which, lsKey) => (e) => { const raw = e.target.value; const arr = [...new Set(raw.split(/\n+/).map(x => x.trim()).filter(Boolean))]; try { localStorage.setItem(this.wkey(lsKey), JSON.stringify(arr)); } catch (er) {} this.setState(s => ({ [which]: arr, optBuf: { ...s.optBuf, [which]: raw } })); if (which === 'charOrder') this.charOrder = arr; };
  addSeriesAlone = (group) => {
    const name = (window.prompt('新增作品名称（' + group + '）：') || '').trim(); if (!name) return;
    const id = 'w_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
    if (this.state.settingsDraft) {
      const works = [ ...(this.state.settingsDraft.works || []), { id, group: group || this.DEFAULT_GROUP, name } ];
      this.updateSettingsDraft({ works, currentWorkId: id });
    } else { this.saveWorks([...this.state.works, { id, group, name }]); }
  };
  addGroupAlone = () => {
    const group = (window.prompt('新增系列IP名称：') || '').trim(); if (!group) return;
    const name = (window.prompt('该系列下第一个作品名称：') || '').trim() || (group + ' 作品1');
    const id = 'w_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
    if (this.state.settingsDraft) {
      const works = [ ...(this.state.settingsDraft.works || []), { id, group, name } ];
      this.updateSettingsDraft({ works, currentWorkId: id });
    } else { this.saveWorks([...this.state.works, { id, group, name }]); this.switchWork(id); }
  };
  uploadLogo = () => { const inp = document.createElement('input'); inp.type = 'file'; inp.accept = 'image/*'; inp.onchange = async () => { const f = inp.files && inp.files[0]; if (!f) return; try { await this.idbPut('zzz_logo', f); this.logoUrl = URL.createObjectURL(f); this.forceUpdate(); } catch (e) { alert('Logo 保存失败：' + e); } }; inp.click(); };
  onTitleBlur = (e) => { const v = (e.target.textContent || '').trim() || '谷子收纳'; try { localStorage.setItem('zzz_title', v); } catch (er) {} this.setState({ title: v }); };
  onSubtitleBlur = (e) => { const v = (e.target.textContent || '').trim(); try { localStorage.setItem('zzz_subtitle', v); } catch (er) {} this.setState({ subtitle: v }); };
  onFooterBlur = (e) => { const v = (e.target.textContent || '').trim(); try { localStorage.setItem('zzz_footer', v); } catch (er) {} this.setState({ footer: v }); };
  onCnFocus = (e) => { if (((e.target.textContent || '').trim()) === 'CN / 昵称') e.target.textContent = ''; };
  onCnBlur = (e) => { const raw = (e.target.textContent || '').trim(); const v = raw === 'CN / 昵称' ? '' : raw; try { localStorage.setItem('zzz_cn', v); } catch (er) {} this.setState({ collectorName: v }); };
  componentDidUpdate(prevProps, prevState) {
    const hasPrevState = !!(prevState && Object.prototype.hasOwnProperty.call(prevState, 'batchMode'));
    prevProps = prevProps || {};
    prevState = prevState || {};
    if (prevState.accent !== this.state.accent || prevProps.accent !== this.props.accent) {
      this.applyThemeVars();
      this.applyBg();
    }
    if (hasPrevState && this.state.batchMode && (this.state.selectedIds || []).length) {
      const filterKeys = ['search','charSel','typeSel','seriesFilter','formSel','statusSel','acquireSel','channelSel','purchaseChannelSel','customFilterSel','group','groupBy','currentWorkId'];
      const changed = filterKeys.some(k => JSON.stringify(prevState[k]) !== JSON.stringify(this.state[k]));
      if (changed) this.setState({ selectedIds: [] });
    }
  }

  async loadImages(items) {
    let changed = false;
    const cloudMap = this.loadCloudImageMap();
    for (const it of items) {
      for (const id of [it.imageId, it.imageId2, it.imageId3, it.imageId4, it.swapImageId]) {
        if (id && !this.imgUrls[id]) {
          try { const b = await this.idbGet(id); if (b) { this.imgUrls[id] = URL.createObjectURL(b); changed = true; } else if (cloudMap[id] && cloudMap[id].url) { this.imgUrls[id] = cloudMap[id].url; changed = true; } } catch (e) { if (cloudMap[id] && cloudMap[id].url) { this.imgUrls[id] = cloudMap[id].url; changed = true; } }
        }
      }
    }
    if (changed) this.forceUpdate();
  }

  samples() {
    const t = Date.now();
    return [];
  }

  // ---- IndexedDB ----
  idbOpen() { return new Promise((res, rej) => { const r = indexedDB.open('zzz_goods_db', 1); r.onupgradeneeded = () => r.result.createObjectStore('images'); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); }); }
  async idbPut(k, v) { const db = await this.idbOpen(); return new Promise((res, rej) => { const tx = db.transaction('images', 'readwrite'); tx.objectStore('images').put(v, k); tx.oncomplete = () => res(); tx.onerror = () => rej(tx.error); }); }
  async idbGet(k) { const db = await this.idbOpen(); return new Promise((res, rej) => { const tx = db.transaction('images', 'readonly'); const rq = tx.objectStore('images').get(k); rq.onsuccess = () => res(rq.result); rq.onerror = () => rej(rq.error); }); }
  async idbClear() { const db = await this.idbOpen(); return new Promise((res, rej) => { const tx = db.transaction('images', 'readwrite'); tx.objectStore('images').clear(); tx.oncomplete = () => { try { db.close(); } catch (e) {} res(); }; tx.onerror = () => { try { db.close(); } catch (e) {} rej(tx.error); }; }); }
  blobToDataURL(b) { return new Promise(r => { const fr = new FileReader(); fr.onload = () => r(fr.result); fr.readAsDataURL(b); }); }
  dataURLToBlob(d) { const [m, b64] = d.split(','); const mime = (m.match(/:(.*?);/) || [])[1] || 'image/png'; const bin = atob(b64); const arr = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i); return new Blob([arr], { type: mime }); }

  // ---- persistence ----
  commit(items) { try { localStorage.setItem('zzz_goods_v1', JSON.stringify(items)); } catch (e) {} const hasCode = !!(this.state.cloudSyncCode || localStorage.getItem('zzz_cloud_code')); this.setState({ items, savedAt: Date.now(), cloudPending: hasCode, cloudStatus: hasCode ? '本机有未上传的修改。停手 5 分钟会自动上传，也可以随时手动上传。' : this.state.cloudStatus }); this.scheduleAutoCloudPush(); }
  // 停手 5 分钟自动上传：每次改动都重置计时，连续 5 分钟没有新改动才真正上传（需已连接同步代码）
  scheduleAutoCloudPush() {
    const hasCode = !!(this.state.cloudSyncCode || localStorage.getItem('zzz_cloud_code'));
    if (!hasCode) return;
    if (this._autoCloudTimer) clearTimeout(this._autoCloudTimer);
    this._autoCloudTimer = setTimeout(() => {
      this._autoCloudTimer = null;
      // 只有确实还有未上传的修改、且此刻没有别的同步操作在进行时才自动上传
      if (this.state.cloudPending && !this.state.cloudBusy) {
        try { this.pushCloud(true); } catch (e) {}
      }
    }, 5 * 60 * 1000);
  }

  // ---- helpers ----
  num(v) { const n = parseFloat(v); return isNaN(n) ? 0 : n; }
  // 金额输入支持算式：280+20、500-30、398*2、1000/4、(300+20)*2
  // 自动清理 ¥ ￥ , 空格 RMB 元；结果四舍五入到指定小数位（默认 2 位，汇率用 4 位），整数不带多余小数
  // 返回 '' = 清空；返回 null = 公式错误（保留原输入、不写回）
  calcMoneyInput(raw, decimals = 2) {
    if (raw == null) return '';
    let s = String(raw).trim();
    if (!s) return '';
    s = s.replace(/[¥￥,，\s]/g, '').replace(/RMB/gi, '').replace(/元/g, '');
    if (!s) return '';
    if (!/^[0-9+\-*/().]+$/.test(s)) return null;
    if (/[+\-*/.]{2,}|\(\)/.test(s)) return null;
    let result;
    try { result = Function('"use strict";return (' + s + ')')(); } catch (err) { return null; }
    if (typeof result !== 'number' || !isFinite(result)) return null;
    const mul = Math.pow(10, decimals);
    return String(Math.round(result * mul) / mul);
  }
  onMoneyBlur = (e) => {
    const { name, value } = e.target;
    if (value == null || String(value).trim() === '') return;
    const result = this.calcMoneyInput(value, name === 'rate' ? 4 : 2);
    if (result === null) { alert('公式错误'); return; }
    if (result === String(value).trim()) return;
    this.setState(s => ({ draft: { ...s.draft, [name]: result } }));
  };
  onMoneyKeyDown = (e) => { if (e.key === 'Enter') { e.preventDefault && e.preventDefault(); e.target.blur(); } };
  fmt(n) { return (Math.round(n * 100) / 100).toLocaleString('zh-CN'); }
  // 大额金额缩写：万位以下照常显示，超过 1 万用「万」、超过 1 亿用「亿」，避免长数字撑成两行
  fmtBig(n) {
    const v = Math.round((Number(n) || 0) * 100) / 100;
    const abs = Math.abs(v);
    if (abs >= 1e8) return (Math.round(v / 1e8 * 100) / 100).toLocaleString('zh-CN') + '亿';
    if (abs >= 1e4) return (Math.round(v / 1e4 * 100) / 100).toLocaleString('zh-CN') + '万';
    return this.fmt(v);
  }
  heldSince(d) { if (!d) return ''; const t = new Date(d + 'T00:00:00').getTime(); if (isNaN(t)) return ''; const days = Math.floor((Date.now() - t) / 86400000); if (days < 0) return ''; if (days === 0) return '今天入手'; if (days < 30) return '已持有 ' + days + ' 天'; if (days < 365) { const m = Math.floor(days / 30); return '已持有 ' + m + ' 个月'; } const y = Math.floor(days / 365), rm = Math.floor((days % 365) / 30); return '已持有 ' + y + ' 年' + (rm ? rm + ' 个月' : ''); }
  money(v) { return this.cur() + this.fmt(v); }
  cur() { return this.state.currency || this.props.currency || '¥'; }
  charHue(c) { let h = 0; for (let i = 0; i < (c || '').length; i++) h = (h * 31 + c.charCodeAt(i)) % 360; return h; }
  accentColor() { return this.state.accent || this.props.accent || '#ff3355'; }
  parseHex(hex) { let h = String(hex || '').replace('#', ''); if (h.length === 3) h = h.split('').map(x => x + x).join(''); const n = parseInt(h, 16); return isNaN(n) ? { r: 255, g: 51, b: 85 } : { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }; }
  mixHex(hex, withR, withG, withB, p) { const c = this.parseHex(hex); const m = (a, b) => Math.round(a + (b - a) * p); return `rgb(${m(c.r, withR)},${m(c.g, withG)},${m(c.b, withB)})`; }
  accentLight(p) { return this.mixHex(this.accentColor(), 255, 255, 255, p); }
  accentAlpha(a) { const c = this.parseHex(this.accentColor()); return `rgba(${c.r},${c.g},${c.b},${a})`; }
  ensureCharImg() { if (this._ciInit) return; this._ciInit = true; this.charAssetMap = {}; try { this.charAssetMap = JSON.parse(localStorage.getItem('zzz_char_img') || '{}') || {}; } catch (e) {} this.charImgIds = {}; try { this.charImgIds = JSON.parse(localStorage.getItem('zzz_char_img_ids') || '{}') || {}; } catch (e) {} this.charImgMap = { ...this.CHAR_IMG, ...this.charAssetMap }; }
  charImg(name) { this.ensureCharImg(); return this.charImgMap[name] || ''; }
  async loadCharAvatars() { this.ensureCharImg(); let changed = false; for (const name in this.charImgIds) { try { const b = await this.idbGet(this.charImgIds[name]); if (b) { this.charImgMap[name] = URL.createObjectURL(b); changed = true; } } catch (e) {} } if (changed) this.forceUpdate(); }
  uploadCharAvatar = (name) => { if (!name || name === '全部') return; const inp = document.createElement('input'); inp.type = 'file'; inp.accept = 'image/*'; inp.onchange = async () => { const f = inp.files && inp.files[0]; if (!f) return; const id = 'img_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6); try { await this.idbPut(id, f); this.ensureCharImg(); this.charImgIds[name] = id; try { localStorage.setItem('zzz_char_img_ids', JSON.stringify(this.charImgIds)); } catch (e) {} this.charImgMap[name] = URL.createObjectURL(f); this.forceUpdate(); } catch (e) { alert('头像保存失败：' + e); } }; inp.click(); };
  persistCharMaps() { this.ensureCharImg(); try { localStorage.setItem('zzz_char_img', JSON.stringify(this.charAssetMap)); } catch (e) {} try { localStorage.setItem('zzz_char_img_ids', JSON.stringify(this.charImgIds)); } catch (e) {} }
  orderedChars() {
    // 每个作品独立角色库：只有主作品使用默认 Zezt 角色；其它作品为空或使用自己的角色列表
    const o = Array.isArray(this.state.charOrder) ? this.state.charOrder : [];
    if (o.length) return o;
    return (this.state.currentWorkId || this.MAIN_WORK) === this.MAIN_WORK ? this.CHARACTERS : [];
  }
  eventPoint(ev) {
    const t = (ev && ev.touches && ev.touches[0]) || (ev && ev.changedTouches && ev.changedTouches[0]) || ev || {};
    return { x: t.clientX || 0, y: t.clientY || 0 };
  }
  chipClick(fn) {
    return (ev) => {
      if (this.blockChipClickUntil && Date.now() < this.blockChipClickUntil) {
        ev && ev.preventDefault && ev.preventDefault();
        ev && ev.stopPropagation && ev.stopPropagation();
        return;
      }
      fn && fn(ev);
    };
  }
  startChipPointer(name, kind, ev) {
    if (name === '全部') return;
    const p = this.eventPoint(ev);
    this.pointerChipDrag = { name, kind, x: p.x, y: p.y };
  }
  finishChipPointer(name, kind, ev) {
    const drag = this.pointerChipDrag;
    if (!drag) return;
    const p = this.eventPoint(ev);
    const moved = Math.abs(p.x - drag.x) + Math.abs(p.y - drag.y) > 10;
    if (moved && drag.kind === kind && drag.name !== name && name !== '全部') {
      ev && ev.preventDefault && ev.preventDefault();
      ev && ev.stopPropagation && ev.stopPropagation();
      this.blockChipClickUntil = Date.now() + 350;
      this.reorderChip(kind, drag.name, name);
    }
    this.pointerChipDrag = null;
  }
  chipDrag(name, kind) { return { draggable: name !== '全部', onMouseDown: (ev) => this.startChipPointer(name, kind, ev), onMouseUp: (ev) => this.finishChipPointer(name, kind, ev), onTouchStart: (ev) => this.startChipPointer(name, kind, ev), onTouchEnd: (ev) => this.finishChipPointer(name, kind, ev), onTouchCancel: () => { this.pointerChipDrag = null; }, onDragStart: (ev) => { if (name === '全部') return; this.cdKind = kind; this.cdName = name; if (ev.dataTransfer) { ev.dataTransfer.effectAllowed = 'move'; try { ev.dataTransfer.setData('text/plain', JSON.stringify({ kind, name })); } catch(e) {} } }, onDragOver: (ev) => { if (name !== '全部') { ev.preventDefault(); if (ev.dataTransfer) ev.dataTransfer.dropEffect = 'move'; } }, onDrop: (ev) => { ev.preventDefault(); let src = this.cdName, k = this.cdKind; try { const raw = ev.dataTransfer && ev.dataTransfer.getData('text/plain'); if (raw) { const obj = JSON.parse(raw); src = obj.name || src; k = obj.kind || k; } } catch(e) {} if (k === kind) this.reorderChip(kind, src, name); this.cdName = null; this.cdKind = null; this.pointerChipDrag = null; } }; }
  reorderChip(kind, src, dst) {
    if (!src || src === dst || src === '全部' || dst === '全部') return;
    const cfg = { type: ['typesList', 'zzz_types'], series: ['seriesList', 'zzz_series'], channel: ['channels', 'zzz_channels'], purchaseChannel: ['purchaseChannels', 'zzz_purchase_channels'], form: ['formOrder', 'zzz_form_order'], acquire: ['acquireOrder', 'zzz_acquire_order'], reminderType: ['reminderTypes', 'zzz_reminder_types'], status: ['statusList', 'zzz_status'] }[kind];
    if (kind === 'char') return this.reorderChar(src, dst);
    if (!cfg) return;
    const field = { type: 'type', series: 'series', channel: 'channel', purchaseChannel: 'purchaseChannel', form: 'form', acquire: 'acquire', status: 'status' }[kind];
    const defaults = { typesList: this.TYPES, purchaseChannels: this.CHANNELS, formOrder: this.FORMS, acquireOrder: ['日谷','国谷','同人'], statusList: this.STATUSES, reminderTypes: this.REMINDER_TYPES };
    const base = [...((this.state[cfg[0]] && this.state[cfg[0]].length) ? this.state[cfg[0]] : (defaults[cfg[0]] || []))].filter(Boolean);
    const present = field ? [...new Set((this.state.items || []).map(i => i[field]).filter(Boolean))] : [];
    const arr = [...base, ...present.filter(x => !base.includes(x))];
    const si = arr.indexOf(src); if (si < 0) return; arr.splice(si, 1);
    const di = arr.indexOf(dst); if (di < 0) return; arr.splice(di, 0, src);
    try { localStorage.setItem(this.wkey(cfg[1]), JSON.stringify(arr)); } catch (e) {}
    this.setState({ [cfg[0]]: arr }, () => { if (this.state.cloudSyncId) this.markCloudPending(); });
  }
  addCharacter = () => {
    const v = (window.prompt('输入新角色名称') || '').trim(); if (!v) return;
    const arr = [...this.orderedChars()]; if (!arr.includes(v)) arr.push(v);
    try { localStorage.setItem(this.wkey('zzz_char_order', this.optScopeId()), JSON.stringify(arr)); } catch (e) {}
    this.setState(s => ({ charOrder: arr, draft: s.draft ? { ...s.draft, character: v } : s.draft }));
    if (window.confirm('要为「' + v + '」上传头像吗？')) this.uploadCharAvatar(v);
  };
  renameCharacter = (oldName, ev) => {
    if (ev) { ev.preventDefault && ev.preventDefault(); ev.stopPropagation && ev.stopPropagation(); }
    if (!oldName || oldName === '全部') return;
    const nv = (window.prompt('重命名角色「' + oldName + '」为（会同步修改所有该角色的谷子）：', oldName) || '').trim();
    if (!nv || nv === oldName) return;
    const items = this.state.items.map(x => ({ ...x, character: x.character === oldName ? nv : x.character, swapCharacter: x.swapCharacter === oldName ? nv : x.swapCharacter }));
    const base = [...this.orderedChars()];
    const present = [...new Set((this.state.items || []).flatMap(x => [x.character, x.swapCharacter]).filter(Boolean))];
    const arr = [...base, ...present.filter(x => !base.includes(x))].map(c => c === oldName ? nv : c);
    try { localStorage.setItem(this.wkey('zzz_char_order', this.optScopeId()), JSON.stringify(arr)); } catch (e) {}
    this.ensureCharImg();
    if (this.charImgIds[oldName] !== undefined) { this.charImgIds[nv] = this.charImgIds[oldName]; delete this.charImgIds[oldName]; }
    if (this.charAssetMap[oldName] !== undefined) { this.charAssetMap[nv] = this.charAssetMap[oldName]; delete this.charAssetMap[oldName]; }
    if (this.charImgMap[oldName] !== undefined) { this.charImgMap[nv] = this.charImgMap[oldName]; delete this.charImgMap[oldName]; }
    this.persistCharMaps();
    this.setState(s => ({ charOrder: arr, charSel: (s.charSel || []).map(x => x === oldName ? nv : x), draft: s.draft ? { ...s.draft, character: s.draft.character === oldName ? nv : s.draft.character, swapCharacter: s.draft.swapCharacter === oldName ? nv : s.draft.swapCharacter } : s.draft }));
    this.commit(items);
  };
  reorderChar = (srcName, dstName) => {
    if (!srcName || srcName === dstName || srcName === '全部' || dstName === '全部') return;
    const base = [...this.orderedChars()];
    const present = [...new Set((this.state.items || []).flatMap(x => [x.character, x.swapCharacter]).filter(Boolean))];
    const arr = [...base, ...present.filter(x => !base.includes(x))];
    const si = arr.indexOf(srcName); if (si < 0) return; arr.splice(si, 1);
    const di = arr.indexOf(dstName); if (di < 0) return; arr.splice(di, 0, srcName);
    try { localStorage.setItem(this.wkey('zzz_char_order', this.optScopeId()), JSON.stringify(arr)); } catch (e) {}
    this.setState({ charOrder: arr }, () => { if (this.state.cloudSyncId) this.markCloudPending(); });
  };
  customChipDrag(fieldKey, name) { return { draggable: name !== '全部', onMouseDown: (ev) => this.startChipPointer(name, 'custom:' + fieldKey, ev), onMouseUp: (ev) => { const drag = this.pointerChipDrag; this.finishChipPointer(name, 'custom:' + fieldKey, ev); if (drag && drag.kind === 'custom:' + fieldKey && drag.name !== name && name !== '全部') this.reorderCustomChip(fieldKey, drag.name, name); }, onTouchStart: (ev) => this.startChipPointer(name, 'custom:' + fieldKey, ev), onTouchEnd: (ev) => { const drag = this.pointerChipDrag; this.finishChipPointer(name, 'custom:' + fieldKey, ev); if (drag && drag.kind === 'custom:' + fieldKey && drag.name !== name && name !== '全部') this.reorderCustomChip(fieldKey, drag.name, name); }, onTouchCancel: () => { this.pointerChipDrag = null; }, onDragStart: (ev) => { if (name === '全部') return; this.cdKind = 'custom:' + fieldKey; this.cdName = name; if (ev.dataTransfer) { ev.dataTransfer.effectAllowed = 'move'; try { ev.dataTransfer.setData('text/plain', JSON.stringify({ kind: 'custom:' + fieldKey, name })); } catch(e) {} } }, onDragOver: (ev) => { if (name !== '全部') { ev.preventDefault(); if (ev.dataTransfer) ev.dataTransfer.dropEffect = 'move'; } }, onDrop: (ev) => { ev.preventDefault(); let src = this.cdName, k = this.cdKind; try { const raw = ev.dataTransfer && ev.dataTransfer.getData('text/plain'); if (raw) { const obj = JSON.parse(raw); src = obj.name || src; k = obj.kind || k; } } catch(e) {} if (k === 'custom:' + fieldKey) this.reorderCustomChip(fieldKey, src, name); this.cdName = null; this.cdKind = null; this.pointerChipDrag = null; } }; }
  reorderCustomChip(fieldKey, src, dst) {
    if (!fieldKey || !src || src === dst || src === '全部' || dst === '全部') return;
    const orderMap = { ...(this.state.customFilterOrder || {}) };
    const existing = orderMap[fieldKey] || [];
    const items = this.state.items || [];
    const present = [...new Set(items.map(i => i.custom && i.custom[fieldKey]).filter(Boolean))];
    let arr = [...existing.filter(x => present.includes(x)), ...present.filter(x => !existing.includes(x))];
    const si = arr.indexOf(src); if (si < 0) return; arr.splice(si, 1);
    const di = arr.indexOf(dst); if (di < 0) return; arr.splice(di, 0, src);
    orderMap[fieldKey] = arr;
    try { localStorage.setItem('zzz_custom_filter_order', JSON.stringify(orderMap)); } catch(e) {}
    this.setState({ customFilterOrder: orderMap }, () => { if (this.state.cloudSyncId) this.markCloudPending(); });
  }
  renameCustomFilterValue = (fieldKey, oldValue, ev) => {
    if (ev) { ev.preventDefault && ev.preventDefault(); ev.stopPropagation && ev.stopPropagation(); }
    if (!fieldKey || !oldValue || oldValue === '全部') return;
    const field = (this.state.customFields || []).find(f => f.key === fieldKey);
    const label = field ? field.label : '自定义标签';
    const nv = (window.prompt('重命名' + label + '「' + oldValue + '」为（会同步修改所有使用该标签的谷子）：', oldValue) || '').trim();
    if (!nv || nv === oldValue) return;
    const items = (this.state.items || []).map(it => {
      const custom = it.custom || {};
      return custom[fieldKey] === oldValue ? { ...it, custom: { ...custom, [fieldKey]: nv } } : it;
    });
    const orderMap = { ...(this.state.customFilterOrder || {}) };
    if (orderMap[fieldKey]) orderMap[fieldKey] = orderMap[fieldKey].map(x => x === oldValue ? nv : x);
    const customFilterSel = { ...(this.state.customFilterSel || {}) };
    if (customFilterSel[fieldKey]) customFilterSel[fieldKey] = customFilterSel[fieldKey].map(x => x === oldValue ? nv : x);
    try { localStorage.setItem('zzz_custom_filter_order', JSON.stringify(orderMap)); } catch(e) {}
    this.setState({ customFilterOrder: orderMap, customFilterSel }, () => this.commit(items));
  };
  emptyDraft() { const chars = this.orderedChars(); return { id: null, workId: this.defaultDraftWorkId(), custom: {}, name: '', character: (chars[0] || ''), type: this.TYPES[0], subtype: '', series: '', form: '通用', heat: 0, rate: '', otherFee: '', supplementPriceDate: '', finalPriceDate: '', shipDomDate: '', shipIntlDate: '', otherFeeDate: '', sellDate: '', acquire: '', method: '', purchaseChannel: '', swapped: '未置换', swapTo: '', swapCharacter: '', swapImageId: null, group: '收藏', status: '已下单', qty: '1', originalPrice: '', buyPrice: '', shipDom: '', shipIntl: '', sellPrice: '', supplementPrice: '', finalPrice: '', channel: '', buyDate: this.todayStr(), reminderType: '', reminderDate: this.todayStr(), note: '', imageId: null, imageId2: null, imageId3: null, imageId4: null, specialType: '', specialDate: '', setId: '', setName: '', setTotal: '', setVariant: '', timeline: [], tags: [], rarity: [] }; }
  imageSlotKeys() { return ['imageId', 'imageId2', 'imageId3', 'imageId4']; }
  imageIdsOf(it) { return this.imageSlotKeys().map(k => it && it[k]).filter(Boolean); }
  imageUrlsOf(it) { return this.imageIdsOf(it).map(id => this.imgUrls[id]).filter(Boolean); }
  mosaicCell(n, i) {
    const layouts = {
      1: [['1 / -1', '1 / -1']],
      2: [['1 / 2', '1 / -1'], ['2 / 3', '1 / -1']],
      3: [['1 / 2', '1 / -1'], ['2 / 3', '1 / 2'], ['2 / 3', '2 / 3']],
      4: [['1 / 2', '1 / 2'], ['2 / 3', '1 / 2'], ['1 / 2', '2 / 3'], ['2 / 3', '2 / 3']]
    };
    const cell = (layouts[Math.min(4, Math.max(1, n))] || layouts[1])[i] || layouts[1][0];
    return { gridColumn: cell[0], gridRow: cell[1] };
  }
  mosaicImgs(urls) {
    const list = [...new Set((urls || []).filter(Boolean))].slice(0, 4);
    return list.map((u, i) => ({ style: { ...this.mosaicCell(list.length, i), minWidth: 0, minHeight: 0, backgroundImage: `url(${u})`, backgroundSize: 'cover', backgroundPosition: 'center' } }));
  }

  // ---- modal / crud ----
  beginItemDrag = (id, ev) => {
    this.dragId = id;
    this.blockItemClickUntil = Date.now() + 500;
    if (ev && ev.dataTransfer) {
      ev.dataTransfer.effectAllowed = 'move';
      try { ev.dataTransfer.setData('text/plain', id); } catch(e) {}
    }
  };
  startItemPointer = (id, ev) => {
    const p = this.eventPoint(ev);
    this.pointerItemDrag = { id, x: p.x, y: p.y };
  };
  finishItemPointer = (id, ev) => {
    const drag = this.pointerItemDrag;
    if (!drag) return;
    const p = this.eventPoint(ev);
    const moved = Math.abs(p.x - drag.x) + Math.abs(p.y - drag.y) > 14;
    if (moved && drag.id !== id) {
      ev && ev.preventDefault && ev.preventDefault();
      ev && ev.stopPropagation && ev.stopPropagation();
      this.blockItemClickUntil = Date.now() + 500;
      this.reorder(drag.id, id);
    }
    this.pointerItemDrag = null;
  };
  endItemDrag = () => {
    this.dragId = null;
    this.pointerItemDrag = null;
    this.blockItemClickUntil = Date.now() + 350;
  };
  openItemFromRow = (it, ev) => {
    if (this.blockItemClickUntil && Date.now() < this.blockItemClickUntil) {
      if (ev) { ev.preventDefault && ev.preventDefault(); ev.stopPropagation && ev.stopPropagation(); }
      return;
    }
    this.openEdit(it);
  };
  feeHas(d) { return !!(this.num(d.originalPrice) || this.num(d.rate) || this.num(d.shipDom) || this.num(d.shipIntl) || this.num(d.otherFee)); }
  colInfoHas(d) { return !!((d.series && String(d.series).trim()) || (d.subtype && String(d.subtype).trim()) || (d.acquire && String(d.acquire).trim()) || (d.channel && String(d.channel).trim()) || (d.purchaseChannel && String(d.purchaseChannel).trim())); }
  setInfoHas(d) { return !!(d.setId || (d.setName && String(d.setName).trim()) || this.num(d.setTotal) || (d.setVariant && String(d.setVariant).trim())); }
  openAdd = () => this.setState({ modalOpen: true, editing: null, draft: this.emptyDraft(), feeOpen: false, colInfoOpen: false, setInfoOpen: false, itemEvidenceDrafts: [], itemEvidenceExistingIds: [], itemEvidenceOpen: false, modalTab: 'edit', itemShipDraftOpen: false }, () => { if (this.shippingSyncCode()) this.loadShippingFromCloud(); else this.loadLocalShipping(); });
  openEdit = (it) => { const d = { ...this.emptyDraft(), ...it }; this.setState({ modalOpen: true, editing: it.id, draft: d, feeOpen: this.feeHas(d), colInfoOpen: this.colInfoHas(d), setInfoOpen: this.setInfoHas(d), itemEvidenceDrafts: [], itemEvidenceExistingIds: [], itemEvidenceOpen: false, modalTab: 'edit', itemShipDraftOpen: false }, () => { if (this.shippingSyncCode()) this.loadShippingFromCloud(); else this.loadLocalShipping(); }); };
  openDuplicate = (it) => { const d = { ...this.emptyDraft(), ...it, id: null }; this.setState({ modalOpen: true, editing: null, draft: d, feeOpen: this.feeHas(d), colInfoOpen: this.colInfoHas(d), setInfoOpen: this.setInfoHas(d), modalTab: 'edit', itemShipDraftOpen: false }); };
  toggleFee = () => this.setState(s => ({ feeOpen: !s.feeOpen }));
  toggleItemEvidence = () => this.setState(s => ({ itemEvidenceOpen: !s.itemEvidenceOpen }));
  toggleSetMenu = () => this.toggleDraftMenu('setMenuOpen');
  pickSet = (id) => { try { if (id) localStorage.setItem('zzz_last_set', id); } catch (e) {} this.setState(s => ({ draft: { ...s.draft, setId: id }, setMenuOpen: false, lastSetId: id || s.lastSetId })); };
  addSet = () => {
    const name = (window.prompt('套装名称，例：VV 第一弹') || '').trim(); if (!name) return;
    let members = [];
    const useExisting = window.confirm('这个套装要从「已有角色」里选吗？\n\n确定＝勾选已有角色\n取消＝手动输入款式名');
    if (useExisting) {
      const chars = this.orderedChars().filter(c => c && c !== '全部');
      const pick = window.prompt('输入要包含的角色（用逗号分隔），可从下面复制：\n\n' + chars.join('、'), chars.join('、'));
      const names = (pick || '').split(/[,，\n、]/).map(x => x.trim()).filter(Boolean);
      members = names.map((nm, i) => ({ code: String(i + 1).padStart(2, '0'), name: nm }));
    } else {
      const memberRaw = (window.prompt('输入这个套装的款式，用逗号或换行分隔\n例：A款, B款, C款\n（可留空，之后再补）', '') || '').trim();
      if (memberRaw) {
        const names = memberRaw.split(/[,，\n、]/).map(x => x.trim()).filter(Boolean);
        members = names.map((nm, i) => ({ code: String(i + 1).padStart(2, '0'), name: nm }));
      }
    }
    const total = members.length ? members.length : Math.max(0, parseInt(window.prompt('总款数（可留空）', '') || '0') || 0);
    const id = 'set_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
    const wid = (this.state.draft && this.state.draft.workId) || this.state.currentWorkId || this.MAIN_WORK;
    const sets = [{ id, name, total, members, workId: wid }, ...(this.state.sets || [])];
    try { localStorage.setItem('zzz_sets', JSON.stringify(sets)); localStorage.setItem('zzz_last_set', id); } catch (e) {}
    this.setState(s => ({ sets, lastSetId: id, draft: { ...s.draft, setId: id }, setMenuOpen: false }));
  };
  setById(id) { return (this.state.sets || []).find(s => s.id === id) || null; }
  setCollectedCodes(setId, exceptId) { return [...new Set((this.state.items || []).filter(it => it.setId === setId && it.id !== exceptId).map(it => (it.setVariant || '').trim()).filter(Boolean))]; }
  toggleColInfo = () => this.setState(s => ({ colInfoOpen: !s.colInfoOpen }));
  toggleSetInfo = () => this.setState(s => ({ setInfoOpen: !s.setInfoOpen }));
  toggleSetVariantMenu = () => this.toggleDraftMenu('setVariantMenuOpen');
  toggleSetMemberEdit = () => this.setState(s => { const on = !s.setMemberEditMode; return { setMemberEditMode: on, setVariantMenuOpen: on ? true : s.setVariantMenuOpen }; });
  persistSets(sets) { try { localStorage.setItem('zzz_sets', JSON.stringify(sets)); } catch (e) {} }
  migrateSeriesToCustom = () => {
    const scope = (this.state.items || []);
    const has = scope.some(it => (it.series || '').trim());
    if (!has) { alert('没有旧「系列」数据需要转换。'); return; }
    if (!window.confirm('把旧「系列」整列转成一个自定义字段保留吗？\n\n· 会新建一个自定义字段（默认名「系列备份」）\n· 每件谷子的旧系列值搬进这个自定义字段\n· 内置「系列」字段会被隐藏，不再和新结构冲突\n建议先导出备份。')) return;
    const label = (window.prompt('给这个自定义字段起个名字：', '系列备份') || '系列备份').trim() || '系列备份';
    const key = 'cf_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
    const opts = [...new Set(scope.map(it => (it.series || '').trim()).filter(Boolean))];
    const customFields = [...(this.state.customFields || []), { key, label, options: opts }];
    const items = scope.map(it => { const v = (it.series || '').trim(); if (!v) return it; return { ...it, custom: { ...(it.custom || {}), [key]: v }, series: '' }; });
    const deletedFields = [...new Set([...(this.state.deletedFields || []), 'series'])];
    try { localStorage.setItem('zzz_custom_fields', JSON.stringify(customFields)); localStorage.setItem('zzz_deleted_fields', JSON.stringify(deletedFields)); } catch (e) {}
    this.setState({ customFields, deletedFields });
    this.commit(items);
    alert('已把旧「系列」转成自定义字段「' + label + '」并隐藏内置系列。');
  };
  migrateSeriesToSet = () => {
    const wid = this.state.currentWorkId && this.state.currentWorkId !== this.ALL_WORKS ? this.state.currentWorkId : this.MAIN_WORK;
    const scope = (this.state.items || []).filter(it => (it.workId || this.MAIN_WORK) === wid);
    const vals = [...new Set(scope.map(it => (it.series || '').trim()).filter(Boolean))];
    if (!vals.length) { alert('当前作品没有可迁移的旧「系列」数据。'); return; }
    if (!window.confirm('把当前作品里 ' + vals.length + ' 个旧「系列」值（' + vals.join('、') + '）迁移为「系列收藏 / 套装」吗？\n\n· 会为每个值建立一个套装，并把对应谷子归入\n· 原「系列」字段会清空\n建议先导出备份。')) return;
    let sets = [...(this.state.sets || [])];
    const idByName = {};
    vals.forEach(v => {
      let ex = sets.find(s => (s.workId || this.MAIN_WORK) === wid && s.name === v);
      if (!ex) { const id = 'set_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5) + sets.length; ex = { id, name: v, total: 0, members: [], workId: wid }; sets.push(ex); }
      idByName[v] = ex.id;
    });
    const items = (this.state.items || []).map(it => {
      if ((it.workId || this.MAIN_WORK) !== wid) return it;
      const v = (it.series || '').trim();
      if (!v || it.setId) return it.series ? { ...it, series: '' } : it;
      return { ...it, setId: idByName[v], setName: v, series: '' };
    });
    this.persistSets(sets); this.setState({ sets });
    this.commit(items);
    alert('迁移完成：已建立 ' + vals.length + ' 个套装并归入对应谷子。');
  };
  curSetId() { return this.state.draft && this.state.draft.setId; }
  updateSetMembers(setId, mut) {
    const id = setId || this.curSetId(); if (!id) return;
    const sets = (this.state.sets || []).map(s => { if (s.id !== id) return s; const members = mut([...(s.members || [])]); return { ...s, members, total: members.length || s.total }; });
    this.persistSets(sets); this.setState({ sets });
  }
  addSetMember = (setId) => { const v = (window.prompt('新增款式名称，例：诺克斯 / A款') || '').trim(); if (!v) return; this.updateSetMembers(setId, m => { m.push({ code: String(m.length + 1).padStart(2, '0'), name: v }); return m; }); };
  addSetMemberChar = (setId, name) => { this.updateSetMembers(setId, m => { if (m.some(x => x.name === name)) return m; m.push({ code: String(m.length + 1).padStart(2, '0'), name }); return m; }); };
  renameSetMember = (setId, idx) => { const s = this.setById(setId || this.curSetId()); const cur = s && s.members && s.members[idx]; if (!cur) return; const v = (window.prompt('修改款式名称：', cur.name) || '').trim(); if (!v) return; this.updateSetMembers(setId, m => { m[idx] = { ...m[idx], name: v }; return m; }); };
  delSetMember = (setId, idx) => { const s = this.setById(setId || this.curSetId()); const cur = s && s.members && s.members[idx]; if (!cur) return; if (!window.confirm('删除款式「' + cur.code + ' ' + cur.name + '」？')) return; this.updateSetMembers(setId, m => { m.splice(idx, 1); return m.map((x, i) => ({ ...x, code: String(i + 1).padStart(2, '0') })); }); };
  addSetInManage = () => { const name = (window.prompt('新建套装名称，例：VV 第一弹') || '').trim(); if (!name) return; const id = 'set_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5); const wid = (this.state.draft && this.state.draft.workId) || this.state.currentWorkId || this.MAIN_WORK; const sets = [{ id, name, total: 0, members: [], workId: wid }, ...(this.state.sets || [])]; this.persistSets(sets); this.setState({ sets }); };
  renameSet = (id) => { const s = this.setById(id); if (!s) return; const v = (window.prompt('修改套装名称：', s.name) || '').trim(); if (!v) return; const sets = (this.state.sets || []).map(x => x.id === id ? { ...x, name: v } : x); this.persistSets(sets); this.setState({ sets }); };
  delSet = (id) => { const s = this.setById(id); if (!s) return; const used = (this.state.items || []).filter(it => it.setId === id).length; if (!window.confirm('删除套装「' + s.name + '」？' + (used ? '\n有 ' + used + ' 件谷子属于它（谷子不会被删，只是取消归类）。' : ''))) return; const sets = (this.state.sets || []).filter(x => x.id !== id); const items = (this.state.items || []).map(it => it.setId === id ? { ...it, setId: '', setName: '', setVariant: '' } : it); this.persistSets(sets); this.setState(st => ({ sets, draft: st.draft && st.draft.setId === id ? { ...st.draft, setId: '' } : st.draft })); this.commit(items); };
  toggleSetManageEdit = () => this.setState(s => { const on = !s.setManageEditMode; return { setManageEditMode: on, setMenuOpen: on ? true : s.setMenuOpen }; });
  openSetManage = () => this.setState({ setManageOpen: true, setMenuOpen: false });
  closeSetManage = () => this.setState({ setManageOpen: false });
  toggleSetCollapse = (id) => this.setState(s => { const c = { ...(s.setManageCollapsed || {}) }; c[id] = !c[id]; return { setManageCollapsed: c }; });
  setLabelText() { return (this.state.fieldLabels || {})['set'] || '系列收藏 / 套装'; }
  renameSetLabel = () => { const cur = this.setLabelText(); const v = (window.prompt('把字段名「' + cur + '」改成：', cur) || '').trim(); if (!v || v === cur) return; const fieldLabels = { ...(this.state.fieldLabels || {}), set: v }; try { localStorage.setItem('zzz_field_labels', JSON.stringify(fieldLabels)); } catch (e) {} this.setState({ fieldLabels }); };
  pickSetMember = (m) => this.setState(s => {
    const draft = { ...s.draft, subtype: m.code + ' ' + m.name, setVariant: m.code + ' ' + m.name };
    if (m.name && this.orderedChars().includes(m.name)) draft.character = m.name;
    return { draft, setVariantMenuOpen: false };
  });
  toggleDraftTag = (kind, tag) => this.setState(s => { const arr = [...((s.draft && s.draft[kind]) || [])]; const i = arr.indexOf(tag); if (i >= 0) arr.splice(i, 1); else arr.push(tag); return { draft: { ...s.draft, [kind]: arr } }; });
  addTagOption = (key, lsKey) => { const v = (window.prompt('输入新的标签') || '').trim(); if (!v) return; const cur = this.state[key] || []; if (cur.includes(v)) return; const arr = [...cur, v]; try { localStorage.setItem(this.wkey(lsKey), JSON.stringify(arr)); } catch (e) {} this.setState({ [key]: arr }); };
  toggleTagEdit = () => this.setState(s => ({ tagEditMode: !s.tagEditMode }));
  delTagOption = (key, lsKey, tag) => { if (!window.confirm('删除标签「' + tag + '」？（已用到它的谷子不受影响）')) return; const arr = (this.state[key] || []).filter(x => x !== tag); try { localStorage.setItem(this.wkey(lsKey), JSON.stringify(arr)); } catch (e) {} this.setState({ [key]: arr }); };
  reorder = (srcId, dstId) => {
    if (!srcId || srcId === dstId) return;
    const items = [...this.state.items];
    const si = items.findIndex(x => x.id === srcId); if (si < 0) return;
    const [moved] = items.splice(si, 1);
    const di = items.findIndex(x => x.id === dstId); if (di < 0) { items.splice(si, 0, moved); return; }
    items.splice(di, 0, moved);
    this.commit(items);
  };
  closeModal = () => {
    const ids = this.state.bulkEditIds || [];
    if (ids.length) {
      const saved = this.bulkSavedIds || new Set();
      const remove = new Set(ids.filter(id => !saved.has(id)));
      if (remove.size) {
        const items = (this.state.items || []).filter(x => !remove.has(x.id));
        try { localStorage.setItem('zzz_goods_v1', JSON.stringify(items)); } catch (e) {}
        this.setState({ items, savedAt: Date.now(), cloudPending: !!(this.state.cloudSyncCode || localStorage.getItem('zzz_cloud_code')), cloudStatus: (this.state.cloudSyncCode || localStorage.getItem('zzz_cloud_code')) ? '本机有未上传的修改。请完成整理后手动上传到云端。' : this.state.cloudStatus, modalOpen: false, draft: null, editing: null, bulkEditIds: [], bulkEditIndex: 0 });
        this.bulkSavedIds = new Set();
        return;
      }
      this.bulkSavedIds = new Set();
    }
    this.setState({ modalOpen: false, draft: null, editing: null, bulkEditIds: [], bulkEditIndex: 0 });
  };
  duplicateCurrent = () => { const d = this.state.draft; if (!d) return; this.setState({ editing: null, draft: { ...d, id: null, name: (d.name || '未命名') + ' 副本', buyDate: this.todayStr(), reminderDate: '', statusLog: [], swapLog: [] } }); };
  deleteCurrent = () => { const id = this.state.editing; if (!id) return; const it = this.state.items.find(x => x.id === id); if (!it) { this.closeModal(); return; } if (!confirm('确定删除「' + (it.name || '该谷子') + '」？')) return; this.commit(this.state.items.filter(x => x.id !== id)); this.closeModal(); };
  onDraftChange = (e) => { const { name, value } = e.target; this.setState(s => { const draft = { ...s.draft, [name]: value }; if (name === 'reminderDate' && s.draft && s.draft.status === '已下单') draft.buyDate = value; return { draft }; }); };
  autoGrowNote = (e) => { const el = e.target; el.style.height = 'auto'; el.style.height = Math.max(42, el.scrollHeight) + 'px'; };
  onTypeChange = (e) => { let v = e.target.value; if (v === '__custom__') { v = (window.prompt('输入新的种类名称') || '').trim(); if (!v) return; } else if (v === '__rename__') { return this.renameType(); } else if (v === '__delete__') { return this.deleteType(); } this.setState(s => ({ draft: { ...s.draft, type: v } })); };
  deleteType = () => {
    const cur = this.state.draft ? this.state.draft.type : ''; if (!cur) return;
    const used = this.state.items.filter(x => x.type === cur).length;
    if (used > 0) { alert('还有 ' + used + ' 件谷子在用「' + cur + '」，无法删除。可先把它们改成别的种类。'); return; }
    const hiddenTypes = [...new Set([...(this.state.hiddenTypes || []), cur])];
    try { localStorage.setItem(this.wkey('zzz_hidden_types'), JSON.stringify(hiddenTypes)); } catch (e) {}
    const next = this.TYPES.find(t => !hiddenTypes.includes(t)) || '';
    this.setState(s => ({ hiddenTypes, draft: { ...s.draft, type: next } }));
  };
  renameType = () => {
    const cur = this.state.draft ? this.state.draft.type : ''; if (!cur) return;
    const nv = (window.prompt('将种类「' + cur + '」重命名为（会同步修改所有该种类的谷子）：', cur) || '').trim();
    if (!nv || nv === cur) return;
    const items = this.state.items.map(x => x.type === cur ? { ...x, type: nv } : x);
    this.commit(items); this.setState(s => ({ draft: { ...s.draft, type: nv } }));
  };
  onSeriesChange = (e) => { let v = e.target.value; if (v === '__custom__') { v = (window.prompt('输入新的系列名称（用于归类，如：TV本编 / 剧场版 / 一番赏 / プレバン限定）') || '').trim(); if (v === '') return; } else if (v === '__rename__') { return this.renameSeries(); } this.setState(s => ({ draft: { ...s.draft, series: v } })); };
  renameSeries = () => {
    const cur = this.state.draft ? (this.state.draft.series || '') : ''; if (!cur) { alert('请先选中一个系列再重命名'); return; }
    const nv = (window.prompt('将系列「' + cur + '」重命名为（会同步修改所有该系列的谷子）：', cur) || '').trim();
    if (nv === cur) return;
    const items = this.state.items.map(x => (x.series || '') === cur ? { ...x, series: nv } : x);
    this.commit(items); this.setState(s => ({ draft: { ...s.draft, series: nv } }));
  };
  onChannelChange = (e) => { let v = e.target.value; if (v === '__custom__') { v = (window.prompt('新的平台或店铺名称') || '').trim(); if (v === '') return; } else if (v === '__rename__') { return this.renameChannel(); } else if (v === '__delete__') { return this.deleteChannel(); } this.setState(s => ({ draft: { ...s.draft, channel: v } })); };
  renameChannel = () => {
    const cur = this.state.draft ? (this.state.draft.channel || '') : ''; if (!cur) { alert('请先选中一个平台再重命名'); return; }
    const nv = (window.prompt('将平台「' + cur + '」重命名为（会同步修改所有该平台的谷子）：', cur) || '').trim();
    if (nv === cur) return;
    const items = this.state.items.map(x => (x.channel || '') === cur ? { ...x, channel: nv } : x);
    this.commit(items); this.setState(s => ({ draft: { ...s.draft, channel: nv } }));
  };
  deleteChannel = () => {
    const cur = this.state.draft ? (this.state.draft.channel || '') : ''; if (!cur) return;
    const used = this.state.items.filter(x => (x.channel || '') === cur).length;
    if (used > 0) { alert('还有 ' + used + ' 件谷子在用「' + cur + '」，无法删除。可先把它们改成别的平台。'); return; }
    const hiddenChannels = [...new Set([...(this.state.hiddenChannels || []), cur])];
    try { localStorage.setItem(this.wkey('zzz_hidden_channels'), JSON.stringify(hiddenChannels)); } catch (e) {}
    this.setState(s => ({ hiddenChannels, draft: { ...s.draft, channel: '' } }));
  };
  fillBuyFromRate = () => { this.setState(s => { const d = s.draft; const v = Math.round(this.num(d.originalPrice) * this.num(d.rate) * 100) / 100; return { draft: { ...d, buyPrice: String(v) } }; }); };
  removeDraftImageKey = (key) => this.setState(s => ({ draft: { ...s.draft, [key]: null } }));
  removeDraftImg = () => this.setState(s => ({ draft: { ...s.draft, imageId: null } }));
  removeDraftImg2 = () => this.setState(s => ({ draft: { ...s.draft, imageId2: null } }));
  removeDraftImg3 = () => this.setState(s => ({ draft: { ...s.draft, imageId3: null } }));
  removeDraftImg4 = () => this.setState(s => ({ draft: { ...s.draft, imageId4: null } }));
  removeDraftSwapImg = () => this.setState(s => ({ draft: { ...s.draft, swapImageId: null } }));
  onImagePickSwap = async (e) => {
    const file = e.target.files && e.target.files[0]; if (!file) return;
    const id = 'img_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6);
    try { await this.idbPut(id, file); this.imgUrls[id] = URL.createObjectURL(file); this.setState(s => ({ draft: { ...s.draft, swapImageId: id } })); } catch (err) { alert('图片保存失败：' + err); }
    e.target.value = '';
  };
  saveDraftImages = async (filesLike, preferredKey) => {
    const files = Array.from(filesLike || []).filter(f => f && f.type && f.type.startsWith('image/')).slice(0, 4);
    if (!files.length) return;
    const keys = this.imageSlotKeys();
    const d = this.state.draft || {};
    const next = { ...d };
    const targets = [];
    const replaceGroup = !preferredKey && files.length > 1;
    if (replaceGroup) {
      targets.push(...keys.slice(0, files.length));
    } else {
      if (preferredKey && keys.includes(preferredKey) && files.length === 1) targets.push(preferredKey);
      if (!targets.length) keys.forEach(k => { if (!next[k] && targets.length < files.length) targets.push(k); });
      keys.forEach(k => { if (targets.length < files.length && !targets.includes(k)) targets.push(k); });
    }
    const saved = {};
    for (let i = 0; i < files.length && i < targets.length; i++) {
      const file = files[i];
      const id = 'img_' + Date.now() + '_' + i + '_' + Math.random().toString(36).slice(2, 6);
      try {
        await this.idbPut(id, file);
        this.imgUrls[id] = URL.createObjectURL(file);
        saved[targets[i]] = id;
      } catch (err) {
        alert('图片保存失败：' + err);
      }
    }
    if (Object.keys(saved).length) {
      const cleared = replaceGroup ? Object.fromEntries(keys.map(k => [k, null])) : {};
      this.setState(s => ({ draft: { ...s.draft, ...cleared, ...saved } }));
    }
  };
  onImagePickSlot = async (e, key) => { await this.saveDraftImages(e.target.files, key); e.target.value = ''; };
  onImagePick2 = async (e) => this.onImagePickSlot(e, 'imageId2');
  onImagePick3 = async (e) => this.onImagePickSlot(e, 'imageId3');
  onImagePick = async (e) => {
    const files = Array.from(e.target.files || []).filter(f => f && f.type && f.type.startsWith('image/'));
    if (!files.length) return;
    if (files.length === 1) { await this.saveDraftImages(files, null); e.target.value = ''; return; }
    const sameItem = window.confirm('这些图片要怎么收？\n\n确定：都放进这条谷子的相册\n取消：每张图单独开一条记录');
    if (sameItem) await this.saveDraftImages(files, null);
    else await this.createItemsFromImages(files);
    e.target.value = '';
  };
  createItemsFromImages = async (filesInput) => {
    const files = Array.from(filesInput || []).filter(f => f && f.type && f.type.startsWith('image/'));
    if (!files.length) return;
    const limit = files.length > 30 ? 30 : files.length;
    const now = Date.now();
    const newItems = [];
    for (let i = 0; i < limit; i++) {
      const file = files[i];
      const imgId = 'img_' + (now + i) + '_' + Math.random().toString(36).slice(2, 6);
      try { await this.idbPut(imgId, file); this.imgUrls[imgId] = URL.createObjectURL(file); } catch (err) { alert('第 ' + (i + 1) + ' 张图片保存失败：' + err); continue; }
      const base = this.emptyDraft();
      newItems.push({ ...base, id: 'it_' + (now + i) + '_' + Math.random().toString(36).slice(2, 6), name: file.name ? file.name.replace(/\.[^.]+$/, '') : ('新谷子 ' + (i + 1)), imageId: imgId, workId: this.state.currentWorkId, buyDate: '' });
    }
    if (!newItems.length) return;
    const items = [...newItems, ...this.state.items];
    const ids = newItems.map(x => x.id);
    this.commit(items);
    this.bulkSavedIds = new Set();
    this.setState({ bulkEditIds: ids, bulkEditIndex: 0, modalOpen: true, editing: ids[0], draft: { ...this.emptyDraft(), ...newItems[0] } });
  };
  openBulkImageImport = () => {
    const inp = document.createElement('input');
    inp.type = 'file'; inp.accept = 'image/*'; inp.multiple = true;
    inp.onchange = async () => {
      const files = Array.from(inp.files || []).filter(f => f && f.type && f.type.startsWith('image/'));
      if (!files.length) return;
      await this.createItemsFromImages(files);
    };
    inp.click();
  };
  bulkCurrentIndex() { const ids = this.state.bulkEditIds || []; const idx = ids.indexOf(this.state.editing); return idx >= 0 ? idx : (this.state.bulkEditIndex || 0); }
  saveDraftNoClose() {
    let d = this.state.draft; if (!d) return null;
    if (!d.name || !d.name.trim()) d = { ...d, name: this.genName(d) || '未命名' };
    const id = this.state.editing || d.id || ('it_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6));
    const savedItem = { ...d, id, workId: this.draftWorkId(d) };
    const exists = (this.state.items || []).some(x => x.id === id);
    const items = exists ? this.state.items.map(x => x.id === id ? savedItem : x) : [savedItem, ...this.state.items];
    this.commit(items);
    if ((this.state.bulkEditIds || []).includes(id)) { this.bulkSavedIds = this.bulkSavedIds || new Set(); this.bulkSavedIds.add(id); }
    return savedItem;
  }
  moveBulkEdit(dir) {
    const ids = this.state.bulkEditIds || [];
    if (!ids.length) return;
    this.saveDraftNoClose();
    const cur = this.bulkCurrentIndex();
    if (dir > 0 && cur >= ids.length - 1) { this.bulkSavedIds = new Set(ids); this.setState({ bulkEditIds: [], bulkEditIndex: 0 }, () => this.closeModal()); return; }
    const ni = Math.min(ids.length - 1, Math.max(0, cur + dir));
    const id = ids[ni];
    const it = (this.state.items || []).find(x => x.id === id) || {};
    this.setState({ bulkEditIndex: ni, modalOpen: true, editing: id, draft: { ...this.emptyDraft(), ...it } });
  }
  saveBulkPrev = () => this.moveBulkEdit(-1);
  saveBulkNext = () => this.moveBulkEdit(1);
  genName = (d) => { const char = (d.character || '').trim(); const setPart = [(d.setName || '').trim(), (d.setVariant || '').trim()].filter(Boolean).join(' '); if (setPart) return [char, setPart].filter(Boolean).join(' '); const typePart = [(d.type || '').trim(), (d.subtype || '').trim()].filter(Boolean).join(' '); return [char, typePart].filter(Boolean).join(' '); };
  fillName = () => { this.setState(s => ({ draft: { ...s.draft, name: this.genName(s.draft) } })); };
  handleDuplicateBeforeSave(d) {
    const name = String((d && d.name) || '').trim();
    if (!name) return false;
    const workId = (d && d.workId) || this.state.currentWorkId;
    const dup = (this.state.items || []).find(it => (it.workId || this.MAIN_WORK) === (workId || this.MAIN_WORK) && String(it.name || '').trim() === name && (it.character || '') === (d.character || '') && (it.type || '') === (d.type || ''));
    if (!dup) return false;
    return !window.confirm('已经有一条很像的记录了，还是要保存这一条吗？');
  }
  saveItem = async (opts) => {
    const thenShip = opts && opts.thenShip;
    let d = this.state.draft; if (!d) return;
    if (!d.name || !d.name.trim()) { const g = this.genName(d); if (!g) { alert('请先填写名称（或选择角色 / 填细分后点自动生成）'); return; } d = { ...d, name: g }; }
    const _moneyLabels = { buyPrice:'买入价', sellPrice:'卖出价', supplementPrice:'补款金额', finalPrice:'尾款金额', shipDom:'国内邮费', shipIntl:'国际邮费', otherFee:'其他费用', originalPrice:'原价', rate:'汇率' };
    const _moneyPatch = {};
    for (const f of Object.keys(_moneyLabels)) {
      const v = d[f];
      if (v == null || String(v).trim() === '') continue;
      const r = this.calcMoneyInput(v, f === 'rate' ? 4 : 2);
      if (r === null) { alert('「' + _moneyLabels[f] + '」这一栏的公式错误，请检查后再保存：' + v); return; }
      if (r !== String(v)) _moneyPatch[f] = r;
    }
    if (Object.keys(_moneyPatch).length) d = { ...d, ..._moneyPatch };
    if (!this.state.editing && this.handleDuplicateBeforeSave(d)) return;
    const prev = this.state.editing ? this.state.items.find(x => x.id === this.state.editing) : null;
    const setObj = this.setById(d.setId);
    if (setObj) d = { ...d, setName: setObj.name, setTotal: setObj.total ? String(setObj.total) : '' };
    else if (d.setId === '') d = { ...d, setName: '', setTotal: '' };
    const nowArrived = this.arrivedOf(d) && !(prev && this.arrivedOf(prev));
    // 收藏生命周期：状态变化时，把「状态 + 当前日期」追加进时间轴（只追加，不覆盖历史）
    const prevStatus = prev ? (prev.status || '') : '';
    const curStatus = d.status || '';
    let statusLog = Array.isArray(d.statusLog) ? [...d.statusLog] : (prev && Array.isArray(prev.statusLog) ? [...prev.statusLog] : []);
    const prevStatusDate = prev ? (prev.reminderDate || prev.buyDate || '') : '';
    const curStatusDate = d.reminderDate || d.buyDate || new Date().toISOString().slice(0, 10);
    if (curStatus && (curStatus !== prevStatus || curStatusDate !== prevStatusDate)) statusLog = this.statusLogWith(statusLog, curStatus, curStatusDate);
    d = { ...d, statusLog };
    const feeEventDate = curStatusDate;
    const feeWasEmpty = (key) => !prev || !this.num(prev[key]);
    if (this.num(d.supplementPrice) > 0 && (!d.supplementPriceDate || feeWasEmpty('supplementPrice'))) d = { ...d, supplementPriceDate: this.statusLogDate(d, '已补款') || feeEventDate };
    if (!this.num(d.supplementPrice)) d = { ...d, supplementPriceDate: '' };
    if (this.num(d.finalPrice) > 0 && (!d.finalPriceDate || feeWasEmpty('finalPrice'))) d = { ...d, finalPriceDate: this.statusLogDate(d, '已尾款') || feeEventDate };
    if (!this.num(d.finalPrice)) d = { ...d, finalPriceDate: '' };
    if (this.num(d.shipDom) > 0 && (!d.shipDomDate || feeWasEmpty('shipDom'))) d = { ...d, shipDomDate: feeEventDate };
    if (!this.num(d.shipDom)) d = { ...d, shipDomDate: '' };
    if (this.num(d.shipIntl) > 0 && (!d.shipIntlDate || feeWasEmpty('shipIntl'))) d = { ...d, shipIntlDate: feeEventDate };
    if (!this.num(d.shipIntl)) d = { ...d, shipIntlDate: '' };
    if (this.num(d.otherFee) > 0 && (!d.otherFeeDate || feeWasEmpty('otherFee'))) d = { ...d, otherFeeDate: feeEventDate };
    if (!this.num(d.otherFee)) d = { ...d, otherFeeDate: '' };
    if (this.num(d.sellPrice) > 0 && (!d.sellDate || feeWasEmpty('sellPrice'))) d = { ...d, sellDate: (this.statusLogDate(d, '已出物') || this.statusLogDate(d, '已出/已卖出') || feeEventDate) };
    if (!this.num(d.sellPrice)) d = { ...d, sellDate: '' };
    // 置换 / 收现 = 收藏历程事件：主表单是最终收藏，这里记录「怎么得到的」
    // 厂商已并入平台，不再由平台自动回填到系列。
    const isSwapNow = d.method === '盲抽' && (d.gachaResult === '置换' || d.gachaResult === '收现');
    if (isSwapNow) {
      const newSig = [d.gachaResult, d.swapNote || ''].join('|');
      let swapLog = Array.isArray(d.swapLog) ? [...d.swapLog] : (prev && Array.isArray(prev.swapLog) ? [...prev.swapLog] : []);
      const lastSig = swapLog.length ? swapLog[swapLog.length - 1].sig : '';
      if (newSig !== lastSig) {
        swapLog.push({
          date: d.reminderDate || d.buyDate || new Date().toISOString().slice(0, 10), ts: Date.now(), sig: newSig,
          kind: d.gachaResult, note: d.swapNote || '', toChar: d.character || '', toName: d.name || ''
        });
      }
      d = { ...d, swapLog };
    }
    let items, savedItem;
    if (this.state.editing) { savedItem = { ...d, id: this.state.editing, workId: this.draftWorkId(d) }; items = this.state.items.map(x => x.id === this.state.editing ? savedItem : x); }
    else { savedItem = { ...d, id: 'it_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6), workId: this.draftWorkId(d) }; items = [savedItem, ...this.state.items]; }
    if (d.channel && !this.state.channels.includes(d.channel)) this.saveChannels([...this.state.channels, d.channel]);
    if (d.purchaseChannel && !(this.state.purchaseChannels || []).includes(d.purchaseChannel)) this.saveList('purchaseChannels', 'zzz_purchase_channels', [...(this.state.purchaseChannels || []), d.purchaseChannel]);
    if (d.type && !this.state.typesList.includes(d.type)) this.saveList('typesList', 'zzz_types', [...this.state.typesList, d.type]);
    if (d.series && !this.state.seriesList.includes(d.series)) this.saveList('seriesList', 'zzz_series', [...this.state.seriesList, d.series]);
    const pendingDocs=this.state.itemEvidenceDrafts || [];
    this.commit(items);
    if ((this.state.bulkEditIds || []).includes(savedItem.id)) { this.bulkSavedIds = this.bulkSavedIds || new Set(); this.bulkSavedIds.add(savedItem.id); }
    if (pendingDocs.length || (this.state.itemEvidenceExistingIds||[]).length) {
      this.setState({ cloudBusy:true, cloudStatus:'谷子已保存，正在保存或关联本体资料…' });
      try { await this.uploadPendingItemEvidence(savedItem); this.setState({ itemEvidenceDrafts:[], itemEvidenceExistingIds:[], cloudBusy:false, cloudStatus:'谷子和本体资料已保存。' }); }
      catch(e) { this.setState({ cloudBusy:false, cloudStatus:'谷子已保存，但资料保存失败：'+((e&&e.message)||e) }); alert('谷子已保存在本机，但资料保存失败：'+((e&&e.message)||e)); }
    }
    if (thenShip) {
      // 保存后不关弹窗：切换成「编辑该谷子」状态，跳到排发 tab，并默认关联这件谷子
      this.setState({ editing: savedItem.id, draft: { ...d, id: savedItem.id }, modalTab: 'ship', itemShipDraftOpen: false }, () => { if (this.shippingSyncCode()) this.loadShippingFromCloud(); else this.loadLocalShipping(); });
      if (nowArrived) this.celebrateArrival();
      this.uploadSnapshot(savedItem); this.logEvent('item_saved', { item_name: savedItem.name || '', has_sell: !!this.num(savedItem.sellPrice), qty: this.num(savedItem.qty || 1) });
      return;
    }
    const _sd = this.state.shippingDraft;
    if (this.state.modalTab === 'ship' && _sd && (_sd.group || '').trim() && ((_sd.files || []).length || (_sd.itemIds || []).length)) {
      try { await this.saveShipping(); } catch (e) {}
    }
    this.closeModal();
    if (nowArrived) this.celebrateArrival();
    this.uploadSnapshot(savedItem); this.logEvent('item_saved', { item_name: savedItem.name || '', has_sell: !!this.num(savedItem.sellPrice), qty: this.num(savedItem.qty || 1) });
  };
  showTip = (term) => { const t = this.GLOSSARY[term]; if (!t) return; this.setState({ toast: term + '：' + t }); clearTimeout(this._toastT); this._toastT = setTimeout(() => this.setState({ toast: '' }), 4200); };
  celebrateArrival() {
    const today = new Date().toISOString().slice(0, 10);
    let n = 0; try { const rec = JSON.parse(localStorage.getItem('zzz_home_today') || '{}'); n = (rec.date === today ? rec.n : 0) + 1; localStorage.setItem('zzz_home_today', JSON.stringify({ date: today, n })); } catch (e) { n = 1; }
    this.setState({ toast: '今天有 ' + n + ' 件谷子已归家' });
    clearTimeout(this._toastT); this._toastT = setTimeout(() => this.setState({ toast: '' }), 3200);
  }
  removeItem = (it) => { if (!confirm('确定删除「' + (it.name || '该谷子') + '」？')) return; this.commit(this.state.items.filter(x => x.id !== it.id)); };


  // ---- V2.3/V3.1 efficiency tools: Excel export/import / batch edit / duplicate check ----
  htmlEscape(v) { return String(v == null ? '' : v).replace(/[&<>\"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
  async imgData(id) { if (!id) return ''; try { const b = await this.idbGet(id); return b ? await this.blobToDataURL(b) : ''; } catch (e) { return ''; } }
  excelSheet(name, headers, rows, withImages) {
    const imageCols = new Set(['图片1','图片2','图片3','图片4']);
    const th = headers.map(h => '<th>' + this.htmlEscape(h) + '</th>').join('');
    const trs = (rows || []).map(r => '<tr>' + headers.map(h => {
      const v = r[h] ?? '';
      if (withImages && imageCols.has(h) && String(v).startsWith('data:')) return '<td style="width:74px;height:74px;text-align:center"><img src="' + v + '" style="max-width:68px;max-height:68px;object-fit:contain"></td>';
      return '<td>' + this.htmlEscape(v) + '</td>';
    }).join('') + '</tr>').join('');
    return '<x:ExcelWorksheet><x:Name>' + this.htmlEscape(name).slice(0,31) + '</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>' +
      '<h2>' + this.htmlEscape(name) + '</h2><table border="1"><tr>' + th + '</tr>' + trs + '</table><br style="mso-data-placement:same-cell">';
  }
  async buildExcelRows(includeImages) {
    const workById = Object.fromEntries((this.state.works || []).map(w => [w.id, w]));
    const items = this.state.items || [];
    const itemRows = [];
    for (const it of items) {
      const e = this.enrich(it); const w = workById[it.workId] || {};
      const row = {
        '图片1': includeImages ? await this.imgData(it.imageId) : '', '图片2': includeImages ? await this.imgData(it.imageId2) : '', '图片3': includeImages ? await this.imgData(it.imageId3) : '', '图片4': includeImages ? await this.imgData(it.imageId4) : '',
        '作品系列IP': w.group || '', '作品': w.name || '', '名称': it.name || '', '角色': it.character || '', '种类': it.type || '', '细分': it.subtype || '', '系列': it.series || '', '状态': it.status || '', '数量': e.qty, '原价(日元)': it.originalPrice || '', '买入单价': e.buy || '', '购买日期': it.buyDate || '', '补款金额': it.supplementPrice || '', '补款日期': it.supplementPriceDate || '', '尾款金额': it.finalPrice || '', '尾款日期': it.finalPriceDate || '', '国内邮费': e.sd || '', '国内邮费日期': it.shipDomDate || '', '国际邮费': e.si || '', '国际邮费日期': it.shipIntlDate || '', '其他费用': e.other || '', '其他费用日期': it.otherFeeDate || '', '总投入': e.cost || '', '卖出单价': e.sell || '', '卖出日期': this.sellDateFor(it) || '', '卖出金额': e.revenue || '', '盈亏': e.sold ? e.profit : '', '平台': it.channel || '', '渠道': it.purchaseChannel || '', '提醒类型': it.reminderType || '', '状态日期': it.reminderDate || '', '所属套装': it.setName || '', '套装总数': it.setTotal || '', '款式编号': it.setVariant || '', '备注': it.note || '', '编号（请勿修改，用于重新导入时识别更新）': it.id || ''
      };
      itemRows.push(row);
    }
    const saleRows = itemRows.filter(r => r['卖出单价'] || String(r['状态']).includes('出'));
    const now = new Date();
    const monthKeys = []; for (let i = 5; i >= 0; i--) { const d = new Date(now.getFullYear(), now.getMonth() - i, 1); monthKeys.push(this.monthKey(d)); }
    const walletRows = monthKeys.map(k => { let cost=0, sell=0, profit=0; items.forEach(it => { const e=this.enrich(it); this.cashFlowEntries(it).forEach(cf => { if (String(cf.date||'').slice(0,7) === k) cost += cf.amount; }); const kk = this.sellDateFor(it) ? String(this.sellDateFor(it)).slice(0,7) : ''; if (kk === k && (e.sold || e.sell > 0)) { sell += e.revenue; profit += e.profit; } }); return { '月份': k, '消费': cost, '卖出': sell, '净支出': cost - sell, '盈亏': profit }; });
    const todoRows = items.map(it => ({ it, rem: this.reminderInfo(it) })).filter(x => x.rem && x.rem.pending).sort((a,b) => a.rem.days - b.rem.days).map(x => ({ '日期': x.rem.date || '', '类型': x.rem.type || '', '名称': x.it.name || this.genName(x.it) || '', '状态': x.it.status || '', '提示': x.rem.text || '' }));
    const sumMap = (keyFn, valFn) => { const m={}; items.forEach(it => { const k=keyFn(it)||'未分类'; m[k]=(m[k]||0)+valFn(it); }); return Object.entries(m).sort((a,b)=>b[1]-a[1]).slice(0,10).map(([name,value],i)=>({'排行':i+1,'名称':name,'数值':value})); };
    const statRows = [
      ...sumMap(it=>it.name, it=>this.enrich(it).cost).map(r=>({...r,'类型':'花费排行'})),
      ...sumMap(it=>it.name, it=>this.enrich(it).qty).map(r=>({...r,'类型':'数量排行'})),
      ...sumMap(it=>it.character, it=>this.enrich(it).qty).map(r=>({...r,'类型':'角色排行'})),
      ...sumMap(it=>(workById[it.workId]||{}).name, it=>this.enrich(it).cost).map(r=>({...r,'类型':'作品排行'}))
    ];
    return { itemRows, saleRows, walletRows, todoRows, statRows };
  }
  excelColNumber(n) { let s = ''; n = Number(n) || 1; while (n > 0) { const m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = Math.floor((n - 1) / 26); } return s; }
  excelImageExt(dataUrl, fallback) {
    const m = String(dataUrl || '').match(/^data:image\/(png|jpe?g|webp|gif);/i);
    if (m) return m[1].toLowerCase().replace('jpg', 'jpeg');
    return (fallback || 'png').toLowerCase().replace('jpg', 'jpeg');
  }
  excelBufferToDataURL(media) {
    if (!media) return '';
    const ext = String(media.extension || 'png').toLowerCase().replace('jpg', 'jpeg');
    let bytes = media.buffer || media.data || media.base64;
    if (!bytes) return '';
    if (typeof bytes === 'string') {
      if (bytes.startsWith('data:image/')) return bytes;
      return 'data:image/' + ext + ';base64,' + bytes;
    }
    const u8 = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
    let bin = '';
    for (let i = 0; i < u8.length; i += 0x8000) bin += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000));
    return 'data:image/' + ext + ';base64,' + btoa(bin);
  }
  excelImagePosition(img) {
    const tl = img && img.range && img.range.tl;
    if (!tl) return { row: 0, col: 0 };
    const row = Number.isFinite(tl.nativeRow) ? tl.nativeRow : Math.floor(Number(tl.row || 0));
    const col = Number.isFinite(tl.nativeCol) ? tl.nativeCol : Math.floor(Number(tl.col || 0));
    return { row, col };
  }
  async makeExcelWorkbook() {
    if (!window.ExcelJS) throw new Error('ExcelJS 未加载，请刷新页面或检查网络后重试');
    const data = await this.buildExcelRows(true);
    const wb = new ExcelJS.Workbook();
    wb.creator = '谷子收纳';
    wb.created = new Date();
    const addSheet = async (name, headers, rows, withImages) => {
      const ws = wb.addWorksheet(name.slice(0, 31));
      ws.addRow(headers);
      ws.getRow(1).font = { bold: true, color: { argb: 'FF251D49' } };
      ws.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEFEAF8' } };
      ws.views = [{ state: 'frozen', ySplit: 1 }];
      ws.autoFilter = { from: 'A1', to: this.excelColNumber(headers.length) + '1' };
      headers.forEach((h, i) => { ws.getColumn(i + 1).width = String(h).startsWith('图片') ? 14 : Math.max(10, Math.min(26, String(h).length + 8)); });
      const imageCols = headers.map((h, i) => String(h).startsWith('图片') ? i + 1 : -1).filter(i => i > 0);
      for (const r of rows || []) {
        const rowIndex = ws.rowCount + 1;
        const vals = headers.map(h => (withImages && String(h).startsWith('图片')) ? '' : (r[h] ?? ''));
        ws.addRow(vals);
        if (withImages) {
          ws.getRow(rowIndex).height = 58;
          for (const c of imageCols) {
            const h = headers[c - 1];
            const dataUrl = r[h];
            if (String(dataUrl || '').startsWith('data:image/')) {
              const imgId = wb.addImage({ base64: dataUrl, extension: this.excelImageExt(dataUrl) });
              ws.addImage(imgId, { tl: { col: c - 1 + 0.12, row: rowIndex - 1 + 0.12 }, ext: { width: 58, height: 58 }, editAs: 'oneCell' });
            }
          }
        }
      }
      ws.eachRow(row => row.eachCell(cell => { cell.alignment = { vertical: 'middle', wrapText: true }; cell.border = { top:{style:'thin', color:{argb:'FFE1DBF0'}}, left:{style:'thin', color:{argb:'FFE1DBF0'}}, bottom:{style:'thin', color:{argb:'FFE1DBF0'}}, right:{style:'thin', color:{argb:'FFE1DBF0'}} }; }));
      return ws;
    };
      const headers = Object.keys(data.itemRows[0] || { '图片1':'', '图片2':'', '图片3':'', '图片4':'', '名称':'', '角色':'', '种类':'', '数量':'' });
    await addSheet('收藏', headers, data.itemRows, true);
    await addSheet('出物', headers, data.saleRows, true);
    await addSheet('钱包', ['月份','消费','卖出','净支出','盈亏'], data.walletRows, false);
    await addSheet('待办', ['日期','类型','名称','状态','提示'], data.todoRows, false);
    await addSheet('统计', ['类型','排行','名称','数值'], data.statRows, false);
    return wb;
  }
  downloadBlob(blob, filename) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2500);
  }
  doExcelExport = async () => {
    try {
      const cn = (this.state.collectorName || '').trim();
      const wb = await this.makeExcelWorkbook();
      const buf = await wb.xlsx.writeBuffer();
      this.downloadBlob(new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), (cn ? cn + '谷子钱包' : '谷子钱包') + '_' + new Date().toISOString().slice(0,10) + '.xlsx');
    } catch (err) { alert('导出 Excel 失败：' + (err && err.message ? err.message : err)); }
  };
  doExcelTemplate = async () => {
    try {
      if (!window.ExcelJS) throw new Error('ExcelJS 未加载，请刷新页面或检查网络后重试');
      const wb = new ExcelJS.Workbook();
      const ws = wb.addWorksheet('收藏');
      const headers = ['图片1','图片2','图片3','图片4','作品系列IP','作品','名称','角色','种类','细分','系列','状态','数量','原价(日元)','买入单价','购买日期','补款金额','补款日期','尾款金额','尾款日期','国内邮费','国内邮费日期','国际邮费','国际邮费日期','其他费用','其他费用日期','卖出单价','卖出日期','平台','渠道','提醒类型','状态日期','所属套装','套装总数','款式编号','备注','编号（请勿修改，用于重新导入时识别更新）'];
      ws.addRow(headers);
      ws.addRow(['可直接在此单元格插入图片，也可留空','','','','默认','默认作品','NOX 吧唧','NOX','吧唧','初版','TV动画','已归家','1','800','150','2026-07-01','','','','','10','2026-07-20','30','2026-07-15','','','','','淘宝','代购','','2026-07-22','','','','示例数据，可直接删除此行','']);
      ws.getRow(1).font = { bold: true };
      ws.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEFEAF8' } };
      ws.getRow(2).height = 58;
      headers.forEach((h, i) => { ws.getColumn(i + 1).width = String(h).startsWith('图片') ? 14 : Math.max(10, Math.min(26, h.length + 8)); });
      ws.views = [{ state: 'frozen', ySplit: 1 }];
      ws.autoFilter = { from: 'A1', to: this.excelColNumber(headers.length) + '1' };
      ws.eachRow(row => row.eachCell(cell => { cell.alignment = { vertical: 'middle', wrapText: true }; }));
      const buf = await wb.xlsx.writeBuffer();
      this.downloadBlob(new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), '谷子收纳_导入模板.xlsx');
    } catch (err) { alert('生成 Excel 模板失败：' + (err && err.message ? err.message : err)); }
  };
  triggerExcelImport = () => { if (this.excelImportRef) this.excelImportRef.click(); };
  excelVal(row, names) { for (const n of names) if (row[n] != null && row[n] !== '') return row[n]; return ''; }
  async saveImageDataURL(v) { const s = String(v || '').trim(); if (!s.startsWith('data:image/')) return null; try { const id = 'img_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6); const blob = this.dataURLToBlob(s); await this.idbPut(id, blob); this.imgUrls[id] = URL.createObjectURL(blob); return id; } catch (e) { return null; } }
  async readExcelRowsAndImages(file) {
    if (window.ExcelJS) {
      const buf = await file.arrayBuffer();
      const wb = new ExcelJS.Workbook();
      await wb.xlsx.load(buf);
      const ws = wb.getWorksheet('收藏') || wb.worksheets[0];
      if (!ws) return [];
      const headers = [];
      ws.getRow(1).eachCell({ includeEmpty: true }, (cell, col) => { headers[col] = String(cell.value == null ? '' : cell.value).trim(); });
      const imageMap = {};
      if (ws.getImages) {
        for (const im of ws.getImages()) {
          const pos = this.excelImagePosition(im);
          const media = wb.getImage ? wb.getImage(im.imageId) : null;
          const dataUrl = this.excelBufferToDataURL(media);
          if (!dataUrl) continue;
          const rowNo = pos.row + 1, colNo = pos.col + 1;
          if (!imageMap[rowNo]) imageMap[rowNo] = {};
          imageMap[rowNo][colNo] = dataUrl;
        }
      }
      const rows = [];
      ws.eachRow({ includeEmpty: false }, (row, rowNo) => {
        if (rowNo === 1) return;
        const obj = {};
        headers.forEach((h, idx) => {
          if (!h) return;
          const cell = row.getCell(idx);
          let v = cell.value;
          if (v && typeof v === 'object') {
            if (v.text) v = v.text;
            else if (v.richText) v = v.richText.map(x => x.text || '').join('');
            else if (v.result != null) v = v.result;
            else if (v.hyperlink) v = v.text || v.hyperlink;
          }
          obj[h] = v == null ? '' : String(v);
        });
        for (const [colNo, dataUrl] of Object.entries(imageMap[rowNo] || {})) {
          const h = headers[Number(colNo)] || ('图片' + colNo);
          if (String(h).startsWith('图片')) obj[h] = dataUrl;
        }
        if (Object.values(obj).some(v => String(v || '').trim())) rows.push(obj);
      });
      return rows;
    }
    if (!window.XLSX) throw new Error('Excel 解析库未加载，请刷新后重试');
    const buf = await file.arrayBuffer();
    const wb = XLSX.read(buf, { type:'array', cellDates:false });
    const ws = wb.Sheets['收藏'] || wb.Sheets[wb.SheetNames[0]];
    return XLSX.utils.sheet_to_json(ws, { defval:'' });
  }
  onExcelImportFile = async (e) => {
    const f = e.target.files && e.target.files[0]; if (!f) return;
    try {
      const rows = await this.readExcelRowsAndImages(f);
      if (!rows.length) { alert('Excel 里没有可导入的数据'); e.target.value=''; return; }
      if (!confirm('将从 Excel 导入 ' + rows.length + ' 条收藏，是否继续？')) { e.target.value=''; return; }
      const workByName = Object.fromEntries((this.state.works || []).map(w => [w.name, w]));
      const newItems = [];
      const updateMap = {};
      const existingItemIds = new Set((this.state.items || []).map(it => it.id));
      for (const r of rows) {
        const name = String(this.excelVal(r, ['名称','商品名称','谷子名称']) || '').trim();
        if (!name) continue;
        const workName = String(this.excelVal(r, ['作品','IP']) || '').trim();
        const workId = (workName && workByName[workName]) ? workByName[workName].id : this.state.currentWorkId;
        const img1 = await this.saveImageDataURL(this.excelVal(r, ['图片1','图片','封面']));
        const img2 = await this.saveImageDataURL(this.excelVal(r, ['图片2']));
        const img3 = await this.saveImageDataURL(this.excelVal(r, ['图片3']));
        const img4 = await this.saveImageDataURL(this.excelVal(r, ['图片4']));
        const existingId = String(this.excelVal(r, ['编号（请勿修改，用于重新导入时识别更新）','编号']) || '').trim();
        const fields = { workId, name,
          character:String(this.excelVal(r,['角色'])||''), type:String(this.excelVal(r,['种类','类型'])||''), subtype:String(this.excelVal(r,['细分','款式'])||''), series:String(this.excelVal(r,['系列'])||''), status:String(this.excelVal(r,['状态'])||'已归家'), qty:String(this.excelVal(r,['数量'])||'1'), originalPrice:String(this.excelVal(r,['原价(日元)','原价'])||''), buyPrice:String(this.excelVal(r,['买入单价','买入价'])||''), supplementPrice:String(this.excelVal(r,['补款金额','补款'])||''), supplementPriceDate:String(this.excelVal(r,['补款日期'])||''), finalPrice:String(this.excelVal(r,['尾款金额','尾款'])||''), finalPriceDate:String(this.excelVal(r,['尾款日期'])||''), shipDom:String(this.excelVal(r,['国内邮费'])||''), shipDomDate:String(this.excelVal(r,['国内邮费日期'])||''), shipIntl:String(this.excelVal(r,['国际邮费'])||''), shipIntlDate:String(this.excelVal(r,['国际邮费日期'])||''), otherFee:String(this.excelVal(r,['其他费用'])||''), otherFeeDate:String(this.excelVal(r,['其他费用日期'])||''), sellPrice:String(this.excelVal(r,['卖出单价','卖出价'])||''), sellDate:String(this.excelVal(r,['卖出日期'])||''), channel:String(this.excelVal(r,['平台','购买平台'])||''), purchaseChannel:String(this.excelVal(r,['渠道','购买渠道'])||''), buyDate:String(this.excelVal(r,['购买日期','日期'])||''), reminderType:String(this.excelVal(r,['提醒类型'])||''), reminderDate:String(this.excelVal(r,['状态日期'])||''), setName:String(this.excelVal(r,['所属套装','套装'])||''), setTotal:String(this.excelVal(r,['套装总数'])||''), setVariant:String(this.excelVal(r,['款式编号','款式'])||''), note:String(this.excelVal(r,['备注'])||'') };
        const eventDate = fields.reminderDate || fields.buyDate || this.todayStr();
        if (this.num(fields.supplementPrice) > 0 && !fields.supplementPriceDate) fields.supplementPriceDate = eventDate;
        if (this.num(fields.finalPrice) > 0 && !fields.finalPriceDate) fields.finalPriceDate = eventDate;
        if (this.num(fields.shipDom) > 0 && !fields.shipDomDate) fields.shipDomDate = eventDate;
        if (this.num(fields.shipIntl) > 0 && !fields.shipIntlDate) fields.shipIntlDate = eventDate;
        if (this.num(fields.otherFee) > 0 && !fields.otherFeeDate) fields.otherFeeDate = eventDate;
        if (this.num(fields.sellPrice) > 0 && !fields.sellDate) fields.sellDate = eventDate;
        if (fields.status && eventDate) fields.statusLog = this.statusLogWith([], fields.status, eventDate);
        if (img1) fields.imageId = img1; if (img2) fields.imageId2 = img2; if (img3) fields.imageId3 = img3; if (img4) fields.imageId4 = img4;
        if (existingId && existingItemIds.has(existingId)) {
          updateMap[existingId] = fields;
        } else {
          newItems.push({ ...this.emptyDraft(), id:'it_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6), imageId: img1, imageId2: img2, imageId3: img3, imageId4: img4, ...fields });
        }
      }
      const updatedCount = Object.keys(updateMap).length;
      if (!newItems.length && !updatedCount) { alert('没有找到可导入的收藏行'); e.target.value=''; return; }
      const mergedItems = (this.state.items || []).map(it => updateMap[it.id] ? { ...it, ...updateMap[it.id] } : it);
      this.commit([...newItems, ...mergedItems]);
      const parts = []; if (newItems.length) parts.push('新增 ' + newItems.length + ' 条'); if (updatedCount) parts.push('更新 ' + updatedCount + ' 条');
      alert('已' + parts.join('、') + '收藏。');
    } catch (err) { alert('导入 Excel 失败：' + (err && err.message ? err.message : err)); }
    e.target.value = '';
  };

  // ---- export / import ----
  async buildShippingBackup() {
    const localMeta = this.loadLocalShippingMeta();
    const localById = Object.fromEntries(localMeta.filter(x => x && x.id).map(x => [x.id, x]));
    const records = [];
    const seen = new Set();
    const sources = [...(this.state.shippingRecords || [])];
    for (const m of localMeta) {
      if (m && m.id && !sources.some(r => r && r.id === m.id)) sources.push({ ...m, local: true, images: m.imgs || [] });
    }
    let missingImages = 0;
    for (const r of sources) {
      if (!r || !r.id || seen.has(r.id)) continue;
      seen.add(r.id);
      const lm = localById[r.id];
      const imageSources = lm ? (lm.imgs || []) : (r.images || []);
      const images = [];
      for (const im of imageSources) {
        let dataUrl = '';
        const localId = im.localId || (lm && im.id) || '';
        try {
          let blob = localId ? await this.idbGet(localId) : null;
          if (!blob && im.image) {
            const response = await fetch(im.image, { cache: 'no-store' });
            if (!response.ok) throw new Error('HTTP ' + response.status);
            blob = await response.blob();
          }
          if (blob) dataUrl = await this.blobToDataURL(blob);
        } catch (e) { console.warn('备份排发图片失败', im && (im.filename || im.id), e); }
        if (!dataUrl) missingImages++;
        images.push({ role: im.role || '其他附件', filename: im.filename || '图片', mimeType: im.mimeType || '', dataUrl, sourceUrl: im.image || im.sourceUrl || '' });
      }
      records.push({
        backupId: r.id, group: r.group || '', cn: r.cn || '', type: r.type || '补充资料',
        title: r.title || '', note: r.note || '', itemIds: [...new Set(r.itemIds || [])],
        createdAt: r.createdAt || Date.now(), updatedAt: r.updatedAt || r.createdAt || Date.now(), images
      });
    }
    return { version: 1, records, batches: this.state.shippingBatches || [], missingImages };
  }
  async restoreShippingBackup(shipping) {
    if (!shipping || !Array.isArray(shipping.records)) return { records: 0, images: 0, missingImages: 0 };
    const meta = [];
    let imageCount = 0, missingImages = 0;
    for (let ri = 0; ri < shipping.records.length; ri++) {
      const r = shipping.records[ri] || {};
      const now = Date.now();
      const imgs = [];
      for (let ii = 0; ii < (r.images || []).length; ii++) {
        const im = r.images[ii] || {};
        const id = 'shipimg_' + now + '_' + ri + '_' + ii + '_' + Math.random().toString(36).slice(2, 6);
        if (im.dataUrl) {
          try { await this.idbPut(id, this.dataURLToBlob(im.dataUrl)); imageCount++; }
          catch (e) { missingImages++; continue; }
        } else { missingImages++; continue; }
        imgs.push({ id, role: im.role || '其他附件', filename: im.filename || '图片' });
      }
      meta.push({
        id: 'shiploc_' + now + '_' + ri + '_' + Math.random().toString(36).slice(2, 6),
        group: r.group || '', cn: r.cn || '', type: r.type || '补充资料', title: r.title || '', note: r.note || '',
        itemIds: [...new Set(r.itemIds || [])], createdAt: r.createdAt || now, imgs
      });
    }
    this.persistLocalShippingMeta(meta);
    return { records: meta.length, images: imageCount, missingImages };
  }
  doExport = async () => {
    const images = {};
    for (const it of this.state.items) { for (const id of [it.imageId, it.imageId2, it.imageId3, it.imageId4, it.swapImageId]) { if (id) { try { const b = await this.idbGet(id); if (b) images[id] = await this.blobToDataURL(b); } catch (e) {} } } }
    this.ensureCharImg();
    const charAvatars = {};
    for (const name in this.charImgIds) { try { const b = await this.idbGet(this.charImgIds[name]); if (b) charAvatars[name] = await this.blobToDataURL(b); } catch (e) {} }
    const lsDump = {}; const allWorks = this.state.works || [];
    ['zzz_char_order', 'zzz_types', 'zzz_series', 'zzz_channels', 'zzz_purchase_channels', 'zzz_form_order', 'zzz_acquire_order', 'zzz_reminder_types', 'zzz_hidden_types', 'zzz_hidden_channels', 'zzz_hidden_purchase_channels'].forEach(base => { allWorks.forEach(w => { const k = w.id === this.MAIN_WORK ? base : base + '__' + w.id; const v = localStorage.getItem(k); if (v != null) lsDump[k] = v; }); });
    const meta = { charOrder: this.state.charOrder, typesList: this.state.typesList, seriesList: this.state.seriesList, channels: this.state.channels, purchaseChannels: this.state.purchaseChannels, formOrder: this.state.formOrder, acquireOrder: this.state.acquireOrder, reminderTypes: this.state.reminderTypes, hiddenTypes: this.state.hiddenTypes, hiddenChannels: this.state.hiddenChannels, hiddenPurchaseChannels: this.state.hiddenPurchaseChannels, charAssetMap: this.charAssetMap, title: this.state.title, subtitle: this.state.subtitle, footer: this.state.footer, works: allWorks, currentWorkId: this.state.currentWorkId, workGroupLabel: this.state.workGroupLabel, collectorName: this.state.collectorName, currency: this.state.currency, accent: this.state.accent, nameStyleMode: this.state.nameStyleMode, displayMode: this.state.displayMode, lsDump };
    let logo = null; try { const lb = await this.idbGet('zzz_logo'); if (lb) logo = await this.blobToDataURL(lb); } catch (e) {}
    const shipping = await this.buildShippingBackup();
    const payload = { v: 3, exportedAt: new Date().toISOString(), items: this.state.items, images, meta, charAvatars, logo, shipping };
    const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
    const cn = (this.state.collectorName || '').trim();
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = (cn ? cn + '谷子备份' : '谷子备份') + '_' + new Date().toISOString().slice(0, 10) + '.json'; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    if (shipping.missingImages) alert('备份已导出，包含 ' + shipping.records.length + ' 份排发资料；其中 ' + shipping.missingImages + ' 张云端图片因网络或跨域限制未能写入，请保留云端原件。');
  };
  triggerImport = () => { if (this.importRef) this.importRef.click(); };
  onImportFile = async (e) => {
    const f = e.target.files && e.target.files[0]; if (!f) return;
    try {
      const data = JSON.parse(await f.text());
      if (!confirm('导入备份将替换当前所有数据，确定继续？')) { e.target.value = ''; return; }
      if (data.images) { for (const k in data.images) { try { const blob = this.dataURLToBlob(data.images[k]); await this.idbPut(k, blob); this.imgUrls[k] = URL.createObjectURL(blob); } catch (er) {} } }
      const ns = {};
      const m = data.meta || {};
      const put = (k, v) => { if (v !== undefined && v !== null) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} } };
      put('zzz_char_order', m.charOrder); put('zzz_types', m.typesList); put('zzz_series', m.seriesList); put('zzz_channels', m.channels); put('zzz_purchase_channels', m.purchaseChannels); put('zzz_form_order', m.formOrder); put('zzz_acquire_order', m.acquireOrder); put('zzz_reminder_types', m.reminderTypes); put('zzz_hidden_types', m.hiddenTypes); put('zzz_hidden_channels', m.hiddenChannels); put('zzz_hidden_purchase_channels', m.hiddenPurchaseChannels);
      this.ensureCharImg();
      if (m.charAssetMap) { this.charAssetMap = m.charAssetMap; }
      if (data.charAvatars) { this.charImgIds = this.charImgIds || {}; for (const name in data.charAvatars) { try { const blob = this.dataURLToBlob(data.charAvatars[name]); const id = 'img_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6); await this.idbPut(id, blob); this.charImgIds[name] = id; this.charImgMap[name] = URL.createObjectURL(blob); } catch (e) {} } }
      this.charImgMap = { ...this.CHAR_IMG, ...this.charAssetMap, ...this.charImgMap };
      this.persistCharMaps();
      if (m.charOrder) ns.charOrder = m.charOrder; if (m.typesList) ns.typesList = m.typesList; if (m.seriesList) ns.seriesList = m.seriesList; if (m.channels) ns.channels = m.channels; if (m.purchaseChannels) ns.purchaseChannels = m.purchaseChannels; if (m.formOrder) ns.formOrder = m.formOrder; if (m.acquireOrder) ns.acquireOrder = m.acquireOrder; if (m.reminderTypes) ns.reminderTypes = m.reminderTypes; if (m.hiddenTypes) ns.hiddenTypes = m.hiddenTypes; if (m.hiddenChannels) ns.hiddenChannels = m.hiddenChannels; if (m.hiddenPurchaseChannels) ns.hiddenPurchaseChannels = m.hiddenPurchaseChannels;
      if (m.title) { put('zzz_title', m.title); ns.title = m.title; } if (m.subtitle !== undefined) { put('zzz_subtitle', m.subtitle); ns.subtitle = m.subtitle; } if (m.footer !== undefined) { put('zzz_footer', m.footer); ns.footer = m.footer; }
      if (data.logo) { try { const lb = this.dataURLToBlob(data.logo); await this.idbPut('zzz_logo', lb); this.logoUrl = URL.createObjectURL(lb); } catch (e) {} }
      const shippingResult = await this.restoreShippingBackup(data.shipping);
      // 作品 / 系列IP + 每作品的列表 + 设置
      if (m.lsDump) { for (const k in m.lsDump) { try { localStorage.setItem(k, m.lsDump[k]); } catch (e) {} } }
      if (Array.isArray(m.works) && m.works.length) { try { localStorage.setItem('zzz_works', JSON.stringify(m.works)); } catch (e) {} ns.works = m.works; }
      if (m.currentWorkId) { try { localStorage.setItem('zzz_current_work', m.currentWorkId); } catch (e) {} ns.currentWorkId = m.currentWorkId; }
      if (m.workGroupLabel) { try { localStorage.setItem('zzz_work_group_label', m.workGroupLabel); } catch (e) {} ns.workGroupLabel = m.workGroupLabel; }
      if (m.collectorName !== undefined) { try { localStorage.setItem('zzz_cn', m.collectorName || ''); } catch (e) {} ns.collectorName = m.collectorName || ''; }
      if (m.currency !== undefined) { try { localStorage.setItem('zzz_currency', m.currency || ''); } catch (e) {} ns.currency = m.currency || ''; } if (m.nameStyleMode !== undefined) { try { localStorage.setItem('zzz_name_style', m.nameStyleMode || 'default'); } catch(e) {} ns.nameStyleMode = m.nameStyleMode || 'default'; } if (m.displayMode !== undefined) { try { localStorage.setItem('zzz_display_mode', m.displayMode || 'standard'); } catch(e) {} ns.displayMode = m.displayMode || 'standard'; }
      if (m.accent !== undefined) { try { localStorage.setItem('zzz_accent', m.accent || ''); } catch (e) {} ns.accent = m.accent || ''; }
      const wid = m.currentWorkId || this.state.currentWorkId;
      const importItems = data.items || [];
      const freshLists = this.loadWorkLists(wid, importItems); Object.assign(ns, freshLists); this.charOrder = freshLists.charOrder;
      this.setState(ns);
      this.commit(importItems);
      if (shippingResult.records) {
        if (this.shippingSyncCode()) {
          alert('备份已导入，并恢复 ' + shippingResult.records + ' 份排发资料、' + shippingResult.images + ' 张图片到本机。当前已登录云端账号，可在「账号云端」点击“合并云端与本机”上传这些资料。');
        } else {
          await this.loadLocalShipping();
          alert('备份已导入，并恢复 ' + shippingResult.records + ' 份排发资料、' + shippingResult.images + ' 张图片。');
        }
      }
    } catch (err) { alert('导入失败：文件格式不正确'); }
    e.target.value = '';
  };


  // ---- batch edit helpers ----
  toggleBatchMode = () => {
    const view = this.state.view || this.props.startView || 'dashboard';
    if (view === 'ledger') return;
    const nextMode = !this.state.batchMode;
    this.setState({ batchMode: nextMode, selectedIds: nextMode ? (this.state.selectedIds || []) : [] });
  };
  toggleBatchId = (id, checked) => {
    const set = new Set(this.state.selectedIds || []);
    if (checked) set.add(id); else set.delete(id);
    this.setState({ selectedIds: Array.from(set) });
  };
  batchVisibleIds() {
    const ids = (this._lastVisibleIds || []).filter(Boolean);
    if (ids.length) return ids;
    const cur = this.state.currentWorkId || this.MAIN_WORK;
    return (this.state.items || [])
      .filter(it => cur === this.ALL_WORKS || (it.workId || this.MAIN_WORK) === cur)
      .map(it => it.id)
      .filter(Boolean);
  }
  batchSelectVisible = () => this.setState({ selectedIds: Array.from(new Set([...(this.state.selectedIds || []), ...this.batchVisibleIds()])) });
  batchClear = () => this.setState({ selectedIds: [] });
  batchIdsOrWarn() { const ids = (this.state.selectedIds || []).filter(id => (this.state.items || []).some(x => x.id === id)); if (!ids.length) { alert('请先选择要批量编辑的谷子'); return null; } return ids; }
  batchApply(ids, updater) { const idSet = new Set(ids || []); const items = (this.state.items || []).map(it => idSet.has(it.id) ? updater(it) : it); this.commit(items); this.setState({ selectedIds: Array.from(idSet), batchMode: true }); }
  openBatchEditor = () => { const ids = this.batchIdsOrWarn(); if (!ids) return; this.setState({ batchEditOpen: true, batchEditField: '' }); };
  closeBatchEditor = () => this.setState({ batchEditOpen: false, batchEditField: '' });
  batchEditBack = () => this.setState({ batchEditField: '' });
  chooseBatchField = (field) => this.setState({ batchEditField: field });
  batchFieldDefs(){
    // 批量修改只按当前内置字段生成，不再读取历史隐藏/旧字段配置。
    // 字段名称仍通过 flabel() 读取设置里的改名，保证显示名称同步。
    const bOn = (k) => (this.state.batchOn || {})[k] !== false;
    const keep = (f) => {
      const control = f.batchKey || null;
      if (!control) return true;
      if (['character','type','series','acquire','channel','purchaseChannel','form'].includes(control) && !this.isFieldVisible(control)) return false;
      return bOn(control);
    };
    return [
      { key:'status', label:this.flabel('status'), type:'statusDate', batchKey:'status' },
      { key:'buyDate', label:'购买日期', type:'date' },
      { key:'character', label:this.flabel('character'), type:'select', batchKey:'character' },
      { key:'type', label:this.flabel('type'), type:'select', batchKey:'type' },
      { key:'series', label:this.flabel('series'), type:'select', batchKey:'series' },
      { key:'buyPrice', label:'买入价', type:'number' },
      { key:'supplementPrice', label:'补款金额', type:'number' },
      { key:'finalPrice', label:'尾款金额', type:'number' },
      { key:'sellPrice', label:'卖出价', type:'number' },
      { key:'acquire', label:this.flabel('acquire'), type:'select', batchKey:'acquire' },
      { key:'method', label:this.flabel('method'), type:'select', batchKey:'method' },
      { key:'channel', label:this.flabel('channel'), type:'select', batchKey:'channel' },
      { key:'purchaseChannel', label:this.flabel('purchaseChannel'), type:'select', batchKey:'purchaseChannel' },
      { key:'form', label:this.flabel('form'), type:'select', batchKey:'form' },
      { key:'setId', label:this.flabel('set'), type:'select', batchKey:'set' },
      { key:'shipDom', label:'国内邮费', type:'number' },
      { key:'shipIntl', label:'国际邮费', type:'number' },
      { key:'otherFee', label:'其他费用', type:'number' }
    ].filter(keep);
  }
  batchFieldDef(field){ return this.batchFieldDefs().find(f => f.key === field) || null; }
  batchFieldLabel(field){ const d = this.batchFieldDef(field); return d ? d.label : field; }
  batchMoneyDateField(field) {
    return {
      buyPrice: 'buyDate',
      supplementPrice: 'supplementPriceDate',
      finalPrice: 'finalPriceDate',
      shipDom: 'shipDomDate',
      shipIntl: 'shipIntlDate',
      otherFee: 'otherFeeDate',
      sellPrice: 'sellDate'
    }[field] || '';
  }
  batchPromptMoneyDate(label) {
    const today = this.todayStr();
    const d = prompt('输入「' + label + '」发生日期（YYYY-MM-DD，留空用今天）', today);
    if (d === null) return null;
    return (d.trim() || today);
  }
  batchSelectValues(field){
    const uniq = (arr) => [...new Set((arr || []).filter(v => v !== undefined && v !== null).map(v => String(v)).filter(v => v !== ''))];
    const currentWork = this.state.currentWorkId || this.MAIN_WORK;
    const sourceList = uniq((this.state.acquireOrder && this.state.acquireOrder.length) ? this.state.acquireOrder : ['日谷','国谷','同人']);
    const hiddenChannels = this.state.hiddenChannels || [];
    const hiddenPurchase = this.state.hiddenPurchaseChannels || [];
    // 购买方式：跟新建表单一致——用自定义列表，去掉已隐藏的
    const hiddenMethods = this.state.hiddenMethods || [];
    const methodBase = (this.state.methodList && this.state.methodList.length) ? this.state.methodList : [].concat(...Object.values(this.SOURCE_METHODS || {}));
    const methodList = uniq(methodBase).filter(x => !hiddenMethods.includes(x));
    // 平台：自定义 channels + 各来源内置平台，去掉已隐藏的
    const platformList = uniq([].concat(...Object.values(this.SOURCE_PLATFORMS || {}), this.state.channels || [])).filter(x => !hiddenChannels.includes(x));
    // 渠道：自定义列表，去掉已隐藏的
    const purchaseList = uniq((this.state.purchaseChannels && this.state.purchaseChannels.length) ? this.state.purchaseChannels : this.CHANNELS).filter(x => !hiddenPurchase.includes(x));
    const setIds = (this.state.sets || []).filter(st => currentWork === this.ALL_WORKS || (st.workId || this.MAIN_WORK) === currentWork).map(st => st.id);
    const m = {
      status: (this.state.statusList && this.state.statusList.length) ? this.state.statusList : this.STATUSES,
      character: this.orderedChars(),
      type: (this.state.typesList && this.state.typesList.length) ? this.state.typesList : this.TYPES,
      form: (this.state.formOrder && this.state.formOrder.length) ? this.state.formOrder : this.FORMS,
      series: this.state.seriesList || [],
      acquire: sourceList,
      method: methodList,
      channel: platformList,
      purchaseChannel: purchaseList,
      reminderType: (this.state.reminderTypes && this.state.reminderTypes.length) ? this.state.reminderTypes : this.REMINDER_TYPES,
      setId: setIds,
      lifecycle: ['已归家','空气谷','已出物'],
    };
    return m[field] || [];
  }
  batchEditOptionsFor(field){
    const def = this.batchFieldDef(field);
    if (!def) return [];
    if (def.type === 'select') {
      return [''].concat(this.batchSelectValues(field)).map(v => {
        const st = field === 'setId' ? this.setById(v) : null;
        return { label: field === 'setId' ? (st ? st.name : '清空') : (v || '清空'), onClick: () => this.applyBatchField(field, v) };
      });
    }
    if (def.type === 'statusDate') {
      return this.batchSelectValues('status').map(v => ({ label: v, onClick: () => {
        const today = new Date().toISOString().slice(0, 10);
        const d = prompt('输入「' + v + '」的' + this.statusDateLabel(v) + '（YYYY-MM-DD，留空用今天）', today);
        if (d === null) return;
        this.applyBatchStatusWithDate(v, (d.trim() || today));
      } }));
    }
    if (def.type === 'date') {
      return [{ label:'输入日期', onClick: () => { const v = prompt('输入' + def.label + '（YYYY-MM-DD，留空清除）','') || ''; this.applyBatchField(field, v.trim()); } }, { label:'清空日期', onClick: () => this.applyBatchField(field, '') }];
    }
    if (def.type === 'number') {
      const ids = this.state.selectedIds || [];
      const hasDate = !!this.batchMoneyDateField(field);
      return [
        { label:'输入' + def.label, onClick: () => { const v = prompt('输入新的' + def.label,''); if (v === null) return; const val = v.trim(); const date = (hasDate && this.num(val) > 0) ? this.batchPromptMoneyDate(def.label) : ''; if (date === null) return; this.applyBatchField(field, val, date); } },
        { label:'均摊到每件（共 ' + ids.length + ' 件）', onClick: () => { const v = prompt('输入总金额，将平均分摊到已选中的 ' + ids.length + ' 件谷子的「' + def.label + '」',''); if (v === null || v.trim() === '') return; const date = hasDate ? this.batchPromptMoneyDate(def.label) : ''; if (date === null) return; this.applyBatchFieldSplit(field, v.trim(), date); } },
        { label:'清空', onClick: () => this.applyBatchField(field, '') }
      ];
    }
    return [{ label:'输入' + def.label, onClick: () => { const v = prompt('输入新的' + def.label,'') || ''; this.applyBatchField(field, v.trim()); } }, { label:'清空', onClick: () => this.applyBatchField(field, '') }];
  }
  applyBatchFieldSplit = (field, totalValue, dateOverride = '') => {
    const ids = this.batchIdsOrWarn(); if (!ids) return;
    const def = this.batchFieldDef(field); if (!def) return;
    const total = this.num(totalValue);
    if (!(total >= 0)) { alert('请输入有效的总金额'); return; }
    const per = Math.round((total / ids.length) * 100) / 100;
    if (!confirm('确认把总金额 ' + total + ' 平均分摊到 ' + ids.length + ' 件谷子的「' + def.label + '」，每件约 ' + per + '？')) return;
    this.batchApply(ids, it => {
      const next = { ...it, [field]: String(per) };
      const dateKey = this.batchMoneyDateField(field);
      if (dateKey) next[dateKey] = dateOverride || this.eventDateFor(it);
      return next;
    });
  };
  applyBatchStatusWithDate = (status, date) => {
    const ids = this.batchIdsOrWarn(); if (!ids) return;
    if (!status) return;
    if (!confirm('确认把 ' + ids.length + ' 件谷子的「状态」改成「' + status + '」，并记录日期「' + date + '」？')) return;
    this.batchApply(ids, it => {
      const next = { ...it, status, reminderDate: date, statusLog: this.statusLogWith(it.statusLog, status, date) };
      if (status === '已下单') next.buyDate = date;
      if (status === '已补款' && this.num(it.supplementPrice) > 0) next.supplementPriceDate = date;
      if (status === '已尾款' && this.num(it.finalPrice) > 0) next.finalPriceDate = date;
      if (String(status || '').includes('出') && this.num(it.sellPrice) > 0) next.sellDate = date;
      return next;
    });
    this.closeBatchEditor();
  };
  applyBatchField = (field, value, dateOverride = '') => {
    const ids = this.batchIdsOrWarn(); if (!ids) return;
    const def = this.batchFieldDef(field); if (!def) return;
    const label = def.label || field;
    let showValue = value || '空';
    if (field === 'setId' && value) { const st = this.setById(value); showValue = st ? st.name : value; }
    if (!confirm('确认把 ' + ids.length + ' 件谷子的「' + label + '」改成「' + showValue + '」？')) return;
    if (field === 'lifecycle') {
      const statusMap = { '已归家': '已归家', '空气谷': '已下单', '已出物': '已出物' };
      const today = new Date().toISOString().slice(0, 10);
      this.batchApply(ids, it => {
        const st = value ? (statusMap[value] || value) : '';
        if (!st || it.status === st) return { ...it, status: st };
        const log = Array.isArray(it.statusLog) ? [...it.statusLog] : [];
        log.push({ status: st, date: today, ts: Date.now() });
        return { ...it, status: st, statusLog: log };
      });
    } else if (field === 'status') {
      const today = new Date().toISOString().slice(0, 10);
      this.batchApply(ids, it => {
        if (!value) return { ...it, status: value };
        const next = { ...it, status: value, reminderDate: today, statusLog: this.statusLogWith(it.statusLog, value, today) };
        if (value === '已下单') next.buyDate = today;
        if (value === '已补款' && this.num(it.supplementPrice) > 0) next.supplementPriceDate = today;
        if (value === '已尾款' && this.num(it.finalPrice) > 0) next.finalPriceDate = today;
        if (String(value || '').includes('出') && this.num(it.sellPrice) > 0) next.sellDate = today;
        return next;
      });
    } else if (field === 'reminderDate') {
      this.batchApply(ids, it => {
        const next = { ...it, reminderDate: value };
        if (value && it.status) next.statusLog = this.statusLogWith(it.statusLog, it.status, value);
        if (it.status === '已下单') next.buyDate = value;
        if (it.status === '已补款' && this.num(it.supplementPrice) > 0) next.supplementPriceDate = value;
        if (it.status === '已尾款' && this.num(it.finalPrice) > 0) next.finalPriceDate = value;
        if (String(it.status || '').includes('出') && this.num(it.sellPrice) > 0) next.sellDate = value;
        return next;
      });
    } else if (field === 'setId') {
      const st = this.setById(value);
      this.batchApply(ids, it => ({ ...it, setId: value || '', setName: st ? st.name : '', setTotal: st ? (st.total || '') : '', setVariant: '' }));
    } else if (field === 'acquire') {
      this.batchApply(ids, it => {
        const next = { ...it, acquire: value };
        const okMethods = this.SOURCE_METHODS[value] || [];
        const okPlatforms = this.SOURCE_PLATFORMS[value] || [];
        if (next.method && okMethods.length && !okMethods.includes(next.method)) next.method = '';
        if (next.channel && okPlatforms.length && !okPlatforms.includes(next.channel)) next.channel = '';
        return next;
      });
    } else if (field === 'method') {
      this.batchApply(ids, it => ({ ...it, method: value, gachaResult: value === '盲抽' ? (it.gachaResult || '自抽') : '' }));
    } else if (field === 'buyDate') {
      this.batchApply(ids, it => {
        const next = { ...it, buyDate: value };
        if (it.status === '已下单' && value) next.statusLog = this.statusLogWith(it.statusLog, '已下单', value);
        return next;
      });
    } else if (field === 'buyPrice' || field === 'shipDom' || field === 'shipIntl' || field === 'otherFee' || field === 'supplementPrice' || field === 'finalPrice' || field === 'sellPrice') {
      this.batchApply(ids, it => {
        const next = { ...it, [field]: value };
        const dateKey = this.batchMoneyDateField(field);
        if (dateKey === 'buyDate') {
          if (this.num(value) > 0 && dateOverride) next.buyDate = dateOverride;
        } else if (dateKey) {
          next[dateKey] = this.num(value) > 0 ? (dateOverride || this.eventDateFor(it)) : '';
        }
        return next;
      });
    } else if (def.customKey) {
      this.batchApply(ids, it => ({ ...it, custom: { ...(it.custom || {}), [def.customKey]: value } }));
    } else {
      this.batchApply(ids, it => ({ ...it, [field]: value }));
    }
    this.closeBatchEditor();
  };
  batchEditStatus = () => this.chooseBatchField('status');
  batchEditReminder = () => this.chooseBatchField('reminderType');
  batchEditField = () => this.openBatchEditor();
  batchQtyPlus = () => { const ids = this.batchIdsOrWarn(); if (!ids) return; this.batchApply(ids, it => ({ ...it, qty: Math.max(1, parseInt(it.qty) || 1) + 1 })); };
  batchDelete = () => { const ids = this.batchIdsOrWarn(); if (!ids) return; if (!confirm('确定批量删除 ' + ids.length + ' 件谷子？')) return; const set = new Set(ids); this.commit((this.state.items || []).filter(it => !set.has(it.id))); this.setState({ selectedIds: [] }); };

  // ---- view setters ----
  setDashboard = () => this.setState({ view: 'dashboard', batchMode: false, selectedIds: [] });
  openDashboardStatus = (status) => this.setState({ view: 'gallery', group: 'all', statusSel: status ? [status] : [], filtersOpen: true, batchMode: false, selectedIds: [] });
  setTable = () => this.setState({ view: 'table' });
  tableColumnDefs() {
    return [
      { key: 'image', label: '图片', width: '64px' },
      { key: 'name', label: '名称', width: '220px', locked: true },
      { key: 'character', label: '角色', width: '150px' },
      { key: 'type', label: '种类', width: '220px' },
      { key: 'group', label: '分组', width: '90px' },
      { key: 'status', label: '状态', width: '90px' },
      { key: 'qty', label: '数量', width: '64px' },
      { key: 'original', label: '原价', width: '100px' },
      { key: 'buy', label: '买入价', width: '100px' },
      { key: 'ship', label: '邮费', width: '118px' },
      { key: 'sell', label: '卖出价', width: '100px' },
      { key: 'profit', label: '盈亏', width: '100px' },
      { key: 'channel', label: '平台', width: '130px' },
      { key: 'purchaseChannel', label: '渠道', width: '120px' },
      { key: 'date', label: '日期', width: '120px' },
      { key: 'actions', label: '操作', width: '110px', locked: true }
    ];
  }
  tableColumnVisible(key) { const def = this.tableColumnDefs().find(c => c.key === key); return !!(def && def.locked) || !(this.state.tableHiddenCols || []).includes(key); }
  toggleTableColumnMenu = () => this.setState(s => ({ tableColumnMenuOpen: !s.tableColumnMenuOpen }));
  toggleTableColumn = (key) => {
    const def = this.tableColumnDefs().find(c => c.key === key);
    if (def && def.locked) return;
    this.setState(s => {
      const hidden = new Set(s.tableHiddenCols || []);
      if (hidden.has(key)) hidden.delete(key); else hidden.add(key);
      const tableHiddenCols = Array.from(hidden);
      try { localStorage.setItem('zzz_table_hidden_cols', JSON.stringify(tableHiddenCols)); } catch (e) {}
      return { tableHiddenCols };
    });
  };
  resetTableColumns = () => { try { localStorage.removeItem('zzz_table_hidden_cols'); } catch (e) {} this.setState({ tableHiddenCols: [], tableColumnMenuOpen: false }); };
  setLedgerRange = (range) => this.setState({ ledgerMode: range || 'month', ledgerRange: range || 'month' });
  setLedgerMode = (mode) => this.setState({ ledgerMode: mode || 'month', ledgerRange: mode || 'month' });
  onLedgerPieBy = (e) => this.setState({ ledgerPieBy: e.target.value || 'character', ledgerPieActive: 0 });
  setLedgerPieBy = (v) => this.setState({ ledgerPieBy: v || 'character', ledgerPieActive: 0 });
  onLedgerYear = (e) => this.setState({ ledgerYear: e.target.value });
  onLedgerMonth = (e) => this.setState({ ledgerMonth: e.target.value });
  onLedgerWeek = (e) => this.setState({ ledgerWeek: e.target.value });
  pickLedgerBar = (i) => () => this.setState(s => ({ ledgerActiveBar: s.ledgerActiveBar === i ? null : i }));
  openLedgerYearSelect = (ev) => { const yrs = this._ledgerYearOpts || []; this.openGenericSelect('选择年份', yrs.map(y => ({ value: y, label: y + '年' })), this.state.ledgerYear, (v) => this.setState({ ledgerYear: v }), ev); };
  openLedgerMonthSelect = (ev) => { this.openGenericSelect('选择月份', Array.from({length:12},(_,i)=>({ value:String(i+1), label:(i+1)+'月' })), this.state.ledgerMonth, (v) => this.setState({ ledgerMonth: v }), ev); };
  openLedgerWeekSelect = (ev) => { const wks = this._ledgerWeekOpts || []; this.openGenericSelect('选择周', wks, this.state.ledgerWeek, (v) => this.setState({ ledgerWeek: v }), ev); };
  ledgerDateRange(range) {
    const now = new Date();
    const mode = this.state.ledgerMode || range || 'month';
    const year = parseInt(this.state.ledgerYear || now.getFullYear(), 10) || now.getFullYear();
    const month = Math.max(1, Math.min(12, parseInt(this.state.ledgerMonth || (now.getMonth()+1), 10) || (now.getMonth()+1)));
    const startDay = d => new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const endDay = d => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
    if (mode === 'all') return { label: '全部', mode, start: null, end: null };
    if (mode === 'year') return { label: year + '年', mode, start: new Date(year,0,1), end: endDay(new Date(year,11,31)) };
    if (mode === 'week') {
      const weeks = this.makeWeekOptions(year, month);
      let wk = this.state.ledgerWeek || (weeks[0] && weeks[0].value) || '';
      const found = weeks.find(x => x.value === wk) || weeks[0];
      return found ? { label: found.label, mode, start: found.start, end: found.end } : { label:'本周', mode, start:null, end:null };
    }
    return { label: year + '年' + month + '月', mode:'month', start: new Date(year, month-1, 1), end: endDay(new Date(year, month, 0)) };
  }
  makeWeekOptions(year, month) {
    const opts = [];
    const first = new Date(year, month-1, 1);
    const last = new Date(year, month, 0);
    let cur = new Date(first);
    let idx = 1;
    const endDay = d => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23,59,59,999);
    while (cur <= last) {
      const start = new Date(cur);
      const e = new Date(cur); e.setDate(e.getDate()+6);
      const end = e > last ? endDay(last) : endDay(e);
      opts.push({ value: String(idx), label: '第' + idx + '周', start, end });
      cur.setDate(cur.getDate()+7); idx++;
    }
    return opts;
  }
  makeConsumptionSeries(items, rangeInfo, cur) {
    const mode = (rangeInfo && rangeInfo.mode) || 'month';
    const sumFor = (dateStr) => (items || []).reduce((sum, it) => sum + this.cashFlowEntries(it).filter(cf => cf.date === dateStr).reduce((s, cf) => s + cf.amount, 0), 0);
    let points = [];
    const pad = n => String(n).padStart(2,'0');
    if (mode === 'week') {
      const st = rangeInfo.start || new Date();
      for (let i=0;i<7;i++){ const d = new Date(st); d.setDate(st.getDate()+i); const key=d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate()); points.push({label:(d.getMonth()+1)+'/'+d.getDate(), value:sumFor(key), key, keyType:'day'}); }
    } else if (mode === 'year') {
      const y = (rangeInfo.start || new Date()).getFullYear();
      points = Array.from({length:12}, (_,i)=>{ const m=i+1; const key=y+'-'+pad(m); const val=(items||[]).reduce((s,it)=> s + this.cashFlowEntries(it).filter(cf => String(cf.date||'').startsWith(key)).reduce((a,cf)=>a+cf.amount,0), 0); return {label:m+'月', value:val, key, keyType:'month'}; });
    } else if (mode === 'all') {
      const map={}; (items||[]).forEach(it=>{ this.cashFlowEntries(it).forEach(cf => { const k=String(cf.date||'').slice(0,7); if(!k) return; map[k]=(map[k]||0)+cf.amount; }); });
      points=Object.entries(map).sort().slice(-12).map(([k,v])=>{ const [yy,mm]=k.split('-'); return {label:yy.slice(2)+'年'+parseInt(mm,10)+'月', value:v, key:k, keyType:'month'}; });
      if(!points.length) points=[{label:'暂无',value:0}];
    } else {
      const y = (rangeInfo.start || new Date()).getFullYear(); const m=(rangeInfo.start || new Date()).getMonth(); const days=new Date(y,m+1,0).getDate();
      for(let d=1;d<=days;d++){ const key=y+'-'+pad(m+1)+'-'+pad(d); points.push({label:String(d), value:sumFor(key), key, keyType:'day'}); }
    }
    return points;
  }
  inLedgerRange(it, rangeInfo) {
    if (!rangeInfo || (!rangeInfo.start && !rangeInfo.end)) return true;
    const inWindow = (ds) => { if (!ds) return false; const d = new Date(ds + 'T00:00:00'); if (isNaN(d.getTime())) return false; return (!rangeInfo.start || d >= rangeInfo.start) && (!rangeInfo.end || d <= rangeInfo.end); };
    const dates = this.cashFlowEntries(it).map(cf => cf.date).filter(Boolean);
    if (dates.length) return dates.some(inWindow);
    return inWindow(it.buyDate || it.reminderDate || '');
  }
  makeLedgerPie(items, by, cur) {
    const workById = Object.fromEntries((this.state.works || []).map(w => [w.id, w]));
    const keyName = { character: '角色', type: '种类', workGroup: '系列', work: '作品' }[by] || '分类';
    const map = {};
    (items || []).forEach(it => {
      const w = workById[it.workId] || {};
      const k = by === 'workGroup' ? (w.group || '未分类') : by === 'work' ? (w.name || '未命名作品') : (it[by] || '未分类');
      map[k] = (map[k] || 0) + this.enrich(it).cost;
    });
    const colors = ['#ff3355','#7c5cd6','#2f6fdb','#12a85f','#d9701f','#c0398a','#c8860d','#1f9e8f'];
    const entries = Object.entries(map).filter(([,v]) => v > 0).sort((a,b) => b[1]-a[1]);
    const top = entries.slice(0,6);
    const other = entries.slice(6).reduce((s, [,v]) => s+v, 0);
    if (other > 0) top.push(['其他', other]);
    const total = top.reduce((s, [,v]) => s+v, 0);
    let acc = 0;
    const parts = total ? top.map(([,v], i) => { const a = acc / total * 360; acc += v; const b = acc / total * 360; return `${colors[i % colors.length]} ${a}deg ${b}deg`; }).join(',') : '#eee9f8 0deg 360deg';
    const rows = top.length ? top.map(([name, v], i) => ({
      name,
      value: cur + this.fmt(v),
      percent: total ? Math.round(v / total * 100) + '%' : '0%',
      dotStyle: { width:'10px', height:'10px', borderRadius:'50%', background: colors[i % colors.length], flexShrink:0, display:'inline-block', boxShadow:'0 0 0 3px rgba(50,38,90,.04)' }
    })) : [{ name:'暂无数据', value:'—', percent:'0%', dotStyle: { width:'10px', height:'10px', borderRadius:'50%', background:'#ded7ee', flexShrink:0, display:'inline-block' } }];
    const polar = (cx, cy, r, deg) => {
      const a = (deg - 90) * Math.PI / 180;
      return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
    };
    const arcPath = (start, end) => {
      const cx = 80, cy = 80, outer = 70, inner = 43;
      const safeEnd = Math.min(end, start + 359.99);
      const large = safeEnd - start > 180 ? 1 : 0;
      const os = polar(cx, cy, outer, start);
      const oe = polar(cx, cy, outer, safeEnd);
      const ie = polar(cx, cy, inner, safeEnd);
      const is = polar(cx, cy, inner, start);
      return `M ${os.x.toFixed(2)} ${os.y.toFixed(2)} A ${outer} ${outer} 0 ${large} 1 ${oe.x.toFixed(2)} ${oe.y.toFixed(2)} L ${ie.x.toFixed(2)} ${ie.y.toFixed(2)} A ${inner} ${inner} 0 ${large} 0 ${is.x.toFixed(2)} ${is.y.toFixed(2)} Z`;
    };
    const activeIndex = top.length ? Math.min(Math.max(parseInt(this.state.ledgerPieActive || 0, 10) || 0, 0), top.length - 1) : 0;
    let sliceAcc = 0;
    const segments = top.map(([name, v], i) => {
      const start = sliceAcc / total * 360;
      sliceAcc += v;
      const end = sliceAcc / total * 360;
      return {
        name,
        d: arcPath(start, end),
        fill: colors[i % colors.length],
        style: { opacity: i === activeIndex ? 1 : .72 },
        onHover: () => this.setState({ ledgerPieActive: i }),
        onClick: () => this.setState({ ledgerPieActive: i })
      };
    });
    const active = top[activeIndex];
    const activeColor = active ? colors[activeIndex % colors.length] : '#ded7ee';
    const lead = top[0];
    return {
      title: keyName + '支出分布',
      style: { background:`conic-gradient(${parts})` },
      rows,
      segments,
      totalText: cur + this.fmt(total),
      centerLabel: '合计',
      topText: lead ? '点一下扇区看分类' : '暂无可统计支出',
      activeName: active ? active[0] : '暂无数据',
      activePercent: active ? Math.round(active[1] / total * 100) + '% · ' + keyName : '还没有可统计支出',
      activeValue: active ? cur + this.fmt(active[1]) : '—',
      activeDotStyle: { background: activeColor },
      tip: top.length ? top.slice(0,5).map(([n,v]) => n + ' · ' + cur + this.fmt(v) + ' · ' + (total ? Math.round(v/total*100) : 0) + '%').join('\n') : '暂无数据'
    };
  }
  setLedger = () => {
    // iOS Safari 偶尔会把打开钱包的同一次触摸继续派发给新出现的日期格。
    this._suppressLedgerDetailUntil = Date.now() + 500;
    this.setState({
      view: 'ledger',
      batchMode: false,
      selectedIds: [],
      ledgerDetailKey: '',
      genericSelectOpen: false,
      genericSelectAnchor: null,
      mobileMineOpen: false
    });
  };
  toggleTableSort = (key) => this.setState(s => ({ tableSortKey: key, tableSortDir: s.tableSortKey === key && s.tableSortDir === 'desc' ? 'asc' : 'desc', view: 'table' }));
  toggleGroupCollapse = (label) => this.setState(s => { const c = { ...(s.collapsedGroups || {}) }; if (c[label]) delete c[label]; else c[label] = true; return { collapsedGroups: c }; });
  setBudgetValue(val) { const key = this._budgetKey || this.monthKey(new Date()); const budgets = { ...(this.state.budgets || {}) }; if (val === '' || val == null) delete budgets[key]; else budgets[key] = val; try { localStorage.setItem('zzz_budgets', JSON.stringify(budgets)); } catch (er) {} this.setState({ budgets }); }
  openLedgerDetail = (key, type, label) => {
    if (!key || Date.now() < (this._suppressLedgerDetailUntil || 0)) return;
    this.setState({ ledgerDetailKey: key, ledgerDetailType: type || 'day', ledgerDetailLabel: label || '' });
  };
  closeLedgerDetail = () => this.setState({ ledgerDetailKey: '' });
  jumpBudgetThisMonth = () => { const n = new Date(); this.setState({ ledgerMode: 'month', ledgerRange: 'month', ledgerYear: String(n.getFullYear()), ledgerMonth: String(n.getMonth() + 1), ledgerDetailKey: '' }); };
  onBudgetChange = (e) => { this.setBudgetValue(e.target.value); };
  // 预算统一在钱包页面的输入框中编辑，避免点击钱包附近的操作时弹出浏览器原生 prompt。
  onBudgetQuickEdit = () => {
    const now = new Date();
    this.setState({
      view: 'ledger',
      ledgerMode: 'month',
      ledgerRange: 'month',
      ledgerYear: String(now.getFullYear()),
      ledgerMonth: String(now.getMonth() + 1),
      ledgerDetailKey: '',
      genericSelectOpen: false,
      genericSelectAnchor: null,
      mobileMineOpen: false
    });
  };
  setGallery = () => this.setState({ view: 'gallery' });
  // 手机底部 tab 动作
  tabHome = () => this.setState({ view: 'gallery', filtersOpen: false, mobileMineOpen: false, batchMode: false, selectedIds: [], modalOpen: false });
  tabSearch = () => this.setState({ view: 'gallery', filtersOpen: true, mobileMineOpen: false, modalOpen: false });
  tabLedger = () => {
    this._suppressLedgerDetailUntil = Date.now() + 500;
    this.setState({ view: 'ledger', filtersOpen: false, mobileMineOpen: false, batchMode: false, selectedIds: [], modalOpen: false, ledgerDetailKey: '', genericSelectOpen: false, genericSelectAnchor: null });
  };
  tabMine = () => this.setState(s => ({ mobileMineOpen: !s.mobileMineOpen, modalOpen: false }));
  closeMine = () => this.setState({ mobileMineOpen: false });
  openCloudPage = () => this.setState({ cloudPageOpen: true, mobileMineOpen: false });
  closeCloudPage = () => this.setState({ cloudPageOpen: false });
  goCloudOrSettings = () => { if (window.matchMedia && window.matchMedia('(max-width:640px)').matches) { this.openCloudPage(); } else { this.openSettings(); } };
  tabBtnStyle(active) { return { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '10.5px', fontWeight: active ? 700 : 500, color: active ? this.accentColor() : '#938db0', padding: '6px 0' }; }
  setCircle = () => this.setState({ view: 'circle' });
  setHeat = (n) => this.setState(s => ({ draft: { ...s.draft, heat: ((s.draft.heat || 0) === n ? n - 1 : n) } }));
  setItemHeat = (id, n) => { const items = this.state.items.map(x => x.id === id ? { ...x, heat: ((x.heat || 0) === n ? n - 1 : n) } : x); this.commit(items); };
  onSearch = (e) => { const v = e.target.value; this.setState(s => (s.batchMode && (s.selectedIds || []).length) ? { search: v, selectedIds: [] } : { search: v }); };
  saveChannels = (channels) => { try { localStorage.setItem(this.wkey('zzz_channels', this.optScopeId()), JSON.stringify(channels)); } catch (e) {} this.setState({ channels }); };
  optScopeId() { const c = this.state.currentWorkId; if (c && c !== this.ALL_WORKS && (this.state.works||[]).some(w=>w.id===c)) return c; return this.draftWorkId(this.state.draft||{}); }
  saveList = (key, lsKey, list) => { try { localStorage.setItem(this.wkey(lsKey, this.optScopeId()), JSON.stringify(list)); } catch (e) {} this.setState({ [key]: list }); };
  manageConfig() { return {
    status:    { stateKey:'statusList',    ls:'zzz_status',          field:'status',       label:'状态' },
    character: { stateKey:'charOrder',     ls:'zzz_char_order',      field:'character',    label:'角色', char:true },
    type:      { stateKey:'typesList',     ls:'zzz_types',           field:'type',         label:'种类' },
    series:    { stateKey:'seriesList',    ls:'zzz_series',          field:'series',       label:'系列' },
    channel:   { stateKey:'channels',      ls:'zzz_channels',        field:'channel',      label:'平台' },
    purchaseChannel:{ stateKey:'purchaseChannels', ls:'zzz_purchase_channels', field:'purchaseChannel', label:'渠道' },
    form:      { stateKey:'formOrder',     ls:'zzz_form_order',      field:'form',         label:'形态' },
    acquire:   { stateKey:'acquireOrder',  ls:'zzz_acquire_order',   field:'acquire',      label:'来源' },
    method:    { stateKey:'methodList',     ls:'zzz_method',          field:'method',       label:'购买方式' },
    reminder:  { stateKey:'reminderTypes', ls:'zzz_reminder_types',  field:'reminderType', label:'提醒事件' },
    tradeTags: { stateKey:'tradeTags',     ls:'zzz_trade_tags',      field:'tags',         label:'交易标签', arr:true },
    rarityTags:{ stateKey:'rarityTags',    ls:'zzz_rarity_tags',     field:'rarity',       label:'稀有度标签', arr:true }
  }; }
  openManage = (kind) => this.setState({ manageOpen: true, manageKind: kind, charMenuOpen:false, typeMenuOpen:false, seriesMenuOpen:false, channelMenuOpen:false, purchaseChannelMenuOpen:false, formMenuOpen:false, acquireMenuOpen:false, statusMenuOpen:false, reminderMenuOpen:false });
  closeManage = () => this.setState({ manageOpen: false });
  cfKeyOf(kind){ return kind && kind.indexOf('custom:')===0 ? kind.slice(7) : ''; }
  manageListOf(kind) { if(this.cfKeyOf(kind)){ const k=this.cfKeyOf(kind); const f=(this.state.customFields||[]).find(x=>x.key===k); return ((f&&f.options)||[]).slice(); } const c=this.manageConfig()[kind]; if(!c) return []; if(kind==='character') return this.orderedChars(); if(kind==='tradeTags') return (this.state.tradeTags||this.TRADE_TAGS).slice(); if(kind==='rarityTags') return (this.state.rarityTags||this.RARITY_TAGS).slice(); return (this.state[c.stateKey]||[]).slice(); }
  manageSaveList(kind, list) { if(this.cfKeyOf(kind)){ const k=this.cfKeyOf(kind); const cf=(this.state.customFields||[]).map(x=>x.key===k?{...x,options:list}:x); try{localStorage.setItem('zzz_custom_fields',JSON.stringify(cf));}catch(e){} this.setState({customFields:cf}); return; } const c=this.manageConfig()[kind]; if(!c) return; this.saveList(c.stateKey, c.ls, list); if(kind==='character') this.charOrder=list; }
  manageUsedCount(kind, val) { if(this.cfKeyOf(kind)){ const k=this.cfKeyOf(kind); return (this.state.items||[]).filter(it=>it.custom&&it.custom[k]===val).length; } const c=this.manageConfig()[kind]; const f=c.field; return (this.state.items||[]).filter(it => c.arr ? (it[f]||[]).includes(val) : (it[f]===val || (kind==='character'&&it.swapCharacter===val))).length; }
  manageMigrate(kind, oldV, nv) { if(this.cfKeyOf(kind)){ const k=this.cfKeyOf(kind); const items=(this.state.items||[]).map(it=>(it.custom&&it.custom[k]===oldV)?{...it,custom:{...it.custom,[k]:nv}}:it); this.commit(items); return; } const c=this.manageConfig()[kind]; const f=c.field; const items=(this.state.items||[]).map(it=>{ let x=it; if(c.arr){ const a=it[f]||[]; if(a.includes(oldV)) x={...x,[f]:a.map(v=>v===oldV?nv:v)}; } else { if(it[f]===oldV) x={...x,[f]:nv}; if(kind==='character'&&it.swapCharacter===oldV) x={...x,swapCharacter:nv}; } return x; }); this.commit(items); }
  manageAddItem = (kind) => { const cfk=this.cfKeyOf(kind); const c= cfk ? {label:((this.state.customFields||[]).find(x=>x.key===cfk)||{}).label||'选项'} : this.manageConfig()[kind]; if(!c) return; const v=(window.prompt('新增'+c.label)||'').trim(); if(!v) return; const l=this.manageListOf(kind); if(l.includes(v)){ alert('已存在'); return; } this.manageSaveList(kind, [v, ...l]); };
  manageRenameItem = (kind, oldName) => { const nv=(window.prompt('把「'+oldName+'」改成（使用它的谷子会一起改）：', oldName)||'').trim(); if(!nv||nv===oldName) return; const l=this.manageListOf(kind).map(x=>x===oldName?nv:x); this.manageSaveList(kind, l); this.manageMigrate(kind, oldName, nv); };
  manageDeleteItem = (kind, name) => { const used=this.manageUsedCount(kind, name); if(!window.confirm('删除「'+name+'」？'+(used?('（有 '+used+' 件谷子在用，删后它们仍保留原文字）'):''))) return; this.manageSaveList(kind, this.manageListOf(kind).filter(x=>x!==name)); };
  manageMoveItem = (kind, name, dir) => { const l=this.manageListOf(kind); const i=l.indexOf(name); if(i<0) return; const j=i+dir; if(j<0||j>=l.length) return; const t=l[i]; l[i]=l[j]; l[j]=t; this.manageSaveList(kind, l); };
  manageDragReorder = (kind, from, to) => { if(from===to||from==null||to==null) return; const l=this.manageListOf(kind); if(from<0||from>=l.length||to<0||to>=l.length) return; const [m]=l.splice(from,1); l.splice(to,0,m); this.manageSaveList(kind, l); };
  mgTouchStart = (kind, i) => (e) => { this._mgKind = kind; this._mgDrag = i; };
  mgTouchMove = (e) => { if(this._mgDrag==null) return; if(e&&e.cancelable) e.preventDefault(); const t = e.touches && e.touches[0]; if(!t) return; const el = document.elementFromPoint(t.clientX, t.clientY); const row = el && el.closest ? el.closest('[data-mgrow]') : null; if(row){ const to = parseInt(row.getAttribute('data-mgrow')); if(!isNaN(to)) this._mgOver = to; } };
  mgTouchEnd = () => { if(this._mgDrag!=null && this._mgOver!=null && this._mgKind){ this.manageDragReorder(this._mgKind, this._mgDrag, this._mgOver); } this._mgDrag=null; this._mgOver=null; this._mgKind=null; };
  manageRenameLabel = (kind) => { const key=({character:'character',type:'type',series:'series',channel:'channel',purchaseChannel:'purchaseChannel',status:'status',form:'form',acquire:'acquire',method:'method',tradeTags:'tags',rarityTags:'rarity'})[kind]; if(!key) return; const cur=(this.state.fieldLabels||{})[key]||this.FIELD_DEFAULTS[key]||''; const nv=(window.prompt('把字段名「'+cur+'」改成：',cur)||'').trim(); if(!nv||nv===cur) return; const fl={...(this.state.fieldLabels||{}),[key]:nv}; try{localStorage.setItem('zzz_field_labels',JSON.stringify(fl));}catch(e){} this.setState({fieldLabels:fl}); };
  menuRow(active) { return { display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 9px', borderRadius: '8px', background: active ? 'rgba(255,51,85,.10)' : 'transparent' }; }
  closedDraftMenus(extra = {}) { return { methodMenuOpen:false, acquireMenuOpen:false, channelMenuOpen:false, purchaseChannelMenuOpen:false, seriesMenuOpen:false, typeMenuOpen:false, charMenuOpen:false, statusMenuOpen:false, formMenuOpen:false, reminderMenuOpen:false, setMenuOpen:false, setVariantMenuOpen:false, swapMenuOpen:false, swapCharMenuOpen:false, draftWorkMenuOpen:false, ...extra }; }
  toggleDraftMenu(key) { this.setState(s => this.closedDraftMenus({ [key]: !s[key] })); }
  toggleTypeMenu = () => this.toggleDraftMenu('typeMenuOpen');
  toggleFormMenu = () => this.toggleDraftMenu('formMenuOpen');
  toggleStatusMenu = () => this.toggleDraftMenu('statusMenuOpen');
  toggleAcquireMenu = () => this.toggleDraftMenu('acquireMenuOpen');
  pickForm = (v) => this.setState(s => ({ draft: { ...s.draft, form: v }, formMenuOpen: false }));
  statusDateLabel(v) { return v === '已下单' ? '下单日期' : v === '待补款' ? '补款截止日' : v === '已补款' ? '补款日期' : v === '待尾款' ? '尾款截止日' : v === '已尾款' ? '尾款日期' : v === '排发中' ? '预计排发日' : v === '已发货' ? '发货日' : (v === '已归家' || v === '已到货') ? '归家日期' : (v === '已出物' || v === '已出/已卖出') ? '出物日期' : '提醒日期'; }
  pickStatus = (v) => {
    this.setState(s => {
      const draft = { ...s.draft, status: v };
      const prevStatus = (s.draft && s.draft.status) || '';
      if (v && v !== prevStatus) {
        const today = new Date().toISOString().slice(0, 10);
        const label = this.statusDateLabel(v);
        if (window.confirm('记录「' + label + '」？\n\n' + today + '\n\n确定＝用今天，取消＝保留原日期，稍后可改')) {
          draft.reminderDate = today;
          if (v === '已下单') draft.buyDate = today;
        }
        if (v === '已补款') {
          const amt = window.prompt('这笔补款金额是多少？（只计这一笔，会按今天所在月份单独计入钱包，不填可以留空以后再补）', draft.supplementPrice || '');
          if (amt !== null && amt.trim() !== '') draft.supplementPrice = amt.trim();
        }
        if (v === '已尾款') {
          const amt = window.prompt('这笔尾款金额是多少？（只计这一笔，会按今天所在月份单独计入钱包，不填可以留空以后再补）', draft.finalPrice || '');
          if (amt !== null && amt.trim() !== '') draft.finalPrice = amt.trim();
        }
        if (v === '排发中') {
          const days = window.prompt('这个囤货期大约多久？（填天数，例如 30；到期前 7 天开始提醒，留空则不提醒）', draft.stockDays || '');
          if (days !== null && days.trim() !== '' && parseInt(days) > 0) {
            draft.stockDays = String(parseInt(days));
            const start = window.prompt('从哪天开始算？（YYYY-MM-DD，默认今天）', draft.reminderDate || today);
            draft.stockStart = (start && start.trim()) ? start.trim() : today;
          }
        } else {
          draft.stockDays = '';
          draft.stockStart = '';
        }
      }
      return { draft, statusMenuOpen: false };
    });
  };
  pickAcquire = (v) => this.setState(s => ({ draft: { ...s.draft, acquire: v }, acquireMenuOpen: false }));
  toggleMethodMenu = () => this.toggleDraftMenu('methodMenuOpen');
  closeAllMenus = () => this.setState(this.closedDraftMenus());
  pickMethod = (v) => this.setState(s => ({ draft: { ...s.draft, method: v, gachaResult: v === '盲抽' ? (s.draft.gachaResult || '自抽') : '' }, methodMenuOpen: false }));
  pickMethodGacha = (kind) => this.setState(s => ({ draft: { ...s.draft, method: '盲抽', gachaResult: kind, swapped: kind === '自抽' ? '未置换' : '已置换' }, methodMenuOpen: false }));
  clearMethod = () => this.setState(s => ({ draft: { ...s.draft, method: '', gachaResult: '' }, methodMenuOpen: false }));
  toggleSwapMenu = () => this.toggleDraftMenu('swapMenuOpen');
  pickSwapped = (v) => this.setState(s => ({ draft: { ...s.draft, swapped: v }, swapMenuOpen: false }));
  pickGachaResult = (v) => this.setState(s => ({ draft: { ...s.draft, gachaResult: v, swapped: v === '自抽' ? '未置换' : '已置换' }, swapMenuOpen: false }));
  toggleSwapCharMenu = () => this.toggleDraftMenu('swapCharMenuOpen');
  pickSwapCharacter = (v) => this.setState(s => ({ draft: { ...s.draft, swapCharacter: v }, swapCharMenuOpen: false }));
  clearSwapCharacter = () => this.pickSwapCharacter('');
  toggleReminderMenu = () => this.toggleDraftMenu('reminderMenuOpen');
  pickReminder = (v) => this.setState(s => ({ draft: { ...s.draft, reminderType: v }, reminderMenuOpen: false }));
  addReminderType = () => { const v = (window.prompt('输入新的提醒事件') || '').trim(); if (!v) return; if (!(this.state.reminderTypes || []).includes(v)) this.saveList('reminderTypes', 'zzz_reminder_types', [...(this.state.reminderTypes || []), v]); this.pickReminder(v); };
  delReminderItem = (c, ev) => { if (ev) ev.stopPropagation(); this.saveList('reminderTypes', 'zzz_reminder_types', (this.state.reminderTypes || []).filter(x => x !== c)); };
  delListOption = (which, lsKey, field, val, ev) => {
    if (ev) ev.stopPropagation();
    if (!val) return;
    const arr = (this.state[which] || []).filter(x => x !== val);
    try { localStorage.setItem(this.wkey(lsKey), JSON.stringify(arr)); } catch (e) {}
    this.setState(s => ({ [which]: arr, draft: s.draft && s.draft[field] === val ? { ...s.draft, [field]: (arr[0] || '') } : s.draft }));
  };
  renameListOption = (which, lsKey, field, val, label, ev) => {
    ev && ev.stopPropagation && ev.stopPropagation();
    if (!val || val === '全部') return;
    const nv = (window.prompt('重命名' + label + '「' + val + '」为（会同步修改所有使用该选项的谷子）：', val) || '').trim();
    if (!nv || nv === val) return;
    const fallbackMap = { formOrder: this.FORMS, statusList: this.STATUSES, acquireOrder: ['日谷','国谷','同人'], reminderTypes: this.REMINDER_TYPES };
    const base = (this.state[which] && this.state[which].length) ? this.state[which] : (fallbackMap[which] || []);
    const next = base.map(x => x === val ? nv : x);
    try { localStorage.setItem(this.wkey(lsKey), JSON.stringify(next)); } catch (e) {}
    const items = this.state.items.map(x => (x[field] || '') === val ? { ...x, [field]: nv } : x);
    this.commit(items);
    const selKey = { form: 'formSel', status: 'statusSel', acquire: 'acquireSel' }[field];
    this.setState(s => ({ [which]: next, ...(selKey ? { [selKey]: (s[selKey] || []).map(x => x === val ? nv : x) } : {}), draft: s.draft ? { ...s.draft, [field]: (s.draft[field] || '') === val ? nv : s.draft[field] } : s.draft }));
  };
  pickType = (c) => this.setState(s => ({ draft: { ...s.draft, type: c }, typeMenuOpen: false }));
  addType = () => { const v = (window.prompt('输入新的种类') || '').trim(); if (!v) return; if (!this.state.typesList.includes(v)) this.saveList('typesList', 'zzz_types', [...this.state.typesList, v]); this.setState(s => ({ draft: { ...s.draft, type: v }, typeMenuOpen: false })); };
  renameTypeItem = (c, ev) => { ev.stopPropagation(); const nv = (window.prompt('重命名种类「' + c + '」为（会同步修改所有该种类的谷子）：', c) || '').trim(); if (!nv || nv === c) return; this.saveList('typesList', 'zzz_types', this.state.typesList.map(x => x === c ? nv : x)); const items = this.state.items.map(x => x.type === c ? { ...x, type: nv } : x); this.commit(items); this.setState(s => ({ typeSel: (s.typeSel || []).map(x => x === c ? nv : x), draft: s.draft ? { ...s.draft, type: s.draft.type === c ? nv : s.draft.type } : s.draft })); };
  delTypeItem = (c, ev) => { ev.stopPropagation(); this.saveList('typesList', 'zzz_types', this.state.typesList.filter(x => x !== c)); };
  toggleCharMenu = () => this.toggleDraftMenu('charMenuOpen');
  pickCharacter = (c) => this.setState(s => ({ draft: { ...s.draft, character: c }, charMenuOpen: false }));
  delCharacter = (c, ev) => { ev.stopPropagation(); const used = this.state.items.filter(x => x.character === c || x.swapCharacter === c).length; if (used > 0) { alert('还有 ' + used + ' 件谷子在用「' + c + '」，无法删除。可先把它们改成别的角色。'); return; } const arr = this.orderedChars().filter(x => x !== c); try { localStorage.setItem(this.wkey('zzz_char_order', this.optScopeId()), JSON.stringify(arr)); } catch (e) {} this.ensureCharImg(); delete this.charImgIds[c]; delete this.charAssetMap[c]; delete this.charImgMap[c]; this.persistCharMaps(); this.setState(s => ({ charOrder: arr, draft: (s.draft && s.draft.character === c) ? { ...s.draft, character: (arr[0] || '') } : s.draft })); };
  toggleSeriesMenu = () => this.toggleDraftMenu('seriesMenuOpen');
  pickSeries = (c) => this.setState(s => ({ draft: { ...s.draft, series: c }, seriesMenuOpen: false }));
  clearSeries = () => this.pickSeries('');
  addSeries = () => { const v = (window.prompt('输入新的系列名称（如：TV本编 / 剧场版 / 一番赏）') || '').trim(); if (!v) return; if (!this.state.seriesList.includes(v)) this.saveList('seriesList', 'zzz_series', [...this.state.seriesList, v]); this.setState(s => ({ draft: { ...s.draft, series: v }, seriesMenuOpen: false })); };
  renameSeriesItem = (c, ev) => { ev.stopPropagation(); const nv = (window.prompt('重命名系列「' + c + '」为（会同步修改所有该系列的谷子）：', c) || '').trim(); if (!nv || nv === c) return; this.saveList('seriesList', 'zzz_series', this.state.seriesList.map(x => x === c ? nv : x)); const items = this.state.items.map(x => (x.series || '') === c ? { ...x, series: nv } : x); this.commit(items); this.setState(s => ({ seriesFilter: s.seriesFilter === c ? nv : s.seriesFilter, draft: s.draft ? { ...s.draft, series: s.draft.series === c ? nv : s.draft.series } : s.draft })); };
  delSeriesItem = (c, ev) => { ev.stopPropagation(); this.saveList('seriesList', 'zzz_series', this.state.seriesList.filter(x => x !== c)); };
  toggleChannelMenu = () => this.toggleDraftMenu('channelMenuOpen');
  pickChannel = (c) => this.setState(s => ({ draft: { ...s.draft, channel: c }, channelMenuOpen: false }));
  clearChannel = () => this.pickChannel('');
  addChannel = () => { const v = (window.prompt('新的平台或店铺名称') || '').trim(); if (!v) return; if (!this.state.channels.includes(v)) this.saveChannels([...this.state.channels, v]); this.setState(s => ({ draft: { ...s.draft, channel: v }, channelMenuOpen: false })); };
  renameChannelItem = (c, ev) => { ev.stopPropagation(); const nv = (window.prompt('重命名平台「' + c + '」为（会同步修改所有该平台的谷子）：', c) || '').trim(); if (!nv || nv === c) return; this.saveChannels(this.state.channels.map(x => x === c ? nv : x)); const items = this.state.items.map(x => (x.channel || '') === c ? { ...x, channel: nv } : x); this.commit(items); this.setState(s => ({ channelSel: (s.channelSel || []).map(x => x === c ? nv : x), draft: s.draft ? { ...s.draft, channel: s.draft.channel === c ? nv : s.draft.channel } : s.draft })); };
  delChannelItem = (c, ev) => { ev.stopPropagation(); this.saveChannels(this.state.channels.filter(x => x !== c)); };
  togglePurchaseChannelMenu = () => this.toggleDraftMenu('purchaseChannelMenuOpen');
  pickPurchaseChannel = (c) => this.setState(s => ({ draft: { ...s.draft, purchaseChannel: c }, purchaseChannelMenuOpen: false }));
  clearPurchaseChannel = () => this.pickPurchaseChannel('');
  addPurchaseChannel = () => { const v = (window.prompt('新的渠道名称') || '').trim(); if (!v) return; const cur = this.state.purchaseChannels || []; if (!cur.includes(v)) this.saveList('purchaseChannels', 'zzz_purchase_channels', [...cur, v]); this.setState(s => ({ draft: { ...s.draft, purchaseChannel: v }, purchaseChannelMenuOpen: false })); };
  renamePurchaseChannelItem = (c, ev) => { ev && ev.stopPropagation && ev.stopPropagation(); const nv = (window.prompt('重命名渠道「' + c + '」为（会同步修改所有该渠道的谷子）：', c) || '').trim(); if (!nv || nv === c) return; this.saveList('purchaseChannels', 'zzz_purchase_channels', (this.state.purchaseChannels || []).map(x => x === c ? nv : x)); const items = (this.state.items || []).map(x => (x.purchaseChannel || '') === c ? { ...x, purchaseChannel: nv } : x); this.commit(items); this.setState(s => ({ purchaseChannelSel: (s.purchaseChannelSel || []).map(x => x === c ? nv : x), draft: s.draft ? { ...s.draft, purchaseChannel: s.draft.purchaseChannel === c ? nv : s.draft.purchaseChannel } : s.draft })); };
  delPurchaseChannelItem = (c, ev) => { ev && ev.stopPropagation && ev.stopPropagation(); this.saveList('purchaseChannels', 'zzz_purchase_channels', (this.state.purchaseChannels || []).filter(x => x !== c)); };
  toggleReminderMenu = () => this.toggleDraftMenu('reminderMenuOpen');
  pickReminderType = (c) => this.setState(s => ({ draft: { ...s.draft, reminderType: c }, reminderMenuOpen: false }));
  addReminderType = () => { const v = (window.prompt('新的提醒事件名称') || '').trim(); if (!v) return; const cur = this.state.reminderTypes || []; if (!cur.includes(v)) this.saveList('reminderTypes', 'zzz_reminder_types', [...cur, v]); this.setState(s => ({ draft: { ...s.draft, reminderType: v }, reminderMenuOpen: false })); };
  delReminderItem = (c, ev) => { ev.stopPropagation(); this.saveList('reminderTypes', 'zzz_reminder_types', (this.state.reminderTypes || []).filter(x => x !== c)); };
  setFilterState = (patch) => this.setState(s => (s.batchMode && (s.selectedIds || []).length) ? { ...patch, selectedIds: [] } : patch);
  toggleSel = (key, value) => { this.setState(s => { const patch = (value === '__all__') ? { [key]: [] } : { [key]: (s[key] || []).includes(value) ? (s[key] || []).filter(x => x !== value) : [...(s[key] || []), value] }; if (s.batchMode && (s.selectedIds || []).length) patch.selectedIds = []; return patch; }); };
  toggleCustomFilter = (key, value) => { this.setState(s => { const all = { ...(s.customFilterSel || {}) }; if (value === '__all__') { all[key] = []; } else { const cur = all[key] || []; all[key] = cur.includes(value) ? cur.filter(x => x !== value) : [...cur, value]; } const patch = { customFilterSel: all }; if (s.batchMode && (s.selectedIds || []).length) patch.selectedIds = []; return patch; }); };

  arrivedOf(it) { return it.status === '已到货' || it.status === '已归家'; }
  groupOf(it) { return (it.status === '出售中' || it.status === '已出物' || it.status === '已出/已卖出') ? '出物' : '收藏'; }
  groupKind(it) { if (this.groupOf(it) === '出物') return 'sale'; return this.arrivedOf(it) ? 'inhand' : 'air'; }

  enrich(it) {
    const qty = Math.max(1, parseInt(it.qty) || 1);
    const buy = this.num(it.buyPrice), sd = this.num(it.shipDom), si = this.num(it.shipIntl), other = this.num(it.otherFee), sell = this.num(it.sellPrice);
    const cost = buy * qty + sd + si + other;
    const revenue = sell * qty;
    const sold = it.status === '已出/已卖出' || it.status === '已出物';
    return { qty, buy, sd, si, other, sell, cost, revenue, sold, profit: revenue - cost };
  }
  statusLogDate(it, status) {
    const log = Array.isArray(it.statusLog) ? it.statusLog.filter(s => s && s.status === status && s.date) : [];
    return log.length ? log[log.length - 1].date : '';
  }
  statusLogWith(logArg, status, date) {
    const log = Array.isArray(logArg) ? [...logArg] : [];
    if (!status || !date) return log;
    const last = log[log.length - 1];
    if (last && last.status === status) {
      log[log.length - 1] = { ...last, date, ts: Date.now() };
    } else {
      log.push({ status, date, ts: Date.now() });
    }
    return log;
  }
  eventDateFor(it) { return (it && (it.reminderDate || this.statusLogDate(it, it.status) || it.buyDate)) || this.todayStr(); }
  sellDateFor(it) { return (it && (it.sellDate || this.statusLogDate(it, '已出物') || this.statusLogDate(it, '已出/已卖出') || (String(it.status || '').includes('出') ? it.reminderDate : '') || it.buyDate)) || ''; }
  // 把一件谷子的总花费，按「补款/尾款/国际运费/国内运费各自实际发生的月份」拆开，而不是整笔都算在下单那个月
  // 国际运费通常跟补款/尾款一起先交；国内运费要等排发/发货之后才知道、才交
  cashFlowEntries(it) {
    const e = this.enrich(it);
    const buyTotal = e.buy * e.qty;
    const supp = this.num(it.supplementPrice);
    const fin = this.num(it.finalPrice);
    const suppDate = supp > 0 ? (it.supplementPriceDate || this.statusLogDate(it, '已补款') || it.buyDate) : '';
    const finDate = fin > 0 ? (it.finalPriceDate || this.statusLogDate(it, '已尾款') || it.buyDate) : '';
    const lateDate = finDate || suppDate || it.buyDate;
    const shipDomDate = it.shipDomDate || this.statusLogDate(it, '已发货') || this.statusLogDate(it, '排发中') || lateDate;
    const shipIntlDate = it.shipIntlDate || lateDate;
    const otherFeeDate = it.otherFeeDate || lateDate;
    const remainder = buyTotal - supp - fin;
    const entries = [];
    if (it.buyDate && remainder) entries.push({ date: it.buyDate, amount: remainder });
    if (supp && suppDate) entries.push({ date: suppDate, amount: supp });
    if (fin && finDate) entries.push({ date: finDate, amount: fin });
    if (e.si && shipIntlDate) entries.push({ date: shipIntlDate, amount: e.si });
    if (e.sd && shipDomDate) entries.push({ date: shipDomDate, amount: e.sd });
    if (e.other && otherFeeDate) entries.push({ date: otherFeeDate, amount: e.other });
    if (!entries.length && it.buyDate) entries.push({ date: it.buyDate, amount: e.cost });
    return entries;
  }
  dateDiffDays(dateStr, yearly) {
    if (!dateStr) return null;
    const src = new Date(dateStr + 'T00:00:00');
    if (isNaN(src.getTime())) return null;
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let d = new Date(src.getFullYear(), src.getMonth(), src.getDate());
    if (yearly) {
      d = new Date(today.getFullYear(), src.getMonth(), src.getDate());
      if (d < today) d = new Date(today.getFullYear() + 1, src.getMonth(), src.getDate());
    }
    return Math.round((d - today) / 86400000);
  }
  reminderInfo(it) {
    const st = this.statusReminderInfo(it);
    const stock = this.stockReminder(it);
    if (st && stock) {
      const stPending = st.pending && st.days <= 7;
      if (!stPending) return stock;
      return stock.days <= st.days ? stock : st;
    }
    return stock || st;
  }
  statusReminderInfo(it) {
    const status = String((it && it.status) || '');
    const statusLabelMap = { '已下单': '已下单', '已下单未发货': '已下单', '待补款': '补款截止', '已补款': '补款完成', '待尾款': '尾款截止', '已尾款': '尾款完成', '排发中': '排发中', '已发货': '已发货', '在途/运输中': '已发货', '已归家': '已归家', '已到货': '已归家', '已出物': '已出物', '出售中': '已出物', '已出/已卖出': '已出物' };
    const rawType = (it && it.reminderType) || statusLabelMap[status] || '';
    const typeAliasMap = { '补款': '补款截止', '尾款': '尾款截止', '排发': '排发中', '到货': '已归家', '集运': '排发中' };
    const type = typeAliasMap[rawType] || rawType;
    const dateStr = (it && (it.reminderDate || this.statusLogDate(it, status) || (status === '已下单' ? it.buyDate : ''))) || '';
    const days = this.dateDiffDays(dateStr, false);
    if (!type || !dateStr || days == null) return null;

    const deadlineTypes = ['补款截止', '尾款截止'];
    const isDeadline = deadlineTypes.includes(type);
    let text = '';
    let badgeText = '';
    let urgent = false;
    let overdue = false;
    let score = days;

    if (isDeadline) {
      urgent = days <= 3;
      overdue = days < 0;
      if (days < 0) { text = type + ' 已逾期 ' + Math.abs(days) + ' 天'; badgeText = '逾期' + Math.abs(days) + '天'; }
      else if (days === 0) { text = type + ' 今天截止'; badgeText = '今天截止'; }
      else { text = type + ' 还有 ' + days + ' 天'; badgeText = days + '天'; }
    } else {
      const passed = Math.abs(days);
      const badgePrefix = type === '已下单' ? '下单' : type === '补款完成' ? '补款' : type === '尾款完成' ? '尾款' : type === '排发中' ? '排发' : type === '已发货' ? '发货' : type === '已归家' ? '归家' : type === '已出物' ? '出物' : type;
      text = type + ' ' + passed + ' 天';
      badgeText = badgePrefix + '+' + passed + '天';
      score = 9999 + passed;
    }
    return { active: urgent, pending: isDeadline, days, text, badgeText, type, date: dateStr, overdue, score };
  }
  stockReminder(it) {
    if (!it || it.status !== '排发中') return null;
    const n = parseInt(it && it.stockDays); if (!n || n <= 0) return null;
    const base = (it && (it.stockStart || it.reminderDate)) || ''; if (!base) return null;
    const bd = new Date(base + 'T00:00:00'); if (isNaN(bd.getTime())) return null;
    const deadline = new Date(bd.getTime() + n * 86400000);
    const ds = deadline.getFullYear() + '-' + String(deadline.getMonth() + 1).padStart(2, '0') + '-' + String(deadline.getDate()).padStart(2, '0');
    const days = this.dateDiffDays(ds, false); if (days == null) return null;
    if (days > 7) return null;
    let text, badgeText;
    if (days < 0) { text = '囤货已超 ' + Math.abs(days) + ' 天'; badgeText = '囤货超' + Math.abs(days) + '天'; }
    else if (days === 0) { text = '囤货到期（今天）'; badgeText = '囤货到期'; }
    else { text = '囤货还有 ' + days + ' 天到期'; badgeText = '囤货' + days + '天'; }
    return { active: true, pending: true, days, text, badgeText, type: '囤货倒计时', date: ds, overdue: days < 0, score: days };
  }
  monthKey(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0'); }
  todayStr() { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  monthLabel(d) { return (d.getMonth() + 1) + '月'; }
  topSpendRows(map, cur, suffix) { const rows = Object.entries(map || {}).sort((a,b) => b[1] - a[1]).slice(0,3).map(([name, v]) => ({ name: name || '未分类', value: suffix ? (v + suffix) : (cur + this.fmt(v)) })); while (rows.length < 3) rows.push({ name: '暂无数据', value: '—' }); return rows; }


  setProgress(items) {
    const map = {};
    (items || []).forEach(it => {
      const name = (it.setName || '').trim();
      if (!name) return;
      const key = (it.workId || this.MAIN_WORK) + '::' + name;
      const total = Math.max(0, parseInt(it.setTotal) || 0);
      const variant = (it.setVariant || it.name || this.genName(it) || '').trim();
      if (!map[key]) map[key] = { name, total: 0, variants: new Set(), items: [] };
      map[key].total = Math.max(map[key].total, total);
      if (variant) map[key].variants.add(variant);
      map[key].items.push(it);
    });
    return Object.values(map).map(x => ({ name: x.name, total: x.total, count: x.variants.size, complete: x.total > 0 && x.variants.size >= x.total, items: x.items }));
  }
  makeReviewData(items, saleItems, cur, rangeLabel) {
    const list = items || [];
    const sold = saleItems || [];
    const qty = list.reduce((sum, it) => sum + this.enrich(it).qty, 0);
    const cost = list.reduce((sum, it) => sum + this.enrich(it).cost, 0);
    const revenue = sold.reduce((sum, it) => sum + this.enrich(it).revenue, 0);
    const profit = sold.reduce((sum, it) => sum + this.enrich(it).profit, 0);
    const progress = this.setProgress(list);
    const setRows = progress.filter(x => x.complete).sort((a,b) => b.count - a.count).slice(0,6).map(x => ({ name: x.name, value: x.count + '/' + x.total }));
    while (setRows.length < 3) setRows.push({ name: '暂无集齐套装', value: '—' });
    return {
      period: rangeLabel || '当前范围',
      cards: [
        { label: '新增收藏', value: qty + '件' },
        { label: '消费', value: cur + this.fmt(cost) },
        { label: '回血', value: cur + this.fmt(revenue) },
        { label: '净支出', value: cur + this.fmt(cost - revenue) },
        { label: '已集齐', value: progress.filter(x => x.complete).length + '套' },
        { label: '海景', value: (profit >= 0 ? '+' : '-') + cur + this.fmt(Math.abs(profit)) }
      ],
      sets: setRows
    };
  }
  makeAchievements(items, saleItems) {
    const list = items || [];
    const sold = saleItems || [];
    const totalQty = list.reduce((sum, it) => sum + this.enrich(it).qty, 0);
    const totalCost = list.reduce((sum, it) => sum + this.enrich(it).cost, 0);
    const totalRevenue = sold.reduce((sum, it) => sum + this.enrich(it).revenue, 0);
    const totalProfit = sold.reduce((sum, it) => sum + this.enrich(it).profit, 0);
    const completedSets = this.setProgress(list).filter(x => x.complete).length;
    const workById = Object.fromEntries((this.state.works || []).map(w => [w.id, w]));
    const countDistinct = (fn) => new Set(list.map(fn).filter(Boolean)).size;
    const charCount = countDistinct(it => it.character);
    const typeCount = countDistinct(it => it.type);
    const workCount = countDistinct(it => (workById[it.workId] || {}).name);
    const varietyCount = charCount + typeCount + workCount;
    const maxBy = (fn) => { const m = {}; list.forEach(it => { const k = fn(it) || ''; if (k) m[k] = (m[k] || 0) + this.enrich(it).qty; }); return Object.entries(m).sort((a,b)=>b[1]-a[1])[0] || ['',0]; };
    const topChar = maxBy(it => it.character);
    const topWork = maxBy(it => (workById[it.workId] || {}).name);
    const totalDelivered = list.filter(it => String(it.status || '').includes('到货') || String(it.status || '').includes('已完成')).reduce((sum, it) => sum + this.enrich(it).qty, 0);
    const bargainFound = list.some(it => { const original = this.num(it.originalPrice); const buy = this.num(it.buyPrice); return original > 0 && buy > 0 && buy <= original * 0.6; });
    const oneShotComplete = this.setProgress(list).some(x => x.complete && x.total > 0 && x.items.length >= x.total);
    const dayMap = {};
    list.forEach(it => { const d = it.buyDate || ''; if (!d) return; dayMap[d] = (dayMap[d] || 0) + this.enrich(it).qty; });
    const maxDayQty = Math.max(0, ...Object.values(dayMap));
    const tier = (value, levels) => { let best = { name: '未解锁', need: levels[0][0], level: 0 }; levels.forEach((lv, idx) => { if (value >= lv[0]) best = { name: lv[1], need: lv[0], level: idx + 1 }; }); return best; };
    const qtyLevels = [[1,'第一件收藏'],[3,'小小开端'],[5,'逐渐上头'],[7,'稳定收谷'],[10,'小有收藏'],[20,'囤货起步'],[30,'收藏达人'],[50,'收藏专家'],[100,'收藏大师'],[200,'收藏仓库长'],[500,'殿堂收藏家']];
    const spendLevels = [[10,'第一次花钱'],[20,'小试身手'],[50,'钱包启动'],[100,'开始吃土'],[200,'认真收谷'],[500,'停不下来'],[1000,'钱包告急'],[3000,'火力全开'],[5000,'重度收藏'],[10000,'传说钱包']];
    const profitLevels = [[10,'第一口回血'],[20,'小有回血'],[50,'回血启动'],[100,'海景苗头'],[500,'海景达人'],[1000,'海景房主'],[3000,'海边别墅']];
    const setLevels = [[1,'第一套完成'],[2,'成套收藏'],[3,'套装爱好者'],[5,'越收越多'],[10,'套装大师'],[20,'套装殿堂']];
    const soldLevels = [[1,'第一件出物'],[3,'开始出货'],[5,'回血练习'],[10,'出货顺利'],[30,'回血达人'],[50,'出物大师'],[100,'清仓高手']];
    const packageLevels = [[1,'第一次到货'],[3,'拆箱开始'],[5,'包裹常客'],[10,'快乐拆箱'],[30,'快递熟人'],[50,'拆箱达人'],[100,'包裹仓库']];
    const charLevels = [[1,'初见心动'],[2,'意犹未尽'],[3,'真爱收藏'],[5,'本命担当'],[7,'倾心相伴'],[10,'唯一推し'],[15,'命中注定'],[20,'梦中情角'],[30,'收藏传奇'],[50,'无可取代'],[80,'殿堂收藏'],[100,'传说羁绊']];
    const workLevels = [[1,'入坑一作'],[3,'作品起步'],[5,'作品稳定'],[10,'作品深坑'],[20,'作品仓库'],[50,'作品殿堂'],[100,'作品传说']];
    const varietyLevels = [[3,'开始探索'],[5,'收藏探索者'],[10,'多线收藏'],[20,'涉猎广泛'],[40,'百科型收藏']];
    const revenueLevels = [[10,'第一次回款'],[20,'回款起步'],[50,'回血稳定'],[100,'回血能手'],[500,'回血大户'],[1000,'回血专家'],[3000,'回血大师']];
    const rows = [
      { name:'收藏等级', value: totalQty, tier: tier(totalQty, qtyLevels), next: qtyLevels, unit:'件' },
      { name:'花费等级', value: totalCost, tier: tier(totalCost, spendLevels), next: spendLevels, unit:'' },
      { name:'回血等级', value: Math.max(0,totalProfit), tier: tier(Math.max(0,totalProfit), profitLevels), next: profitLevels, unit:'' },
      { name:'出物等级', value: sold.length, tier: tier(sold.length, soldLevels), next: soldLevels, unit:'件' },
      { name:'到货等级', value: totalDelivered, tier: tier(totalDelivered, packageLevels), next: packageLevels, unit:'件' },
      { name:'套装等级', value: completedSets, tier: tier(completedSets, setLevels), next: setLevels, unit:'套' },
      { name:'角色羁绊', value: topChar[1] || 0, tier: tier(topChar[1] || 0, charLevels), next: charLevels, unit:'件', note: topChar[0] ? topChar[0] : '' },
      { name:'作品等级', value: topWork[1] || 0, tier: tier(topWork[1] || 0, workLevels), next: workLevels, unit:'件', note: topWork[0] ? topWork[0] : '' },
      { name:'图鉴广度', value: varietyCount, tier: tier(varietyCount, varietyLevels), next: varietyLevels, unit:'类' },
      { name:'累计回款', value: totalRevenue, tier: tier(totalRevenue, revenueLevels), next: revenueLevels, unit:'' },
      { name:'神价捡漏', fixed: bargainFound, locked:'买入价低于原价 40%' },
      { name:'一发毕业', fixed: oneShotComplete, locked:'录入时完成一套' },
      { name:'满载而归', fixed: maxDayQty >= 10, locked:'单日新增 10 件' },
      { name:'第一次海景', fixed: sold.some(it => this.enrich(it).profit > 0), locked:'第一次盈利出物' }
    ];
    return rows.map(r => {
      if (Object.prototype.hasOwnProperty.call(r, 'fixed')) {
        const ok = !!r.fixed;
        return {
          name: r.name,
          badge: ok ? '已解锁' : '待解锁',
          status: ok ? '已完成' : (r.locked || '未达成'),
          style: this.badge(ok ? '#12a85f' : '#837da4', ok ? 'rgba(18,168,95,.1)' : 'rgba(50,38,90,.05)', ok ? 'rgba(18,168,95,.24)' : '#ded7ee'),
          meterStyle: { width: ok ? '100%' : '8%', background: ok ? '#12a85f' : '#cfc8e6' }
        };
      }
      const next = (r.next || []).find(x => r.value < x[0]);
      const prefix = r.note ? (r.note + ' · ') : '';
      const ok = !!r.tier.level;
      const delta = next ? Math.max(0, next[0] - r.value) : 0;
      const deltaText = this.fmt(delta) + (r.unit || '');
      const prevNeed = ok ? ((r.next || [])[Math.max(0, r.tier.level - 1)] || [0])[0] : 0;
      const nextNeed = next ? next[0] : Math.max(prevNeed, r.value || 0);
      const pct = next ? Math.max(ok ? 10 : 6, Math.min(100, Math.round(((r.value || 0) - prevNeed) / Math.max(1, nextNeed - prevNeed) * 100))) : 100;
      const label = ok ? (prefix + r.tier.name + (next ? (' · 下一级还差 ' + deltaText) : ' · 已满级')) : (next ? ('还差 ' + deltaText + ' 解锁 ' + next[1]) : '未解锁');
      return {
        name: r.name,
        badge: ok ? ('Lv.' + r.tier.level) : '未解锁',
        status: label,
        style: this.badge(ok ? '#7c5cd6' : '#837da4', ok ? 'rgba(124,92,214,.1)' : 'rgba(50,38,90,.05)', ok ? 'rgba(124,92,214,.24)' : '#ded7ee'),
        meterStyle: { width: pct + '%', background: ok ? '#7c5cd6' : '#cfc8e6' }
      };
    });
  }
  autoTimeline(it) {
    const rows = [];
    const add = (date, title, note) => { if (date) rows.push({ date, title, note: note || '' }); };
    add(it.buyDate, '创建 / 下单', it.buyPrice ? ('买入 ' + (this.state.currency || '￥') + it.buyPrice) : '');
    // 生命周期时间轴：来自每次状态变更的自动记录
    if (Array.isArray(it.statusLog)) {
      it.statusLog.forEach(s => { if (s && s.status) add(s.date, s.status, '状态变更 · 自动记录'); });
    }
    if (it.reminderType && it.reminderDate && !(Array.isArray(it.statusLog) && it.statusLog.length)) add(it.reminderDate, it.reminderType, '提醒日期');
    if (!(Array.isArray(it.statusLog) && it.statusLog.length)) {
      if (String(it.status || '').includes('已补款')) add(it.reminderDate || it.buyDate, '补款完成', '由状态自动记录');
      if (String(it.status || '').includes('已排发')) add(it.reminderDate || it.buyDate, '已排发', '由状态自动记录');
      if (String(it.status || '').includes('已到货')) add(it.reminderDate || it.buyDate, '到货', '由状态自动记录');
      if (String(it.status || '').includes('已出')) add(it.buyDate || it.reminderDate, '出物', it.sellPrice ? ('回血 ' + (this.state.currency || '￥') + it.sellPrice) : '');
    }
    // 置换 / 收现事件
    if (Array.isArray(it.swapLog)) {
      it.swapLog.forEach(s => {
        if (!s) return;
        const title = '置换 / 收现获得';
        let note = '';
        if (s.fromChar || s.fromVariant) note = '原抽：' + [s.fromChar, s.fromVariant].filter(Boolean).join(' ') + '　→　最终：' + [s.toChar, s.toName].filter(Boolean).join(' ');
        if (s.note) note = (note ? note + '　' : '') + s.note;
        add(s.date, title, note);
      });
    }
    return rows.sort((a,b) => (a.date || '').localeCompare(b.date || ''));
  }

  chipStyle(active) { return { display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 12px', borderRadius: '999px', fontSize: '13px', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'inherit', border: '1px solid ' + (active ? 'var(--accent,#ff3355)' : '#ded7ee'), background: active ? 'var(--accent,#ff3355)' : 'rgba(50,38,90,.03)', color: active ? '#fff' : '#595287', transition: '.15s', flexShrink: 0 }; }
  tabStyle(active) { return { padding: '8px 15px', borderRadius: '9px', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '14px', whiteSpace: 'nowrap', fontWeight: active ? 700 : 500, background: active ? 'var(--accent,#ff3355)' : 'transparent', color: active ? '#fff' : '#6f6996', transition: '.15s' }; }
  segStyle(active) { return { padding: '7px 13px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '13px', whiteSpace: 'nowrap', fontWeight: active ? 700 : 500, background: active ? 'var(--accent,#ff3355)' : 'transparent', color: active ? '#fff' : '#6f6996', transition: '.15s' }; }
  badge(color, bg, bd) { return { display: 'inline-flex', alignItems: 'center', padding: '3px 9px', borderRadius: '999px', fontSize: '11.5px', fontWeight: 600, whiteSpace: 'nowrap', color, background: bg, border: '1px solid ' + bd }; }
  navItemStyle(active) { return { display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '8px 11px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '13px', fontWeight: active ? 700 : 500, textAlign: 'left', background: active ? this.accentAlpha(0.12) : 'transparent', color: active ? this.accentColor() : '#4c4580', transition: '.15s' }; }
  navIconStyle(active) { return { width: '22px', height: '22px', borderRadius: '7px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontSize: '13px', flexShrink: 0, background: active ? this.accentAlpha(0.14) : 'rgba(50,38,90,.055)', color: active ? this.accentColor() : '#837da4', filter: 'none' }; }
  navCountStyle(active) { return { marginLeft: 'auto', fontSize: '12px', fontFamily: "'Orbitron',sans-serif", color: active ? this.accentColor() : '#938db0', background: active ? this.accentAlpha(0.14) : 'rgba(50,38,90,.06)', borderRadius: '999px', padding: '1px 8px', minWidth: '20px', textAlign: 'center' }; }


  defaultDashboardCards() {
    return { collection: ['costItems','qtyItems','character','workGroup'], sale: ['salePrice','saleQty','saleRevenueIp','saleProfit'] };
  }
  normalizeDashboardCards(cards) {
    const d = this.defaultDashboardCards();
    const clean = (arr, fb) => { arr = Array.isArray(arr) ? arr.filter(Boolean).slice(0,4) : []; while (arr.length < 4) arr.push(fb[arr.length] || fb[0]); return arr; };
    return { collection: clean(cards && cards.collection, d.collection), sale: clean(cards && cards.sale, d.sale) };
  }
  dashboardMetricLabels(styleMode) {
    const s = styleMode || this.state.nameStyleMode || 'default';
    const base = {
      default: {
        costItems:'花费TOP3', qtyItems:'数量TOP3', character:'最爱TOP3', workGroup:'IP TOP3', maker:'系列TOP3', type:'种类TOP3', reminder:'近期待办',
        salePrice:'卖价TOP3', saleQty:'卖出TOP3', saleRevenueIp:'收益IP TOP3', saleProfit:'利润TOP3'
      },
      guquan: {
        costItems:'氪金TOP3', qtyItems:'囤货TOP3', character:'真爱TOP3', workGroup:'本命TOP3', maker:'系列TOP3', type:'种类TOP3', reminder:'待办中心',
        salePrice:'成交TOP3', saleQty:'出货TOP3', saleRevenueIp:'回血IP TOP3', saleProfit:'海景TOP3'
      },
      business: {
        costItems:'消费排行', qtyItems:'收藏排行', character:'角色排行', workGroup:'系列IP排行', maker:'系列排行', type:'品类排行', reminder:'待处理事项',
        salePrice:'成交排行', saleQty:'销售排行', saleRevenueIp:'收入IP排行', saleProfit:'利润排行'
      }
    };
    return base[s] || base.default;
  }
  dashboardMetricOptions(styleMode) {
    const L = this.dashboardMetricLabels(styleMode);
    return {
      collection: ['costItems','qtyItems','character','workGroup','maker','type','reminder'].map(k => ({ value:k, label:L[k] })),
      sale: ['salePrice','saleQty','saleRevenueIp','saleProfit','character','workGroup','maker','type','reminder'].map(k => ({ value:k, label:L[k] }))
    };
  }
  makeRankRows(metric, ledgerItems, saleItems, cur, workOfItem, fillRows) {
    const topMoney = (map) => this.topSpendRows(map, cur);
    const items = metric && metric.indexOf('sale') === 0 ? saleItems : ledgerItems;
    if (metric === 'costItems') return fillRows([...ledgerItems].map(it => ({ name: it.name || this.genName(it) || '未命名', valueNum: this.enrich(it).cost })).filter(r => r.valueNum > 0).sort((a,b) => b.valueNum - a.valueNum).slice(0,3).map(r => ({ name:r.name, value:cur + this.fmt(r.valueNum) })));
    if (metric === 'qtyItems') return fillRows([...ledgerItems].map(it => ({ name: it.name || this.genName(it) || '未命名', qty: this.enrich(it).qty, type: it.type || '' })).filter(r => r.qty > 0).sort((a,b) => b.qty - a.qty || a.name.localeCompare(b.name,'zh-Hans-CN')).slice(0,3).map(r => ({ name: r.type ? r.name + ' · ' + r.type : r.name, value: r.qty + ' 个' })));
    if (metric === 'character' || metric === 'workGroup' || metric === 'maker' || metric === 'type') {
      const map = {};
      items.forEach(it => { const e = this.enrich(it); let k = '未分类'; if (metric === 'character') k = it.character || '未分类'; else if (metric === 'workGroup') k = (workOfItem(it).group || '未分类'); else if (metric === 'maker') k = it.series || '未分类'; else if (metric === 'type') k = it.type || '未分类'; map[k] = (map[k] || 0) + e.cost; });
      return topMoney(map);
    }
    if (metric === 'reminder') {
      const rows = ledgerItems.map(it => ({ it, rem:(this.reminderInfo(it) || {}) })).filter(x => x.rem.pending).sort((a,b) => a.rem.days - b.rem.days).slice(0,3).map(x => ({ name:x.it.name || this.genName(x.it) || '未命名', value:x.rem.badgeText || x.rem.text }));
      return fillRows(rows);
    }
    if (metric === 'salePrice') return fillRows([...saleItems].map(it => { const e=this.enrich(it); return { name: it.name || this.genName(it) || '未命名', valueNum:e.sell, qty:e.qty }; }).filter(r=>r.valueNum>0).sort((a,b)=>b.valueNum-a.valueNum).slice(0,3).map(r=>({ name:r.qty>1? r.name+' ×'+r.qty : r.name, value:cur+this.fmt(r.valueNum)+'/个' })));
    if (metric === 'saleQty') return fillRows([...saleItems].map(it => { const e=this.enrich(it); return { name:it.name || this.genName(it) || '未命名', valueNum:e.qty, revenue:e.revenue }; }).filter(r=>r.valueNum>0).sort((a,b)=>b.valueNum-a.valueNum || b.revenue-a.revenue).slice(0,3).map(r=>({ name:r.name, value:r.valueNum+' 个' })));
    if (metric === 'saleRevenueIp') { const m={}; saleItems.forEach(it=>{ const e=this.enrich(it); const ip=workOfItem(it).group || '未分类'; m[ip]=(m[ip]||0)+e.revenue; }); return topMoney(m); }
    if (metric === 'saleProfit') return fillRows([...saleItems].map(it => { const e=this.enrich(it); return { name:it.name || this.genName(it) || '未命名', valueNum:e.profit, revenue:e.revenue }; }).filter(r=>r.revenue>0).sort((a,b)=>b.valueNum-a.valueNum).slice(0,3).map(r=>({ name:r.name, value:(r.valueNum>=0?'+':'-')+cur+this.fmt(Math.abs(r.valueNum)) })));
    return fillRows([]);
  }


  previewStyleText(mode) {
    if (mode === 'guquan') return '氪金TOP3 / 囤货TOP3 / 回血IP TOP3 / 海景TOP3 / 钱包进度';
    if (mode === 'business') return '消费排行 / 收藏排行 / 收入IP排行 / 利润排行 / 预算执行率';
    return '花费TOP3 / 数量TOP3 / 收益IP TOP3 / 利润TOP3 / 预算进度';
  }
  nameStyleLabels() {
    return {
      default: {
        ledgerTitle: '钱包', ledgerHelp: '当前钱包会跟随作品范围、收藏/出物模式和筛选条件一起变化。', consumeTitle: '消费表',
        budget: '本月预算', spent: '本月已花', remain: '剩余额度', progress: '预算进度', noBudget: '设置预算后可查看进度', overBudget: '已超出预算', nearBudget: '快到预算上限', okBudget: '预算正常',
        months: '近六个月消费表', reminderCenter: '提醒中心', noReminder: '暂无待处理事项。', reminderCount: '待处理',
        collectRanks: ['花费TOP3','具体谷子数量最多','最爱TOP3','IP TOP3'], saleRanks: ['卖价TOP3','卖出TOP3','收益IP TOP3','利润TOP3'],
        addItem: '＋ 新增谷子', walletMini: '钱包', miniBudget: '预算', miniSpent: '已花', miniRemain: '剩余'
      },
      guquan: {
        ledgerTitle: '钱包', ledgerHelp: '当前筛选下的钱包、吃土记录和待办会一起变化。', consumeTitle: '氪金表',
        budget: '本月预算', spent: '本月吃土', remain: '还能氪', progress: '钱包进度', noBudget: '设置预算后可查看钱包进度', overBudget: '泡面预警', nearBudget: '悠着点', okBudget: '钱包健康',
        months: '半年吃土记录', reminderCenter: '待办中心', noReminder: '暂无待处理事项。', reminderCount: '待处理',
        collectRanks: ['氪金TOP3','囤货TOP3','真爱TOP3','本命TOP3'], saleRanks: ['成交TOP3','出货TOP3','回血IP TOP3','海景TOP3'],
        addItem: '＋ 收谷', walletMini: '钱包', miniBudget: '预算', miniSpent: '已吃土', miniRemain: '还能氪'
      },
      business: {
        ledgerTitle: '预算管理', ledgerHelp: '当前页面按照筛选条件统计预算执行、支出排行与待处理事项。', consumeTitle: '支出表',
        budget: '本月预算', spent: '本月支出', remain: '剩余预算', progress: '预算执行率', noBudget: '设置预算后可查看执行率', overBudget: '已超出预算', nearBudget: '接近预算上限', okBudget: '预算正常',
        months: '近六个月支出', reminderCenter: '待处理事项', noReminder: '暂无待处理事项。', reminderCount: '待处理',
        collectRanks: ['消费排行','收藏排行','角色排行','系列IP排行'], saleRanks: ['成交排行','销售排行','收入IP排行','利润排行'],
        addItem: '＋ 新增收藏', walletMini: '预算管理', miniBudget: '预算', miniSpent: '支出', miniRemain: '剩余'
      }
    }[this.state.nameStyleMode || 'default'] || this.nameStyleLabels().default;
  }
  setNameStyle = (e) => this.updateSettingsDraft({ nameStyleMode: e.target.value });
  setDisplayMode = (e) => this.updateSettingsDraft({ displayMode: e.target.value });
  renderVals() {
    const cur = this.cur();
    const fieldVisible = (k) => this.isFieldVisible(k);
    const view = this.state.view || this.props.startView || 'dashboard';
    const { group, groupBy, search, charSel, typeSel, seriesFilter, formSel, statusSel, acquireSel, channelSel, purchaseChannelSel } = this.state;
    const methodSel = this.state.methodSel || [], setSel = this.state.setSel || [], tagSel = this.state.tagSel || [], raritySel = this.state.raritySel || [];
    const allItems = this.state.items;
    const workListForFilter = this.state.works || [];
    const curWorkForFilter = workListForFilter.find(w => w.id === this.state.currentWorkId) || workListForFilter[0] || { id: this.MAIN_WORK, group: this.DEFAULT_GROUP, name: '' };
    const workOfItem = (it) => workListForFilter.find(w => w.id === (it.workId || this.MAIN_WORK)) || { id: it.workId || this.MAIN_WORK, group: this.DEFAULT_GROUP, name: '默认作品' };
    const items = this.state.currentWorkId === this.ALL_WORKS ? allItems : groupBy === 'workGroup' ? allItems : groupBy === 'work' ? allItems.filter(it => (workOfItem(it).group || this.DEFAULT_GROUP) === (curWorkForFilter.group || this.DEFAULT_GROUP)) : allItems.filter(it => (it.workId || this.MAIN_WORK) === this.state.currentWorkId);
    const isAllWorks = this.state.currentWorkId === this.ALL_WORKS;

    // stats over all
    let totalIn = 0, totalSell = 0, totalProfit = 0, colCount = 0, saleCount = 0;
    items.forEach(it => { const e = this.enrich(it); totalIn += e.cost; if (this.groupOf(it) === '出物') saleCount += e.qty; else colCount += e.qty; if (e.sold) { totalSell += e.revenue; totalProfit += e.profit; } });

    const dashCount = (status) => items.filter(it => (it.status || '') === status).reduce((n,it)=>n + Math.max(1, parseInt(it.qty)||1), 0);
    const dashboardTodoRows = [
      { label:'待补款', status:'待补款', color:'#d34a61', hint:'需要补款的谷子' },
      { label:'待尾款', status:'待尾款', color:'#d9701f', hint:'等待支付尾款' },
      { label:'待国际', status:'已尾款', color:'#c8860d', hint:'本体已付，等待国际' },
      { label:'待排发', status:'排发中', color:'#2f6fdb', hint:'等待整理或排发' },
      { label:'待归家', status:'已发货', color:'#12a85f', hint:'已发货，等待到货' }
    ].map(x => ({ ...x, count: dashCount(x.status), onClick: () => this.openDashboardStatus(x.status) }));
    const dashboardSummaryRows = [
      { label:'总收藏', value: items.reduce((n,it)=>n+Math.max(1,parseInt(it.qty)||1),0)+' 件' },
      { label:'已归家', value: dashCount('已归家')+' 件' },
      { label:'排发中', value: dashCount('排发中')+' 件' },
      { label:'已出物', value: dashCount('已出物')+' 件' }
    ];
    const dashDate = (v) => { const d = new Date(v || 0); return isNaN(d.getTime()) || !v ? '—' : `${String(d.getMonth()+1).padStart(2,'0')}/${String(d.getDate()).padStart(2,'0')}`; };
    const dashboardRecentItems = [...items].sort((a,b)=>(b.updatedAt||b.createdAt||b.id||0)-(a.updatedAt||a.createdAt||a.id||0)).slice(0,5).map(it=>({ name:it.name||'未命名', meta:[it.character,it.type,it.status].filter(Boolean).join(' · '), date:dashDate(it.updatedAt||it.createdAt), onClick:()=>this.openEdit(it) }));
    const dashboardRecentDocs = [...(this.state.shippingRecords||[])].sort((a,b)=>(b.updatedAt||b.createdAt||0)-(a.updatedAt||a.createdAt||0)).slice(0,5).map(r=>({ type:r.typeLabel||this.shippingTypeLabel(r.type||'补充资料').module, title:[r.group,r.title,(r.images||[]).length+' 张图'].filter(Boolean).join(' · '), date:dashDate(r.updatedAt||r.createdAt) }));
    const nowDash = new Date(); const dashMonthKey = `${nowDash.getFullYear()}-${String(nowDash.getMonth()+1).padStart(2,'0')}`;
    const dashboardMonthCostNum = items.reduce((sum,it)=>{ const raw=it.purchaseDate||it.reminderDate||it.date||it.createdAt; const d=new Date(raw||0); if(!raw||isNaN(d.getTime())) return sum; const k=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`; return k===dashMonthKey ? sum + this.enrich(it).cost : sum; },0);

    // group tabs
    const colN = items.filter(i => this.groupOf(i) !== '出物').length, saleN = items.filter(i => this.groupOf(i) === '出物').length;
    const inhandN = items.filter(i => this.groupKind(i) === 'inhand').length;
    const airN = items.filter(i => this.groupKind(i) === 'air').length;
    const groupTabs = [
      { key: 'all', label: '全部', n: items.length },
      { key: 'inhand', label: '已归家', n: inhandN },
      { key: 'air', label: '空气谷', n: airN },
      { key: 'sale', label: '已出物', n: saleN }
    ].map(t => ({ ...t, style: this.tabStyle(group === t.key), onClick: () => this.setFilterState({ group: t.key }) }));
    const navGroupItems = [
      { key: 'all', label: '全部', iconPath: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z', n: items.length },
      { key: 'inhand', label: '已归家', iconPath: 'M3 11.5 12 4l9 7.5M5.5 10v9a1 1 0 0 0 1 1H10v-6h4v6h3.5a1 1 0 0 0 1-1v-9', n: inhandN },
      { key: 'air', label: '空气谷', iconPath: 'M7 18a4 4 0 0 1-.5-7.97A5 5 0 0 1 16 9.5a3.5 3.5 0 0 1 .5 8.5z', n: airN },
      { key: 'sale', label: '已出物', iconPath: 'M5 17 10 12l3 3 6-8M14 7h5v5', n: saleN }
    ].map(t => ({ label: t.label, iconPath: t.iconPath, n: t.n, active: group === t.key, tipText: this.GLOSSARY[t.label] || '', hasTip: !!this.GLOSSARY[t.label], style: this.navItemStyle(group === t.key), iconStyle: this.navIconStyle(group === t.key), countStyle: this.navCountStyle(group === t.key), onClick: () => this.setFilterState({ group: t.key }) }));

    // base list (group tab filter)
    const matchGroup = it => group === 'all' ? true : group === 'collection' ? this.groupOf(it) !== '出物' : group === 'inhand' ? this.groupKind(it) === 'inhand' : group === 'air' ? this.groupKind(it) === 'air' : this.groupOf(it) === '出物';
    const baseList = items.filter(matchGroup);

    // chips
    const charOrderList = this.orderedChars();
    const presentChars = [...new Set(items.map(i => i.character))];
    const charList = ['全部', ...charOrderList.filter(c => presentChars.includes(c)), ...presentChars.filter(c => c && !charOrderList.includes(c))];
    const charChips = charList.map(c => { const ci = this.charImg(c); const active = c === '全部' ? charSel.length === 0 : charSel.includes(c); return { label: c, hasImg: !!ci, ...this.chipDrag(c, 'char'), onDblClick: (ev) => this.renameCharacter(c, ev), imgStyle: { width: '18px', height: '18px', borderRadius: '50%', backgroundImage: `url(${ci})`, backgroundSize: 'cover', backgroundPosition: 'center', marginLeft: '-3px', flexShrink: 0 }, style: this.chipStyle(active), onClick: this.chipClick(() => this.toggleSel('charSel', c === '全部' ? '__all__' : c)) }; });
    const presentTypes = [...new Set(items.map(i => i.type))];
    const typeBase = (this.state.typesList && this.state.typesList.length) ? this.state.typesList : this.TYPES;
    const typeList = ['全部', ...typeBase.filter(t => presentTypes.includes(t)), ...presentTypes.filter(t => t && !typeBase.includes(t))];
    const typeChips = typeList.map(t => ({ label: t, ...this.chipDrag(t, 'type'), onDblClick: t === '全部' ? null : (ev) => this.renameTypeItem(t, ev), style: this.chipStyle(t === '全部' ? typeSel.length === 0 : typeSel.includes(t)), onClick: this.chipClick(() => this.toggleSel('typeSel', t === '全部' ? '__all__' : t)) }));
    const statsOn = this.state.statsOn || {};
    const statEnabled = (k) => statsOn[k] !== false;
    const _seriesLabel = this.flabel('series');
    const _setLabel = (this.state.fieldLabels || {}).set || '系列收藏';
    const groupBaseOptions = [{ k: 'none', l: '不分组', always: true }, { k: 'workGroup', l: '按系列IP', always: true }, { k: 'work', l: '按作品', always: true }, { k: 'set', l: '按' + _setLabel }, { k: 'character', l: '按角色' }, { k: 'type', l: '按种类' }, { k: 'series', l: '按' + _seriesLabel }, { k: 'form', l: '按形态' }, { k: 'status', l: '按状态' }, { k: 'acquire', l: '按来源' }, { k: 'method', l: '按' + this.flabel('method') }, { k: 'channel', l: '按平台' }, { k: 'purchaseChannel', l: '按渠道' }, { k: 'tags', l: '按' + this.flabel('tags') }, { k: 'rarity', l: '按' + this.flabel('rarity') }].filter(o => o.always || (o.k === 'set' ? statEnabled('set') : (['method','tags','rarity'].includes(o.k) ? statEnabled(o.k) : (fieldVisible(o.k) && statEnabled(o.k))))); 
    const customGroupOptions = (this.state.customFields || []).filter(f => statEnabled(f.key)).map(f => ({ k: 'custom:' + f.key, l: '按' + f.label }));
    let groupBySafe = groupBy;
    const availableGroupKeys = new Set([...groupBaseOptions, ...customGroupOptions].map(o => o.k));
    if (!availableGroupKeys.has(groupBySafe)) groupBySafe = 'none';
    const groupByChips = [...groupBaseOptions, ...customGroupOptions].map(o => ({ label: o.l, style: this.chipStyle(groupBySafe === o.k), onClick: () => this.setFilterState({ groupBy: o.k }) }));
    const presentSeries = [...new Set(items.map(i => i.series).filter(Boolean))];
    const seriesBase = (this.state.seriesList && this.state.seriesList.length) ? this.state.seriesList : presentSeries;
    const seriesOrdered = [...seriesBase.filter(x => presentSeries.includes(x)), ...presentSeries.filter(x => !seriesBase.includes(x))];
    const seriesChips = ['全部', ...seriesOrdered].map(x => ({ label: x, ...this.chipDrag(x, 'series'), onDblClick: x === '全部' ? null : (ev) => this.renameSeriesItem(x, ev), style: this.chipStyle(seriesFilter === x), onClick: this.chipClick(() => this.setState(s => (s.batchMode && (s.selectedIds || []).length) ? { seriesFilter: x, selectedIds: [] } : { seriesFilter: x })) }));
    const showSeriesFilter = fieldVisible('series');
    const formBase = (this.state.formOrder && this.state.formOrder.length) ? this.state.formOrder : this.FORMS;
    const formChips = ['全部', ...formBase].map(x => ({ label: x, ...this.chipDrag(x, 'form'), onDblClick: x === '全部' ? null : (ev) => this.renameListOption('formOrder', 'zzz_form_order', 'form', x, '形态', ev), style: this.chipStyle(x === '全部' ? formSel.length === 0 : formSel.includes(x)), onClick: this.chipClick(() => this.toggleSel('formSel', x === '全部' ? '__all__' : x)) }));
    const statusBase = (this.state.statusList && this.state.statusList.length) ? this.state.statusList : this.STATUSES;
    const statusChips = ['全部', ...statusBase].map(x => ({ label: x, ...this.chipDrag(x, 'status'), onDblClick: x === '全部' ? null : (ev) => this.renameListOption('statusList', 'zzz_status', 'status', x, '状态', ev), style: this.chipStyle(x === '全部' ? statusSel.length === 0 : statusSel.includes(x)), onClick: this.chipClick(() => this.toggleSel('statusSel', x === '全部' ? '__all__' : x)) }));
    const showStatusFilter = fieldVisible('status') && !!this.state.filterOn.status;
    const acquireBase = (this.state.acquireOrder && this.state.acquireOrder.length) ? this.state.acquireOrder : ['日谷','国谷','同人'];
    const acquireChips = ['全部', ...acquireBase].map(x => ({ label: x, ...this.chipDrag(x, 'acquire'), onDblClick: x === '全部' ? null : (ev) => this.renameListOption('acquireOrder', 'zzz_acquire_order', 'acquire', x, '来源方式', ev), style: this.chipStyle(x === '全部' ? acquireSel.length === 0 : acquireSel.includes(x)), onClick: this.chipClick(() => this.toggleSel('acquireSel', x === '全部' ? '__all__' : x)) }));
    const presentMethods = [...new Set(items.map(i => i.method).filter(Boolean))];
    const methodBase = [...new Set([...(this.state.methodList || []), ...[].concat(...Object.values(this.SOURCE_METHODS || {}))])];
    const methodOrdered = [...methodBase.filter(x => presentMethods.includes(x)), ...presentMethods.filter(x => !methodBase.includes(x))];
    const methodChips = ['全部', ...methodOrdered].map(x => ({ label: x, style: this.chipStyle(x === '全部' ? methodSel.length === 0 : methodSel.includes(x)), onClick: this.chipClick(() => this.toggleSel('methodSel', x === '全部' ? '__all__' : x)) }));
    const presentChannels = [...new Set(items.map(i => i.channel).filter(Boolean))];
    const chBase = (this.state.channels && this.state.channels.length) ? this.state.channels : presentChannels;
    const chOrdered = [...chBase.filter(x => presentChannels.includes(x)), ...presentChannels.filter(x => !chBase.includes(x))];
    const channelChips = ['全部', ...chOrdered].map(x => ({ label: x, ...this.chipDrag(x, 'channel'), onDblClick: x === '全部' ? null : (ev) => this.renameChannelItem(x, ev), style: this.chipStyle(x === '全部' ? channelSel.length === 0 : channelSel.includes(x)), onClick: this.chipClick(() => this.toggleSel('channelSel', x === '全部' ? '__all__' : x)) }));
    const showChannelFilter = fieldVisible('channel');
    const presentPurchaseChannels = [...new Set(items.map(i => i.purchaseChannel).filter(Boolean))];
    const pcBase = (this.state.purchaseChannels && this.state.purchaseChannels.length) ? this.state.purchaseChannels : this.CHANNELS;
    const pcOrdered = [...pcBase.filter(x => presentPurchaseChannels.includes(x)), ...presentPurchaseChannels.filter(x => !pcBase.includes(x))];
    const purchaseChannelChips = ['全部', ...pcOrdered].map(x => ({ label: x, ...this.chipDrag(x, 'purchaseChannel'), onDblClick: x === '全部' ? null : (ev) => this.renamePurchaseChannelItem(x, ev), style: this.chipStyle(x === '全部' ? (purchaseChannelSel || []).length === 0 : (purchaseChannelSel || []).includes(x)), onClick: this.chipClick(() => this.toggleSel('purchaseChannelSel', x === '全部' ? '__all__' : x)) }));
    const showPurchaseChannelFilter = fieldVisible('purchaseChannel');
    const setOptionsForFilter = (this.state.sets || []).filter(st => this.state.currentWorkId === this.ALL_WORKS || (st.workId || this.MAIN_WORK) === this.state.currentWorkId).map(st => ({ value: st.id, label: st.name || '未命名套装' }));
    const presentSetKeys = [...new Set(items.map(i => i.setId || i.setName).filter(Boolean))];
    presentSetKeys.forEach(k => { if (!setOptionsForFilter.some(s => s.value === k || s.label === k)) setOptionsForFilter.push({ value: k, label: k }); });
    const setChips = [{ value: '__all__', label: '全部' }, ...setOptionsForFilter].map(x => ({ label: x.label, style: this.chipStyle(x.value === '__all__' ? setSel.length === 0 : setSel.includes(x.value)), onClick: this.chipClick(() => this.toggleSel('setSel', x.value)) }));
    const tagPresent = [...new Set(items.flatMap(i => i.tags || []))];
    const rarityPresent = [...new Set(items.flatMap(i => i.rarity || []))];
    const tagBase = (this.state.tradeTags && this.state.tradeTags.length) ? this.state.tradeTags : this.TRADE_TAGS;
    const rarityBase = (this.state.rarityTags && this.state.rarityTags.length) ? this.state.rarityTags : this.RARITY_TAGS;
    const tagOrdered = [...tagBase.filter(t => tagPresent.includes(t)), ...tagPresent.filter(t => !tagBase.includes(t))];
    const rarityOrdered = [...rarityBase.filter(t => rarityPresent.includes(t)), ...rarityPresent.filter(t => !rarityBase.includes(t))];
    const tagChips = ['全部', ...tagOrdered].map(x => ({ label: x, style: this.chipStyle(x === '全部' ? tagSel.length === 0 : tagSel.includes(x)), onClick: this.chipClick(() => this.toggleSel('tagSel', x === '全部' ? '__all__' : x)) }));
    const rarityChips = ['全部', ...rarityOrdered].map(x => ({ label: x, style: this.chipStyle(x === '全部' ? raritySel.length === 0 : raritySel.includes(x)), onClick: this.chipClick(() => this.toggleSel('raritySel', x === '全部' ? '__all__' : x)) }));
    const showMethodFilter = !!(this.state.filterOn || {}).method;
    const showSetFilter = !!(this.state.filterOn || {}).set;
    const hasTagsField = fieldVisible('tags');
    const hasRarityField = fieldVisible('rarity');
    const showTagFilter = hasTagsField && !!(this.state.filterOn || {}).tags;
    const showRarityFilter = hasRarityField && !!(this.state.filterOn || {}).rarity;
    const customFilterRows = (this.state.customFields || []).filter(f => this.state.filterOn[f.key]).map(f => {
      const present = [...new Set(items.map(i => i.custom && i.custom[f.key]).filter(Boolean))];
      const orderMap = this.state.customFilterOrder || {};
      const ordered = [...(orderMap[f.key] || []).filter(x => present.includes(x)), ...present.filter(x => !(orderMap[f.key] || []).includes(x))];
      const sel = ((this.state.customFilterSel || {})[f.key]) || [];
      const chips = ['全部', ...ordered].map(x => ({ label: x, ...this.customChipDrag(f.key, x), onDblClick: x === '全部' ? null : (ev) => this.renameCustomFilterValue(f.key, x, ev), style: this.chipStyle(x === '全部' ? sel.length === 0 : sel.includes(x)), onClick: this.chipClick(() => this.toggleCustomFilter(f.key, x === '全部' ? '__all__' : x)) }));
      return { key: f.key, label: f.label, chips };
    });
    const dType = this.state.draft ? this.state.draft.type : '';
    const dChar = this.state.draft ? this.state.draft.character : '';
    const charMenuItems = this.orderedChars().map(c => { const ci = this.charImg(c); return { name: c, hasImg: !!ci, imgStyle: { width: '18px', height: '18px', borderRadius: '50%', backgroundImage: `url(${ci})`, backgroundSize: 'cover', backgroundPosition: 'center', flexShrink: 0 }, onPick: () => this.pickCharacter(c), onAvatar: (ev) => { ev.stopPropagation(); this.uploadCharAvatar(c); }, onDel: (ev) => this.delCharacter(c, ev), rowStyle: this.menuRow(dChar === c) }; });
    const charDisplay = dChar || '选择角色';
    const _dWorks = this.state.works || [];
    const _dWorkId = this.draftWorkId(this.state.draft || {});
    const _dWork = _dWorks.find(w => w.id === _dWorkId) || {};
    const draftWorkName = _dWork.name || '选择作品';
    const draftWorkGroupName = _dWork.group || this.DEFAULT_GROUP;
    const _dwG = {}; _dWorks.forEach(w => { const g = w.group || this.DEFAULT_GROUP; (_dwG[g] = _dwG[g] || []).push(w); });
    const draftWorkMenuGroups = Object.keys(_dwG).map(g => ({ group: g, works: _dwG[g].map(w => ({ name: w.name || '未命名作品', active: w.id === _dWorkId, onPick: () => this.pickDraftWork(w.id) })) }));
    const _dSellStatus = (this.state.draft && this.state.draft.status) || '';
    const draftIsSelling = /出物|出售|卖出|已出/.test(_dSellStatus);
    const draftNotSelling = !draftIsSelling;
    const _mk = this.state.manageKind || '';
    const _mc = this.manageConfig()[_mk] || (this.cfKeyOf(_mk) ? { label: ((this.state.customFields||[]).find(f=>f.key===this.cfKeyOf(_mk))||{}).label || '字段', field: 'custom', custom: true } : null);
    const _mLabelCustom = this.cfKeyOf(_mk) ? (((this.state.customFields||[]).find(f=>f.key===this.cfKeyOf(_mk))||{}).label || '字段') : '';
    const _lblKey = ({character:'character',type:'type',series:'series',channel:'channel',purchaseChannel:'purchaseChannel',status:'status',form:'form',acquire:'acquire',method:'method',tradeTags:'tags',rarityTags:'rarity'})[_mk];
    const _mLabel = _lblKey ? ((this.state.fieldLabels||{})[_lblKey] || this.FIELD_DEFAULTS[_lblKey] || (_mc&&_mc.label)) : (_mc?_mc.label:'');
    const manageTitle = _mc ? ('管理 · ' + _mLabel) : '资料管理';
    const _cfk = this.cfKeyOf(_mk);
    const manageCanRenameLabel = (!!_lblKey && Object.prototype.hasOwnProperty.call(this.FIELD_DEFAULTS, _lblKey)) || !!_cfk;
    const onManageRenameLabel = _cfk ? (() => this.renameCustomFieldLabel(_cfk)) : (() => this.manageRenameLabel(_mk));
    const _mFilterKey = _lblKey || _cfk || (_mc && _mc.field) || '';
    const manageCanToggle = !!_lblKey || !!_cfk;
    const manageCanBatch = ['status','character','type','series','acquire','method','channel','purchaseChannel','form'].includes(_mFilterKey);
    const manageFilterOn = _mFilterKey ? !!(this.state.filterOn || {})[_mFilterKey] : false;
    const manageGroupOn = _mFilterKey ? (this.state.statsOn || {})[_mFilterKey] !== false : false;
    const manageBatchOn = _mFilterKey ? (this.state.batchOn || {})[_mFilterKey] !== false : false;
    const onManageToggleFilter = _mFilterKey ? this.toggleFilterOn(_mFilterKey) : (() => {});
    const onManageToggleBatch = _mFilterKey ? this.toggleBatchOn(_mFilterKey) : (() => {});
    const onManageToggleGroup = _mFilterKey ? this.toggleStatsOn(_mFilterKey) : (() => {});
    const manageFilterStyle = { padding: '4px 12px', borderRadius: '999px', fontFamily: 'inherit', fontSize: '12px', fontWeight: 700, cursor: 'pointer', border: '1px solid', borderColor: manageFilterOn ? 'transparent' : '#ded7ee', background: manageFilterOn ? this.accentColor() : '#fff', color: manageFilterOn ? '#fff' : '#8b84ad' };
    const manageGroupStyle = { padding: '4px 12px', borderRadius: '999px', fontFamily: 'inherit', fontSize: '12px', fontWeight: 700, cursor: 'pointer', border: '1px solid', borderColor: manageGroupOn ? 'transparent' : '#ded7ee', background: manageGroupOn ? this.accentColor() : '#fff', color: manageGroupOn ? '#fff' : '#8b84ad' };
    const manageBatchStyle = { padding: '4px 12px', borderRadius: '999px', fontFamily: 'inherit', fontSize: '12px', fontWeight: 700, cursor: 'pointer', border: '1px solid', borderColor: manageBatchOn ? 'transparent' : '#ded7ee', background: manageBatchOn ? this.accentColor() : '#fff', color: manageBatchOn ? '#fff' : '#8b84ad' };
    const _mlist = _mc ? this.manageListOf(_mk) : [];
    const manageRows = _mlist.map((nm, i) => { const _av = _mk === 'character' ? this.charImg(nm) : ''; return { name: nm, canUp: i>0, canDown: i<_mlist.length-1, onUp: () => this.manageMoveItem(_mk, nm, -1), onDown: () => this.manageMoveItem(_mk, nm, 1), onRename: () => this.manageRenameItem(_mk, nm), onDel: () => this.manageDeleteItem(_mk, nm), isChar: _mk === 'character', hasAvatar: !!_av, noAvatarText: _mk === 'character' && !_av, avatarStyle: _av ? { width: '30px', height: '30px', borderRadius: '50%', backgroundImage: `url(${_av})`, backgroundSize: 'cover', backgroundPosition: 'center', flexShrink: 0, cursor: 'pointer' } : { width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(50,38,90,.06)', border: '1px dashed #d4cee7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a49ec4', fontSize: '9px', flexShrink: 0, cursor: 'pointer' }, onAvatar: () => this.uploadCharAvatar(nm), draggable: true, onDragStart: (e) => { this._mgDrag = i; if(e&&e.dataTransfer){e.dataTransfer.effectAllowed='move';} }, onDragOver: (e) => { if(e&&e.preventDefault) e.preventDefault(); }, onDrop: (e) => { if(e&&e.preventDefault) e.preventDefault(); this.manageDragReorder(_mk, this._mgDrag, i); this._mgDrag=null; }, idx: i, onTouchStart: this.mgTouchStart(_mk, i), onTouchMove: this.mgTouchMove, onTouchEnd: this.mgTouchEnd }; });
    const manageAddText = _mc ? ('＋ 新增' + _mc.label) : '＋ 新增';
    const onManageAdd = () => this.manageAddItem(_mk);
    const typeMenuItems = (this.state.typesList || []).map(c => ({ name: c, onPick: () => this.pickType(c), onRename: (ev) => this.renameTypeItem(c, ev), onDel: (ev) => this.delTypeItem(c, ev), rowStyle: this.menuRow(dType === c) }));
    const typeDisplay = dType || '选择种类';
    const hasTypeMenuItems = (this.state.typesList || []).length > 0;
    const dForm = this.state.draft ? (this.state.draft.form || '') : '';
    const formMenuItems = ((this.state.formOrder && this.state.formOrder.length) ? this.state.formOrder : this.FORMS).map(c => ({ name: c, onPick: () => this.pickForm(c), onRename: (ev) => this.renameListOption('formOrder', 'zzz_form_order', 'form', c, '形态', ev), onDel: (ev) => this.delListOption('formOrder', 'zzz_form_order', 'form', c, ev), rowStyle: this.menuRow(dForm === c) }));
    const formDisplay = dForm || '选择形态';
    const dStatus = this.state.draft ? (this.state.draft.status || '') : '';
    const statusMenuItems = ((this.state.statusList && this.state.statusList.length) ? this.state.statusList : this.STATUSES).map(c => ({ name: c, onPick: () => this.pickStatus(c), onRename: (ev) => this.renameListOption('statusList', 'zzz_status', 'status', c, '状态', ev), onDel: (ev) => this.delListOption('statusList', 'zzz_status', 'status', c, ev), rowStyle: this.menuRow(dStatus === c) }));
    const statusDisplay = dStatus || '选择状态';
    const arrivedState = dStatus === '已归家' || dStatus === '已到货';
    const soldState = dStatus === '已出物' || dStatus === '出售中' || dStatus === '已出/已卖出';
    const showReminderFields = !!dStatus && !arrivedState && !soldState;
    const reminderDateLabel = dStatus === '已下单' ? '下单日期' : dStatus === '待补款' ? '补款截止日' : dStatus === '已补款' ? '补款日期' : dStatus === '待尾款' ? '尾款截止日' : dStatus === '已尾款' ? '尾款日期' : dStatus === '排发中' ? '预计排发日' : dStatus === '已发货' ? '发货日' : dStatus === '已归家' || dStatus === '已到货' ? '归家日期' : dStatus === '已出物' || dStatus === '已出/已卖出' ? '出物日期' : '提醒日期';
    const reminderDateHint = dStatus === '已下单' ? '· 购买日期' : (dStatus === '待补款' || dStatus === '待尾款') ? '· 到期提醒' : '· 状态记录';
    const dAcquire = this.state.draft ? (this.state.draft.acquire || '') : '';
    const acquireMenuItems = ((this.state.acquireOrder && this.state.acquireOrder.length) ? this.state.acquireOrder : ['日谷','国谷','同人']).map(c => ({ name: c, onPick: () => this.pickAcquire(c), onRename: (ev) => this.renameListOption('acquireOrder', 'zzz_acquire_order', 'acquire', c, '来源方式', ev), onDel: (ev) => this.delListOption('acquireOrder', 'zzz_acquire_order', 'acquire', c, ev), rowStyle: this.menuRow(dAcquire === c) }));
    const acquireDisplay = dAcquire || '选择来源方式';
    // 来源驱动：购买方式候选（推荐项固定置顶，其余按你自己维护的列表顺序排在后面）
    const dSource = dAcquire;
    const dMethod = this.state.draft ? (this.state.draft.method || '') : '';
    const _methodPreset = this.SOURCE_METHODS[dSource] || [];
    const _methodStored = this.state.methodList || [];
    const _methodRest = _methodStored.filter(x => !_methodPreset.includes(x));
    if (dMethod && !_methodPreset.includes(dMethod) && !_methodRest.includes(dMethod)) _methodRest.push(dMethod);
    let _methodPresetFlat = _methodPreset.filter(x => x !== '盲抽');
    let _methodRestFlat = _methodRest.filter(x => x !== '盲抽');
    if (!_methodPresetFlat.length && !_methodRestFlat.length) _methodRestFlat = ['通贩','场贩','代购','拼团','抱盒','单买','二手'];
    const menuItems = [];
    _methodPresetFlat.forEach(c => menuItems.push({ name: c, isDivider: false, notDivider: true, isSub: false, onPick: () => this.pickMethod(c), rowStyle: this.menuRow(dMethod === c) }));
    if (_methodPresetFlat.length && _methodRestFlat.length) menuItems.push({ name: '', isDivider: true, notDivider: false, isSub: false, onPick: () => {}, rowStyle: {} });
    _methodRestFlat.forEach(c => menuItems.push({ name: c, isDivider: false, notDivider: true, isSub: false, onPick: () => this.pickMethod(c), rowStyle: this.menuRow(dMethod === c) }));
    menuItems.push({ name: '', isDivider: true, notDivider: false, isSub: false, onPick: () => {}, rowStyle: {} });
    const _gr = this.state.draft ? (this.state.draft.gachaResult || '自抽') : '自抽';
    menuItems.push({ name: '盲抽', isDivider: false, notDivider: true, isSub: false, onPick: () => this.pickMethod('盲抽'), rowStyle: this.menuRow(dMethod === '盲抽' && !_gr) });
    [['自抽', '　├ 自抽'], ['置换/收现', '　└ 置换 / 收现']].forEach(([val, lbl]) => {
      const active = val === '置换/收现' ? (_gr === '置换' || _gr === '收现' || _gr === '置换/收现') : _gr === val;
      menuItems.push({ name: lbl, isDivider: false, notDivider: true, isSub: true, onPick: () => this.pickMethodGacha(val), rowStyle: this.menuRow(dMethod === '盲抽' && active) });
    });
    const methodMenuItems = menuItems;
    const methodDisplay = dMethod === '盲抽' ? ('盲抽（' + ((_gr === '置换' || _gr === '收现') ? '置换 / 收现' : (_gr || '自抽')) + '）') : (dMethod || '选择购买方式');
    const dSwapped = this.state.draft ? (this.state.draft.gachaResult || '自抽') : '自抽';
    const swapMenuItems = [{ name: '自抽（不置换）', val: '自抽' }, { name: '置换 / 收现', val: '置换/收现' }].map(o => ({ name: o.name, onPick: () => this.pickGachaResult(o.val), rowStyle: this.menuRow(o.val === '置换/收现' ? (dSwapped === '置换' || dSwapped === '收现' || dSwapped === '置换/收现') : dSwapped === o.val) }));
    const swappedDisplay = (dSwapped === '置换' || dSwapped === '收现' || dSwapped === '置换/收现') ? '置换 / 收现' : '自抽（不置换）';
    const dSwapChar = this.state.draft ? (this.state.draft.swapCharacter || '') : '';
    const swapCharMenuItems = this.orderedChars().map(c => { const ci = this.charImg(c); return { name: c, hasImg: !!ci, imgStyle: { width: '18px', height: '18px', borderRadius: '50%', backgroundImage: `url(${ci})`, backgroundSize: 'cover', backgroundPosition: 'center', flexShrink: 0 }, onPick: () => this.pickSwapCharacter(c), rowStyle: this.menuRow(dSwapChar === c) }; });
    const swapCharDisplay = dSwapChar || '（不填）';
    const swapHint = '置换 / 收现获得';
    const swapNoteLabel = '置换 / 收现说明（可选）';
    const draftIsSwapKind = (dSwapped === '置换' || dSwapped === '收现' || dSwapped === '置换/收现');
    const swapCharHasAvatar = !!(dSwapChar && this.charImg(dSwapChar));
    const swapCharAvatarStyle = { width: '18px', height: '18px', borderRadius: '50%', backgroundImage: `url(${this.charImg(dSwapChar)})`, backgroundSize: 'cover', backgroundPosition: 'center', flexShrink: 0 };
    const dSeries = this.state.draft ? (this.state.draft.series || '') : '';
    const seriesMenuItems = (this.state.seriesList || []).map(c => ({ name: c, onPick: () => this.pickSeries(c), onRename: (ev) => this.renameSeriesItem(c, ev), onDel: (ev) => this.delSeriesItem(c, ev), rowStyle: this.menuRow(dSeries === c) }));
    const seriesDisplay = dSeries || '（未分类）';
    const hasSeriesMenuItems = (this.state.seriesList || []).length > 0;

    const dChannel = this.state.draft ? (this.state.draft.channel || '') : '';
    const dPurchaseChannel = this.state.draft ? (this.state.draft.purchaseChannel || '') : '';
    const dReminder = this.state.draft ? (this.state.draft.reminderType || '') : '';
    const reminderMenuItems = ((this.state.reminderTypes && this.state.reminderTypes.length ? this.state.reminderTypes : this.REMINDER_TYPES) || []).map(c => ({ name: c, onPick: () => this.pickReminderType(c), onDel: (ev) => this.delReminderItem(c, ev), rowStyle: this.menuRow(dReminder === c) }));
    const reminderDisplay = dReminder || '不提醒';
    const hiddenChannels = this.state.hiddenChannels || [];
    const _platPreset = (this.SOURCE_PLATFORMS[dSource] || []).filter(x => !hiddenChannels.includes(x));
    const _storedCh = (this.state.channels || []).filter(x => !hiddenChannels.includes(x));
    const _dChannelCur = this.state.draft ? (this.state.draft.channel || '') : '';
    const _chRest = _storedCh.filter(x => !_platPreset.includes(x));
    if (_dChannelCur && !_platPreset.includes(_dChannelCur) && !_chRest.includes(_dChannelCur)) _chRest.push(_dChannelCur);
    const _chRowStyle = (c) => ({ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 9px', borderRadius: '8px', background: dChannel === c ? 'rgba(255,51,85,.10)' : 'transparent' });
    const channelMenuItems = [
      ..._platPreset.map(c => ({ name: c, active: dChannel === c, isDivider: false, notDivider: true, onPick: () => this.pickChannel(c), onRename: (ev) => this.renameChannelItem(c, ev), onDel: (ev) => this.delChannelItem(c, ev), rowStyle: _chRowStyle(c) })),
      ...(_platPreset.length && _chRest.length ? [{ name: '', isDivider: true, notDivider: false, onPick: () => {}, onRename: () => {}, onDel: () => {}, rowStyle: {} }] : []),
      ..._chRest.map(c => ({ name: c, active: dChannel === c, isDivider: false, notDivider: true, onPick: () => this.pickChannel(c), onRename: (ev) => this.renameChannelItem(c, ev), onDel: (ev) => this.delChannelItem(c, ev), rowStyle: _chRowStyle(c) }))
    ];
    const hiddenPurchaseChannels = this.state.hiddenPurchaseChannels || [];
    const _pcStored = ((this.state.purchaseChannels && this.state.purchaseChannels.length) ? this.state.purchaseChannels : this.CHANNELS).filter(x => !hiddenPurchaseChannels.includes(x));
    const _pcOrder = [...new Set([..._pcStored, ...(dPurchaseChannel ? [dPurchaseChannel] : [])])];
    const purchaseChannelMenuItems = _pcOrder.map(c => ({ name: c, active: dPurchaseChannel === c, onPick: () => this.pickPurchaseChannel(c), onRename: (ev) => this.renamePurchaseChannelItem(c, ev), onDel: (ev) => this.delPurchaseChannelItem(c, ev), rowStyle: this.menuRow(dPurchaseChannel === c) }));
    // rows
    const s = (search || '').toLowerCase();
    const matchSearch = it => !s || [it.name, it.note, it.channel, it.purchaseChannel, it.subtype, it.character, it.type, it.series, (workOfItem(it).group || ''), (workOfItem(it).name || '')].some(x => (x || '').toLowerCase().includes(s));
    const matchForm = it => !fieldVisible('form') || formSel.length === 0 || formSel.includes(it.form || '通用');
    const matchStatus = it => !fieldVisible('status') || statusSel.length === 0 || statusSel.includes(it.status || '已收藏');
    const matchAcquire = it => !fieldVisible('acquire') || acquireSel.length === 0 || acquireSel.includes(it.acquire || '直购');
    const matchMethod = it => !(this.state.filterOn || {}).method || methodSel.length === 0 || methodSel.includes(it.method || '');
    const matchSet = it => !(this.state.filterOn || {}).set || setSel.length === 0 || setSel.includes(it.setId || it.setName || '');
    const matchChannel = it => !fieldVisible('channel') || channelSel.length === 0 || channelSel.includes(it.channel || '');
    const matchPurchaseChannel = it => !fieldVisible('purchaseChannel') || (purchaseChannelSel || []).length === 0 || (purchaseChannelSel || []).includes(it.purchaseChannel || '');
    const matchCustomFilters = it => Object.entries(this.state.customFilterSel || {}).every(([k, arr]) => !arr || !arr.length || arr.includes((it.custom && it.custom[k]) || ''));
    const matchTags = it => (!(this.state.filterOn || {}).tags || tagSel.length === 0 || tagSel.every(t => (it.tags || []).includes(t))) && (!(this.state.filterOn || {}).rarity || raritySel.length === 0 || raritySel.every(t => (it.rarity || []).includes(t)));
    const filteredBase = baseList.filter(it => (!fieldVisible('character') || charSel.length === 0 || charSel.includes(it.character)) && (!fieldVisible('type') || typeSel.length === 0 || typeSel.includes(it.type)) && (!fieldVisible('series') || seriesFilter === '全部' || (it.series || '') === seriesFilter) && matchForm(it) && matchStatus(it) && matchAcquire(it) && matchMethod(it) && matchSet(it) && matchChannel(it) && matchPurchaseChannel(it) && matchCustomFilters(it) && matchTags(it) && matchSearch(it));
    const sortKey = this.state.tableSortKey || '';
    const sortDir = this.state.tableSortDir === 'asc' ? 1 : -1;
    const sortText = v => String(v || '').trim();
    const sortNum = v => { const n = Number(v); return Number.isFinite(n) ? n : 0; };
    const sortDateNum = v => { const t = v ? new Date(v + 'T00:00:00').getTime() : 0; return Number.isFinite(t) ? t : 0; };
    const sortValue = (it, key) => { const e = this.enrich(it); const typeFull = (it.type || '') + (it.subtype ? ' · ' + it.subtype : ''); const ship = e.sd + e.si; const map = { name: sortText(it.name), character: sortText(it.character), type: sortText(typeFull), group: sortText(this.groupOf(it)), status: sortText(it.status), qty: sortNum(e.qty), original: sortNum(it.originalPrice), buy: sortNum(e.buy), ship: sortNum(ship), sell: sortNum(e.sell), profit: sortNum(e.profit), channel: sortText(it.channel), purchaseChannel: sortText(it.purchaseChannel), date: sortDateNum(it.buyDate) }; return map[key]; };
    const filtered = [...filteredBase].sort((a, b) => {
      if (view === 'table' && sortKey) {
        const av = sortValue(a, sortKey), bv = sortValue(b, sortKey);
        if (typeof av === 'string' || typeof bv === 'string') return sortText(av).localeCompare(sortText(bv), 'zh-Hans') * sortDir;
        return (av - bv) * sortDir;
      }
      const ra = this.reminderInfo(a) || {}, rb = this.reminderInfo(b) || {}; if (!!ra.active !== !!rb.active) return ra.active ? -1 : 1; if (ra.active && rb.active) return ra.days - rb.days; return 0;
    });
    const sortMark = k => this.state.tableSortKey === k ? (this.state.tableSortDir === 'asc' ? '↑' : '↓') : '↕';
    const tableColumnDefs = this.tableColumnDefs();
    const tableVisibleColumns = tableColumnDefs.filter(c => this.tableColumnVisible(c.key));
    const tableGridColumns = tableVisibleColumns.map(c => c.width).join(' ');
    const tableGridStyle = { gridTemplateColumns: tableGridColumns };
    const tableMinWidth = tableVisibleColumns.reduce((sum, c) => sum + (parseInt(c.width, 10) || 0), 0);
    const tableGridOuterStyle = { minWidth: Math.max(720, tableMinWidth) + 'px' };
    const tableColumnSummary = '当前显示 ' + tableVisibleColumns.length + ' / ' + tableColumnDefs.length + ' 列';
    const tableColumnChips = tableColumnDefs.map(c => {
      const on = this.tableColumnVisible(c.key);
      return {
        label: (on ? '✓ ' : '') + c.label + (c.locked ? ' · 固定' : ''),
        onClick: () => this.toggleTableColumn(c.key),
        style: { fontFamily: 'inherit', fontSize: '12.5px', fontWeight: 700, cursor: c.locked ? 'default' : 'pointer', color: on ? '#fff' : '#595287', background: on ? 'var(--accent,#ff3355)' : 'rgba(50,38,90,.04)', border: '1px solid ' + (on ? 'transparent' : 'var(--accent-border,#ded7ee)'), borderRadius: '999px', padding: '6px 11px', opacity: c.locked ? 0.78 : 1 }
      };
    });
    let fQty = 0, fCost = 0, fSell = 0, fProfit = 0, fSold = false;
    const _batchSel = (this.state.batchMode && (this.state.selectedIds || []).length) ? new Set(this.state.selectedIds) : null;
    const _summaryItems = _batchSel ? filtered.filter(it => _batchSel.has(it.id)) : filtered;
    _summaryItems.forEach(it => { const e = this.enrich(it); fQty += e.qty; fCost += e.cost; if (e.sold) { fSell += e.revenue; fProfit += e.profit; fSold = true; } });
    const fSummaryLabel = _batchSel ? '已选' : '当前筛选';
    const fCountText = _summaryItems.length + ' 项 · ' + fQty + ' 件';
    const fCostText = cur + this.fmt(fCost);
    const fSellText = fSold ? cur + this.fmt(fSell) : '—';
    const fNetText = cur + this.fmt(fCost - fSell);
    const fProfitText = fSold ? (fProfit >= 0 ? '+' : '') + cur + this.fmt(fProfit) : '—';
    const fProfitStyle = { color: fSold ? (fProfit >= 0 ? '#12a85f' : '#e23b5d') : '#8b85ab' };

    const ledgerRangeInfo = this.ledgerDateRange(this.state.ledgerRange || 'month');
    const ledgerItemsAll = filtered;
    const ledgerItems = ledgerItemsAll.filter(it => this.inLedgerRange(it, ledgerRangeInfo));
    // 费用构成拆分（当前范围）—— 只统计落在这个范围里的那一笔，补款/尾款/国际运费/国内运费按各自实际日期算
    let feeGoods = 0, feeIntl = 0, feeDom = 0, feeOther = 0;
    const _inR = (ds) => { if (!ds || !ledgerRangeInfo || (!ledgerRangeInfo.start && !ledgerRangeInfo.end)) return !!ds; const d = new Date(ds + 'T00:00:00'); if (isNaN(d.getTime())) return false; return (!ledgerRangeInfo.start || d >= ledgerRangeInfo.start) && (!ledgerRangeInfo.end || d <= ledgerRangeInfo.end); };
    ledgerItemsAll.forEach(it => {
      const e = this.enrich(it);
      const supp = this.num(it.supplementPrice), fin = this.num(it.finalPrice);
      const suppDate = supp > 0 ? (it.supplementPriceDate || this.statusLogDate(it, '已补款') || it.buyDate) : '';
      const finDate = fin > 0 ? (it.finalPriceDate || this.statusLogDate(it, '已尾款') || it.buyDate) : '';
      const lateDate = finDate || suppDate || it.buyDate;
      const shipDomDate = it.shipDomDate || this.statusLogDate(it, '已发货') || this.statusLogDate(it, '排发中') || lateDate;
      const shipIntlDate = it.shipIntlDate || lateDate;
      const otherFeeDate = it.otherFeeDate || lateDate;
      const remainder = e.buy * e.qty - supp - fin;
      if (remainder && _inR(it.buyDate)) feeGoods += remainder;
      if (supp && _inR(suppDate)) feeGoods += supp;
      if (fin && _inR(finDate)) feeGoods += fin;
      if (e.si && _inR(shipIntlDate)) feeIntl += e.si;
      if (e.sd && _inR(shipDomDate)) feeDom += e.sd;
      if (e.other && _inR(otherFeeDate)) feeOther += e.other;
    });
    const feeTotal = feeGoods + feeIntl + feeDom + feeOther;
    const feeComposition = [
      { label: '谷子', value: feeGoods, color: 'var(--accent,#ff3355)' },
      { label: '国际邮费', value: feeIntl, color: '#c8860d' },
      { label: '国内邮费', value: feeDom, color: '#2f6fdb' },
      { label: '其他费用', value: feeOther, color: '#7c5cd6' }
    ].filter(r => r.value > 0).map(r => ({ label: r.label, amount: cur + this.fmt(r.value), pct: feeTotal > 0 ? Math.round(r.value / feeTotal * 100) : 0, barStyle: { width: (feeTotal > 0 ? (r.value / feeTotal * 100) : 0) + '%', height: '100%', borderRadius: '999px', background: r.color }, dotStyle: { width: '9px', height: '9px', borderRadius: '50%', flexShrink: 0, background: r.color } }));
    const hasFeeComposition = feeComposition.length > 0;
    const feeTotalText = cur + this.fmt(feeTotal);
    const currentWorkGroupName = curWorkForFilter.group || this.DEFAULT_GROUP;
    const currentWorkNameText = curWorkForFilter.name || '当前作品';
    const ledgerWorkScope = groupBy === 'workGroup' ? '全部系列IP' : groupBy === 'work' ? ('当前系列IP：' + currentWorkGroupName) : ('当前作品：' + currentWorkNameText);
    const hasActiveFilter = !!(charSel.length || typeSel.length || formSel.length || statusSel.length || acquireSel.length || channelSel.length || (purchaseChannelSel || []).length || seriesFilter !== '全部' || search || Object.values(this.state.customFilterSel || {}).some(arr => arr && arr.length));
    const ledgerScopeText = ledgerWorkScope + ' · ' + (hasActiveFilter ? '当前筛选 ' : '当前范围 ') + filtered.length + ' 项 · ' + fQty + ' 件';
    const mobileWalletRangeText = ledgerRangeInfo.label || '本月';
    const mobileWalletScopeName = groupBy === 'workGroup' ? '全部系列IP' : (groupBy === 'work' ? currentWorkGroupName : currentWorkNameText);
    const mobileWalletScopeText = mobileWalletScopeName + ' · ' + fQty + ' 件';
    const nowForLedger = new Date();
    const monthValues = this.makeConsumptionSeries(ledgerItems, ledgerRangeInfo, cur);
    const maxMonth = Math.max(1, ...monthValues.map(x => x.value));
    const monthChartBaseY = 150;
    const monthChartMaxH = 118;
    const nPoints = Math.max(1, monthValues.length);
    const stepX = nPoints > 1 ? 540 / (nPoints - 1) : 0;
    const barW = String(Math.max(12, Math.min(52, Math.floor(560 / nPoints))));
    const ledgerMonths = monthValues.map(x => ({ label: x.label, amount: cur + this.fmt(x.value), value: x.value }));
    const nowMonthK = this.monthKey(new Date());
    const lgMode = this.state.ledgerMode || 'month';
    const lgYear = parseInt(this.state.ledgerYear || new Date().getFullYear(), 10) || new Date().getFullYear();
    const lgMonth = Math.max(1, Math.min(12, parseInt(this.state.ledgerMonth || (new Date().getMonth() + 1), 10) || (new Date().getMonth() + 1)));
    const budgetMonthKey = lgMode === 'month' ? (lgYear + '-' + String(lgMonth).padStart(2, '0')) : nowMonthK;
    const budgetMonthLabel = lgMode === 'month' ? (lgMonth + '月') : '本月';
    this._budgetKey = budgetMonthKey; this._budgetLabel = budgetMonthLabel;
    const budgetForCells = this.num((this.state.budgets || {})[budgetMonthKey]);
    const isMonthDayMode = (ledgerRangeInfo.mode || 'month') === 'month';
    const isYearMode = lgMode === 'year';
    const bmapAll = this.state.budgets || {};
    let cumuForCells = 0, cumuBudgetYear = 0;
    const overCellStyle = { background: this.accentAlpha(0.14), borderColor: this.accentAlpha(0.34) };
    const ledgerMonthCells = monthValues.map(x => {
      cumuForCells += x.value;
      let over = false;
      if (isMonthDayMode) { over = budgetForCells > 0 && cumuForCells > budgetForCells; }
      else if (isYearMode) { cumuBudgetYear += this.num(bmapAll[x.key]); over = cumuBudgetYear > 0 && cumuForCells > cumuBudgetYear; }
      const hasDetail = x.value > 0;
      return { label: x.label, amount: cur + this.fmt(x.value), value: x.value, cellStyle: { ...(over ? overCellStyle : {}), cursor: hasDetail ? 'pointer' : 'default' }, onClick: hasDetail ? (() => this.openLedgerDetail(x.key, x.keyType, x.label)) : null };
    });
    const barTop = this.accentLight(0.15), barBottom = this.accentLight(0.72), areaColor = this.accentColor();
    const activeBar = (this.state.ledgerActiveBar == null ? monthValues.length - 1 : this.state.ledgerActiveBar);
    const _peakMax = Math.max(0, ...monthValues.map(v => v.value));
    const peakIdx = _peakMax > 0 ? monthValues.findIndex(v => v.value === _peakMax) : -1;
    const barWThin = String(Math.max(5, Math.min(22, Math.floor(360 / nPoints))));
    const ledgerMonthBars = monthValues.map((x, i) => { const h = x.value > 0 ? Math.max(6, Math.round(x.value / maxMonth * monthChartMaxH)) : 0; const cx = nPoints > 1 ? 30 + i * stepX : 300; const hitW = Math.max(Number(barWThin), stepX || 40); const isPeak = i === peakIdx; const labelY = Math.max(16, monthChartBaseY - h - 11); return { x: String(cx - Number(barWThin)/2), y: String(monthChartBaseY - h), w: barWThin, h: String(h), hasBar: x.value > 0, fill: isPeak ? 'url(#zzzBarAccent)' : 'url(#zzzBar)', hitX: String(cx - hitW/2), hitW: String(hitW), hitY: '10', hitH: String(monthChartBaseY - 10 + 6), onClick: this.pickLedgerBar(i), showLabel: isPeak && x.value > 0, labelX: String(cx), labelY: String(labelY), amountText: cur + this.fmt(x.value), axisLabel: x.value > 0 ? x.label : '', axisStyle: { left: (cx / 600 * 100) + '%' } }; });
    const ledgerMonthDots = [];
    const ledgerMonthLinePoints = '';
    const ledgerMonthAreaPath = '';
    const _peakBar = peakIdx >= 0 ? monthValues[peakIdx] : null;
    const _peakCx = peakIdx >= 0 ? (nPoints > 1 ? 30 + peakIdx * stepX : 300) : 0;
    const hasLedgerPeakBubble = !!(_peakBar && _peakBar.value > 0);
    const ledgerPeakBubbleText = hasLedgerPeakBubble ? (cur + this.fmt(_peakBar.value)) : '';
    const ledgerPeakBubbleStyle = { left: (_peakCx / 600 * 100) + '%', background: this.accentColor(), boxShadow: '0 4px 12px ' + this.accentAlpha(0.28) };
    const _lgVals = monthValues.map(x => x.value);
    const _lgTotal = _lgVals.reduce((s, v) => s + v, 0);
    const _lgPeak = _lgVals.length ? Math.max(..._lgVals) : 0;
    const _lgPeakIdx = _lgPeak > 0 ? _lgVals.indexOf(_lgPeak) : -1;
    const _lgSpend = _lgVals.filter(v => v > 0).length;
    const _lgAvg = monthValues.length ? _lgTotal / monthValues.length : 0;
    const ledgerPeakLabel = isMonthDayMode ? '单日最高' : '单期最高';
    const ledgerPeakValue = cur + this.fmt(_lgPeak);
    const ledgerPeakDate = _lgPeakIdx >= 0 ? (isMonthDayMode ? (lgMonth + '月' + monthValues[_lgPeakIdx].label + '日') : monthValues[_lgPeakIdx].label) : '暂无消费';
    const ledgerDaysLabel = isMonthDayMode ? '氪金天数' : '氪金期数';
    const ledgerDaysValue = _lgSpend + (isMonthDayMode ? ' 天' : ' 期');
    const ledgerDaysNote = isMonthDayMode ? '有消费记录的天数' : '有消费的期数';
    const ledgerAvgValue = cur + this.fmt(_lgAvg);
    const ledgerAvgNote = isMonthDayMode ? ('按本月 ' + monthValues.length + ' 天计算') : (isYearMode ? '按 12 个月计算' : ('按 ' + monthValues.length + ' 期计算'));
    const detailKey = this.state.ledgerDetailKey || '';
    const detailType = this.state.ledgerDetailType || 'day';
    const ledgerDetailMatched = detailKey ? ledgerItems.map(it => ({ it, entries: this.cashFlowEntries(it).filter(cf => detailType === 'day' ? cf.date === detailKey : String(cf.date || '').slice(0, 7) === detailKey) })).filter(x => x.entries.length) : [];
    // 没有任何匹配消费时绝不显示明细弹窗，防止视图切换事件产生“0 项”空弹窗。
    const ledgerDetailOpen = !!detailKey && ledgerDetailMatched.length > 0 && (view === 'ledger' || this.state.view === 'ledger');
    const ledgerDetailItems = ledgerDetailMatched.map(x => { const e = this.enrich(x.it); const amount = x.entries.reduce((s, cf) => s + cf.amount, 0); return { name: x.it.name || '未命名', qtyText: (e.qty > 1 ? '×' + e.qty : ''), costText: cur + this.fmt(amount), character: x.it.character || '' }; });
    const ledgerDetailTotal = cur + this.fmt(ledgerDetailMatched.reduce((s, x) => s + x.entries.reduce((a, cf) => a + cf.amount, 0), 0));
    const ledgerDetailTitle = (this.state.ledgerDetailLabel || '') + ' · ' + ledgerDetailMatched.length + ' 项';
    const ledgerDetailEmpty = ledgerDetailItems.length === 0;
    const ledgerMonthTotalNum = monthValues.reduce((sum, x) => sum + x.value, 0);
    const ledgerMonthPeak = monthValues.slice().sort((a,b) => b.value - a.value)[0] || monthValues[0];
    const ledgerMonthHint = (ledgerRangeInfo.label || '') + ' · 合计 ' + cur + this.fmt(ledgerMonthTotalNum);
    const ledgerMonthTotal = cur + this.fmt(ledgerMonthTotalNum);
    const ledgerMonthPeakText = ledgerMonthPeak ? ('峰值 ' + ledgerMonthPeak.label + ' · ' + cur + this.fmt(ledgerMonthPeak.value)) : '暂无消费';
    const thisMonthKey = budgetMonthKey;
    const isYearScope = lgMode === 'year';
    const isAllScope = lgMode === 'all';
    const yearKey = String(lgYear);
    const yearBudget = Object.keys(bmapAll).reduce((s, k) => (k.indexOf(yearKey + '-') === 0 ? s + this.num(bmapAll[k]) : s), 0);
    const globalItems = this.state.items || [];
    const yearSpent = globalItems.reduce((s, it) => s + this.cashFlowEntries(it).filter(cf => String(cf.date||'').slice(0,4) === yearKey).reduce((a,cf)=>a+cf.amount,0), 0);
    const allSpent = globalItems.reduce((s, it) => s + this.enrich(it).cost, 0);
    const monthsWithData = new Set(); globalItems.forEach(it => this.cashFlowEntries(it).forEach(cf => { const k = String(cf.date||'').slice(0,7); if (k) monthsWithData.add(k); }));
    const allAvg = monthsWithData.size ? allSpent / monthsWithData.size : allSpent;
    // 年度回顾（当前所选年）
    const reviewYearItems = globalItems.filter(it => String(it.buyDate || '').slice(0, 4) === yearKey);
    const yrReview = { total: reviewYearItems.length, inhand: reviewYearItems.filter(it => this.groupKind(it) === 'inhand').length, air: reviewYearItems.filter(it => this.groupKind(it) === 'air').length, sale: reviewYearItems.filter(it => this.groupKind(it) === 'sale').length, spent: cur + this.fmt(yearSpent), sea: reviewYearItems.filter(it => (it.rarity || []).includes('海景')).length };
    const yrCards = [
      { label: '今年收谷', value: yrReview.total + ' 件', color: '#251d49' },
      { label: '已归家', value: yrReview.inhand + ' 件', color: '#12a85f' },
      { label: '空气谷', value: yrReview.air + ' 件', color: '#c8860d' },
      { label: '已出物', value: yrReview.sale + ' 件', color: '#7c5cd6' },
      { label: '今年花费', value: yrReview.spent, color: 'var(--accent,#ff3355)' },
      { label: '海景', value: yrReview.sea + ' 件', color: '#2f6fdb' }
    ];
    const showYrReview = lgMode === 'year' || lgMode === 'all';
    const monthSpentMonth = globalItems.reduce((sum, it) => sum + this.cashFlowEntries(it).filter(cf => String(cf.date||'').slice(0,7) === budgetMonthKey).reduce((a,cf)=>a+cf.amount,0), 0);
    const monthSpent = isYearScope ? yearSpent : isAllScope ? allSpent : monthSpentMonth;
    const budget = isYearScope ? yearBudget : isAllScope ? 0 : budgetForCells;
    const budgetRemain = budget - monthSpent;
    const budgetPct = budget > 0 ? (monthSpent / budget * 100) : 0;
    const budgetColor = budget <= 0 ? '#8b85ab' : budgetPct >= 100 ? '#e23b5d' : budgetPct >= 80 ? '#d9701f' : '#12a85f';
    const showBudgetEdit = lgMode === 'month';
    const TXT = this.nameStyleLabels();
    const cntAll = filtered.reduce((n, it) => n + (this.enrich(it).qty || 1), 0);
    const panelSpentLabel = isYearScope ? '全年支出' : isAllScope ? '累计消费' : (lgMode === 'month' ? String(TXT.spent).replace('本月', budgetMonthLabel) : TXT.spent);
    const panelBudgetLabel = isYearScope ? '全年预算' : (lgMode === 'month' ? String(TXT.budget).replace('本月', budgetMonthLabel) : TXT.budget);
    const panelRemainLabel = isYearScope ? '全年剩余' : isAllScope ? '月均消费' : TXT.remain;
    const panelProgressLabel = isAllScope ? '收藏件数' : isYearScope ? '全年进度' : TXT.progress;
    const panelRemainText = isAllScope ? (cur + this.fmt(allAvg)) : (budget > 0 ? ((budgetRemain >= 0 ? '' : '-') + cur + this.fmt(Math.abs(budgetRemain))) : '—');
    const panelRemainStyle = isAllScope ? { color: '#251d49' } : { color: budget > 0 ? (budgetRemain >= 0 ? '#12a85f' : '#e23b5d') : '#8b85ab' };
    const panelPctText = isAllScope ? (cntAll + ' 件') : (budget > 0 ? Math.round(budgetPct) + '%' : '—');
    const panelPctStyle = isAllScope ? { color: '#7c5cd6' } : { color: budgetColor };
    const panelBarStyle = isAllScope ? { width: '100%', height: '100%', borderRadius: '999px', background: '#cfc7e8' } : { width: Math.min(100, Math.max(0, Math.round(budgetPct))) + '%', height: '100%', borderRadius: '999px', background: budgetColor };
    const panelStatusText = isAllScope ? (monthsWithData.size + ' 个月有记录') : (budget <= 0 ? TXT.noBudget : (budgetPct >= 100 ? TXT.overBudget : budgetPct >= 80 ? TXT.nearBudget : TXT.okBudget));
    const saleLedgerMode = group === 'sale';
    const isNewbie = (this.state.displayMode || 'standard') === 'newbie';
    const isSimple = (this.state.displayMode || 'standard') === 'simple';
    const fillRows = (rows, minN = 3) => { while (rows.length < minN) rows.push({ name: '暂无数据', value: '—' }); return rows; };
    const saleItemsForRank = ledgerItems.filter(it => this.num(it.sellPrice) > 0 || this.groupOf(it) === '出物');
    const reviewData = this.makeReviewData(ledgerItems, saleItemsForRank, cur, (ledgerRangeInfo.label || '当前范围'));
    const reviewCards = reviewData.cards;
    const completeSetRows = reviewData.sets;
    const reviewPeriodText = reviewData.period;
    const achievementRows = this.makeAchievements(ledgerItems, saleItemsForRank);
    const dashLabels = this.dashboardMetricLabels(this.state.nameStyleMode || 'default');
    const dashCards = this.normalizeDashboardCards(this.state.dashboardCards);
    const selectedMetrics = saleLedgerMode ? dashCards.sale : dashCards.collection;
    const ledgerRankCards = selectedMetrics.map(metric => ({
      key: metric,
      title: dashLabels[metric] || metric,
      rows: this.makeRankRows(metric, ledgerItems, saleItemsForRank, cur, workOfItem, fillRows)
    }));
    const topCostRows = ledgerRankCards[0] ? ledgerRankCards[0].rows : fillRows([]);
    const topQtyRows = ledgerRankCards[1] ? ledgerRankCards[1].rows : fillRows([]);
    const topCharacterRows = ledgerRankCards[2] ? ledgerRankCards[2].rows : fillRows([]);
    const topPlatformRows = ledgerRankCards[3] ? ledgerRankCards[3].rows : fillRows([]);
    const ledgerRankTitle1 = ledgerRankCards[0] ? ledgerRankCards[0].title : '';
    const ledgerRankTitle2 = ledgerRankCards[1] ? ledgerRankCards[1].title : '';
    const ledgerRankTitle3 = ledgerRankCards[2] ? ledgerRankCards[2].title : '';
    const ledgerRankTitle4 = ledgerRankCards[3] ? ledgerRankCards[3].title : '';
    const reminderItemsRaw = ledgerItems.map(it => ({ it, rem: (this.reminderInfo(it) || {}) })).filter(x => x.rem.pending).sort((a,b) => a.rem.days - b.rem.days);
    const seenReminderKeys = new Set();
    const reminderItems = reminderItemsRaw.filter(x => { const key = [x.it.id || (x.it.name || this.genName(x.it) || '未命名'), x.rem.type || '', x.rem.date || ''].join('|'); if (seenReminderKeys.has(key)) return false; seenReminderKeys.add(key); return true; });
    const upcomingReminders = reminderItems.filter(x => x.rem.active).slice(0,5).map(x => ({ name: x.it.name || this.genName(x.it) || '未命名', text: x.rem.text, tag: x.rem.type || '提醒', days: x.rem.days }));
    const ledgerReminderRows = reminderItems.slice(0,12).map(x => ({ name: x.it.name || this.genName(x.it) || '未命名', date: x.rem.date || '', text: x.rem.text, badgeStyle: this.badge(x.rem.days <= 3 ? '#e23b5d' : '#d9701f', x.rem.days <= 3 ? 'rgba(226,59,93,.1)' : 'rgba(217,112,31,.1)', x.rem.days <= 3 ? 'rgba(226,59,93,.26)' : 'rgba(217,112,31,.26)') }));
    const mobileReminderText = upcomingReminders.length ? (upcomingReminders.length + ' 件') : '';
    const mobileTodoRows = upcomingReminders.slice(0,3);
    const mobileReminderDetail = upcomingReminders.slice(0,2).map(r => r.text).join(' / ');
    const reminderCountText = reminderItems.length ? (TXT.reminderCount + ' ' + reminderItems.length + ' 件') : '暂无待处理';
    const batchMode = !!this.state.batchMode;
    const showBatchControl = view !== 'ledger';
    const showBatchBar = batchMode && showBatchControl;
    const selectedSet = new Set(this.state.selectedIds || []);
    const ledgerRangeText = '按购买日期统计 · ' + (ledgerRangeInfo.label || '本月');
    const ledgerMode = this.state.ledgerMode || 'month';
    const ledgerModeChips = ['month','year','all'].map(k => { const label = ({week:'周',month:'月',year:'年',all:'全部'})[k]; const active = ledgerMode === k; return { label, onClick: () => this.setLedgerMode(k), style: this.segStyle(active) }; });
    const yearsSet = new Set([(new Date()).getFullYear()]); (this.state.items || []).forEach(it => { const y = parseInt((it.buyDate||'').slice(0,4),10); if (y) yearsSet.add(y); });
    const ledgerYearOptions = Array.from(yearsSet).sort((a,b)=>b-a).map(String);
    const ledgerMonthOptions = Array.from({length:12},(_,i)=>({ value:String(i+1), label:(i+1)+'月' }));
    const ledgerWeekOptions = this.makeWeekOptions(parseInt(this.state.ledgerYear || new Date().getFullYear(),10), parseInt(this.state.ledgerMonth || (new Date().getMonth()+1),10)).map(w => ({ value:w.value, label:w.label }));
    const ledgerYear = this.state.ledgerYear || String(new Date().getFullYear());
    const ledgerMonth = this.state.ledgerMonth || String(new Date().getMonth()+1);
    const ledgerWeek = this.state.ledgerWeek || (ledgerWeekOptions[0] && ledgerWeekOptions[0].value) || '';
    this._ledgerYearOpts = ledgerYearOptions; this._ledgerWeekOpts = ledgerWeekOptions;
    const ledgerYearText = ledgerYear + '年';
    const ledgerMonthText = ledgerMonth + '月';
    const ledgerWeekText = (ledgerWeekOptions.find(w => String(w.value) === String(ledgerWeek)) || {}).label || '本周';
    const showLedgerYear = ledgerMode !== 'all';
    const showLedgerMonth = ledgerMode === 'month' || ledgerMode === 'week';
    const showLedgerWeek = ledgerMode === 'week';
    const ledgerPieBy = this.state.ledgerPieBy || 'character';
    const pie = this.makeLedgerPie(ledgerItems, ledgerPieBy, cur);
    const ledgerPieTitle = pie.title;
    const ledgerPieStyle = pie.style;
    const ledgerPieRows = pie.rows;
    const ledgerPieTotal = pie.totalText;
    const ledgerPieCenterLabel = pie.centerLabel;
    const ledgerPieTopText = pie.topText;
    const ledgerPieTip = pie.tip || '';
    const ledgerPieSegments = pie.segments || [];
    const ledgerPieActiveName = pie.activeName || '';
    const ledgerPieActivePercent = pie.activePercent || '';
    const ledgerPieActiveValue = pie.activeValue || '';
    const ledgerPieActiveDot = pie.activeDotStyle || {};
    const ledgerPieChips = ['character','work','workGroup','type'].map(k => { const label = ({character:'角色',work:'作品',workGroup:'系列',type:'种类'})[k]; return { label, onClick: () => this.setLedgerPieBy(k), style: this.segStyle(ledgerPieBy === k) }; });
    const ledgerDetailRows = ledgerItems.slice().sort((a,b) => (b.buyDate || '').localeCompare(a.buyDate || '')).slice(0,80).map(it => { const e = this.enrich(it); return { date: it.buyDate || '—', name: it.name || this.genName(it) || '未命名', cost: e.cost ? cur + this.fmt(e.cost) : '—', sell: e.revenue ? cur + this.fmt(e.revenue) : '—' }; });
    const ledgerDetailSummary = ledgerItems.length + ' 项 · 支出 ' + cur + this.fmt(ledgerItems.reduce((sum, it) => sum + this.enrich(it).cost, 0));

    const itemRows = filtered.map(it => {
      const e = this.enrich(it);
      const g = this.groupOf(it);
      const rem = this.reminderInfo(it) || {};
      const imgUrl = it.imageId ? this.imgUrls[it.imageId] : null;
      const isSwapped = it.method === '盲抽' && (it.gachaResult === '置换' || it.gachaResult === '收现' || it.gachaResult === '置换/收现');
      const dispChar = (it.character || '其他');
      const regularUrls = this.imageUrlsOf(it);
      let galleryUrls = regularUrls;
      galleryUrls = [...new Set(galleryUrls)].slice(0, 4);
      const primaryUrl = galleryUrls[0] || null;
      const displayName = (it.name || '未命名');
      const hue = this.charHue(dispChar);
      const galleryImgs = this.mosaicImgs(galleryUrls);
      const shipParts = [];
      if (e.sd > 0) shipParts.push('内' + cur + this.fmt(e.sd));
      if (e.si > 0) shipParts.push('际' + cur + this.fmt(e.si));
      const profitStyle = { color: e.profit >= 0 ? '#12a85f' : '#e23b5d', fontWeight: 700 };
      const groupStyle = g === '出物' ? this.badge('#d14a86', 'rgba(255,107,157,.14)', 'rgba(255,107,157,.3)') : this.badge('#6a4fd0', 'rgba(108,92,231,.16)', 'rgba(108,92,231,.32)');
      const fcol = it.form === '人脸' ? '#c8860d' : it.form === '皮套' ? '#2f7fd0' : '#7c5cd6';
      const fbg = it.form === '人脸' ? 'rgba(255,193,75,.13)' : it.form === '皮套' ? 'rgba(91,157,255,.13)' : 'rgba(124,92,214,.14)';
      const isSelected = selectedSet.has(it.id);
      return {
        isHeader: false, isItem: true,
        showBatch: showBatchBar, batchChecked: isSelected, batchCheckClass: isSelected ? 'on' : '', onBatchToggle: (ev) => { ev && ev.stopPropagation && ev.stopPropagation(); this.toggleBatchId(it.id, ev.target.checked); }, onBatchStop: (ev) => { ev.stopPropagation && ev.stopPropagation(); }, onCardClick: (ev) => { if (showBatchBar) { ev.preventDefault && ev.preventDefault(); this.toggleBatchId(it.id, !isSelected); } else this.openItemFromRow(it, ev); },
        tableRowClass: 'ui-table-row' + (showBatchBar ? ' ui-table-selectable' : '') + (isSelected ? ' ui-table-selected' : ''),
        tableRowStyle: { cursor: showBatchBar ? 'pointer' : 'default', gridTemplateColumns: tableGridColumns },
        onTableRowClick: (ev) => { if (!showBatchBar) return; ev && ev.preventDefault && ev.preventDefault(); this.toggleBatchId(it.id, !isSelected); },
        cardStyle: { background: isSelected ? `linear-gradient(160deg,#fff,${this.accentLight(0.94)})` : `linear-gradient(180deg,#ffffff,${this.accentLight(0.98)})`, border: isSelected ? '2px solid var(--accent,#ff3355)' : (rem.active ? '2px solid #ff7aa2' : `1px solid ${this.accentAlpha(0.16)}`), borderRadius: '22px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: isSelected ? `0 0 0 4px ${this.accentAlpha(0.16)}, 0 16px 34px ${this.accentAlpha(0.18)}` : (rem.active ? '0 0 0 4px rgba(255,122,162,.11), 0 16px 34px rgba(255,122,162,.18)' : `0 8px 22px ${this.accentAlpha(0.09)}, 0 4px 14px rgba(46,35,86,.06)`) },
        circleImgStyle: { position: 'relative', width: '84px', height: '84px', borderRadius: '50%', overflow: 'hidden', background: 'linear-gradient(145deg,#eae5f4,#e1dcf0)', border: isSelected ? '3px solid var(--accent,#ff3355)' : (rem.active ? '3px solid #e23b5d' : '2px solid #ffffff'), boxShadow: isSelected ? `0 0 0 5px ${this.accentAlpha(0.18)}, 0 10px 24px rgba(50,38,90,.18)` : (rem.active ? '0 0 0 3px rgba(226,59,93,.12), 0 8px 18px rgba(226,59,93,.28)' : '0 3px 10px rgba(50,38,90,.14)') },
        circleReminderStyle: { position: 'absolute', top: '2px', right: '2px', minWidth: '20px', height: '20px', padding: '0 5px', borderRadius: '999px', background: '#e23b5d', color: '#fff', fontSize: '10px', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff', boxShadow: '0 3px 9px rgba(226,59,93,.35)' },
        hasReminderAlert: !!rem.active, reminderText: rem.text || '', reminderBadgeText: rem.badgeText || rem.text || '', reminderShort: rem.type || '!',
        id: it.id, name: displayName,
        showTextMeta: false, hasOrig: !!(isSwapped && it.swapNote), origText: it.swapNote || '', character: dispChar, showCharBadge: !(charSel && charSel.length === 1),
        charLenClass: (dispChar && dispChar.length > 10) ? 'ui-charlen-long' : (dispChar && dispChar.length > 6) ? 'ui-charlen-mid' : '',
        hasAvatar: !!this.charImg(dispChar), avatarStyle: { width: '16px', height: '16px', borderRadius: '50%', backgroundImage: `url(${this.charImg(dispChar)})`, backgroundSize: 'cover', backgroundPosition: 'center', margin: '0 4px 0 -2px', flexShrink: 0 },
        charStyle: { display: 'inline-flex', alignItems: 'center', padding: '3px 9px', borderRadius: '999px', fontSize: '12px', fontWeight: 500, whiteSpace: 'nowrap', background: `hsla(${hue},60%,55%,.16)`, color: `hsl(${hue},72%,40%)`, border: `1px solid hsla(${hue},60%,60%,.32)` },
        typeText: it.type + (it.subtype ? ' · ' + it.subtype : ''),
        hasSeries: fieldVisible('series') && !!it.series, seriesText: it.series, seriesStyle: this.badge('#3a6ea5', 'rgba(47,111,219,.1)', 'rgba(47,111,219,.28)'),
        showAcquire: fieldVisible('acquire') && !!(it.acquire && it.acquire !== '直购'), acquireText: it.acquire,
        hasMethod: !!(it.method), methodText: it.method || '', methodStyle: this.badge('#5a7fae', 'rgba(90,127,174,.12)', 'rgba(90,127,174,.3)'),
        acquireStyle: this.badge((it.acquire === '盲盒' || it.acquire === '盲抽') ? '#c0398a' : '#1f9e8f', (it.acquire === '盲盒' || it.acquire === '盲抽') ? 'rgba(192,57,138,.12)' : 'rgba(31,158,143,.12)', ((it.acquire === '盲盒' || it.acquire === '盲抽') ? '#c0398a' : '#1f9e8f') + '44'),
        hasSwap: isSwapped, swapText: '置换 / 收现', swapStyle: this.badge('#d9701f', 'rgba(217,112,31,.13)', '#d9701f44'),
        chipTags: [...((it.rarity) || []).map(t => ({ label: t, style: this.badge('#c8860d', 'rgba(200,134,13,.12)', 'rgba(200,134,13,.3)') })), ...((it.tags) || []).map(t => ({ label: t, style: this.badge('#7c5cd6', 'rgba(124,92,214,.12)', 'rgba(124,92,214,.3)') }))], hasChipTags: !!(((it.tags) || []).length || ((it.rarity) || []).length),
        showForm: fieldVisible('form') && !!(it.form && it.form !== '通用'), formText: it.form,
        formStyle: this.badge(fcol, fbg, fcol + '44'),
        groupText: g, groupStyle,
        status: it.status, statusStyle: this.badge(this.STATUS_COLOR[it.status] || '#6f6996', 'rgba(50,38,90,.05)', (this.STATUS_COLOR[it.status] || '#6f6996') + '44'),
        qtyText: '×' + e.qty, showQty: e.qty > 1, qty: e.qty,
        totalText: this.num(it.buyPrice) ? cur + this.fmt(e.cost) : '—',
        breakdownText: this.num(it.buyPrice) ? ('单价 ' + cur + this.fmt(e.buy) + ' ×' + e.qty + ((e.sd + e.si) > 0 ? ' ＋邮费 ' + cur + this.fmt(e.sd + e.si) : '')) : '',
        hasBreakdown: !!this.num(it.buyPrice),
        heldText: rem.text || '', hasHeld: !!(rem.text && !rem.active),
        channelLineText: (it.purchaseChannel || it.channel || '').trim(),
        channelSuffix: (it.purchaseChannel || it.channel || '').trim() && this.num(it.originalPrice) ? ' · ' + (it.purchaseChannel || it.channel || '').trim() : '',
        showChannelOnly: !!((it.purchaseChannel || it.channel || '').trim()) && !this.num(it.originalPrice),
        originalText: this.num(it.originalPrice) ? this.fmt(this.num(it.originalPrice)) + ' 円' : '—',
        hasOriginal: !!this.num(it.originalPrice),
        buyText: this.num(it.buyPrice) ? cur + this.fmt(e.buy) : '—',
        shipText: shipParts.length ? shipParts.join(' · ') : '—',
        sellText: this.num(it.sellPrice) ? cur + this.fmt(e.sell) : '—',
        hasProfit: e.sold,
        profitText: (e.profit >= 0 ? '+' : '') + cur + this.fmt(e.profit),
        profitTableText: e.sold ? (e.profit >= 0 ? '+' : '') + cur + this.fmt(e.profit) : '—',
        profitStyle, profitCellStyle: e.sold ? profitStyle : { color: '#8b85ab' },
        channel: it.channel || '—', purchaseChannel: it.purchaseChannel || '—', heat: it.heat || 0, hasHeat: (it.heat || 0) > 0, starsText: '★'.repeat(it.heat || 0), cardStars: [1, 2, 3, 4, 5].map(n => ({ onClick: (ev) => { ev.stopPropagation(); this.setItemHeat(it.id, n); }, style: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', lineHeight: 1, padding: '0 1px', color: n <= (it.heat || 0) ? '#ff9a1f' : '#d9d2ea' } })), dateText: it.buyDate || '—', note: it.note || '',
        imgUrl: primaryUrl, hasImg: !!primaryUrl, noImg: galleryUrls.length === 0, hasImg2: galleryUrls.length > 1, imageCountText: galleryUrls.length + '图', galleryImgs, ph: (displayName || it.character || '?').slice(0, 1),
        thumbBg: primaryUrl ? { position: 'absolute', inset: 0, backgroundImage: `url(${primaryUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : { display: 'none' },
        groupBadgeStyle: { display: 'inline-flex', alignItems: 'center', padding: '5px 10px', borderRadius: '999px', fontSize: '11.5px', fontWeight: 900, whiteSpace: 'nowrap', color: g === '出物' ? '#c93f78' : '#6a4fd0', background: g === '出物' ? 'rgba(255,246,250,.9)' : 'rgba(249,247,255,.9)', border: '1px solid rgba(255,255,255,.9)', boxShadow: '0 8px 18px rgba(255,122,162,.2),0 2px 8px rgba(55,35,90,.12)', textShadow: '0 1px 0 rgba(255,255,255,.85)', position: 'absolute', top: '9px', left: '9px', backdropFilter: 'blur(10px)' },
        statusBadgeStyle: { ...this.badge(this.STATUS_COLOR[it.status] || '#6f6996', 'rgba(255,255,255,.92)', (this.STATUS_COLOR[it.status] || '#6f6996') + '44'), position: 'absolute', top: '9px', right: '9px', backdropFilter: 'blur(10px)', boxShadow: '0 8px 18px rgba(91,157,255,.12),0 2px 8px rgba(55,35,90,.09)', fontWeight: 800 },
        onEdit: (ev) => { if (showBatchBar) { ev && ev.stopPropagation && ev.stopPropagation(); this.toggleBatchId(it.id, !isSelected); } else this.openItemFromRow(it, ev); }, onDelete: () => this.removeItem(it), onDup: () => this.openDuplicate(it), draggable: true,
        onMouseDown: (ev) => this.startItemPointer(it.id, ev),
        onMouseUp: (ev) => this.finishItemPointer(it.id, ev),
        onTouchStart: (ev) => this.startItemPointer(it.id, ev),
        onTouchEnd: (ev) => this.finishItemPointer(it.id, ev),
        onTouchCancel: () => { this.pointerItemDrag = null; },
        onDragStart: (ev) => this.beginItemDrag(it.id, ev),
        onDragOver: (ev) => { ev.preventDefault(); if (ev.dataTransfer) ev.dataTransfer.dropEffect = 'move'; },
        onDrop: (ev) => { ev.preventDefault(); ev.stopPropagation && ev.stopPropagation(); const src = (ev.dataTransfer && ev.dataTransfer.getData('text/plain')) || this.dragId; this.reorder(src, it.id); this.endItemDrag(); },
        onDragEnd: () => this.endItemDrag()
      };
    });
    this._lastVisibleIds = itemRows.map(r => r.id);
    const rowById = {}; itemRows.forEach(r => { rowById[r.id] = r; });

    // 分组：把同类（同角色的人脸+皮套）合并成一组分区显示
    let displayRows = itemRows;
    if (groupBySafe !== 'none') {
      const keyf = groupBySafe === 'set' ? (i => i.setName ? (i.setName + (i.setVariant ? ' ' + i.setVariant : '')) : '未归类套装') : groupBySafe === 'character' ? (i => i.character || '未分类') : groupBySafe === 'type' ? (i => i.type || '未分类') : groupBySafe === 'series' ? (i => i.series || '未分类') : groupBySafe === 'form' ? (i => (i.form && i.form !== '通用') ? i.form : '通用') : groupBySafe === 'status' ? (i => i.status || '未分类') : groupBySafe === 'acquire' ? (i => i.acquire || '未分类') : groupBySafe === 'method' ? (i => i.method || '未分类') : groupBySafe === 'channel' ? (i => i.channel || '未分类') : groupBySafe === 'purchaseChannel' ? (i => i.purchaseChannel || '未分类') : groupBySafe === 'tags' ? (i => (i.tags && i.tags.length) ? i.tags.join('、') : '未分类') : groupBySafe === 'rarity' ? (i => (i.rarity && i.rarity.length) ? i.rarity.join('、') : '未分类') : groupBySafe === 'work' ? (i => workOfItem(i).name || '未命名作品') : groupBySafe === 'workGroup' ? (i => workOfItem(i).group || this.DEFAULT_GROUP) : groupBySafe && groupBySafe.indexOf('custom:') === 0 ? (i => (i.custom && i.custom[groupBySafe.slice(7)]) || '未分类') : (i => '未分类');
      const map = {};
      filtered.forEach(it => { const e = this.enrich(it); const k = keyf(it); (map[k] = map[k] || { label: k, count: 0, qty: 0, cost: 0, profit: 0, sold: false, ids: [] }); const m = map[k]; m.count++; m.qty += e.qty; m.cost += e.cost; if (e.sold) { m.profit += e.profit; m.sold = true; } m.ids.push(it.id); });
      const groups = Object.values(map).sort((a, b) => b.cost - a.cost);
      displayRows = [];
      groups.forEach(gp => {
        const collapsed = !!(this.state.collapsedGroups || {})[gp.label];
        displayRows.push({
          isHeader: true, isItem: false, id: 'hd_' + gp.label, collapsed, onToggleCollapse: () => this.toggleGroupCollapse(gp.label), caret: collapsed ? '▸' : '▾',
          headerHasImg: groupBySafe === 'character' && !!this.charImg(gp.label), headerNoImg: !(groupBySafe === 'character' && !!this.charImg(gp.label)), headerImgG: { width: '30px', height: '30px', borderRadius: '50%', backgroundImage: `url(${this.charImg(gp.label)})`, backgroundSize: 'cover', backgroundPosition: 'center', border: '1px solid #d4cee7', flexShrink: 0 }, headerImgT: { width: '26px', height: '26px', borderRadius: '50%', backgroundImage: `url(${this.charImg(gp.label)})`, backgroundSize: 'cover', backgroundPosition: 'center', border: '1px solid #d4cee7', flexShrink: 0 },
          label: gp.label, countText: gp.count + ' 项 · ' + gp.qty + ' 件',
          costText: '投入 ' + cur + this.fmt(gp.cost),
          profitText: gp.sold ? '盈亏 ' + (gp.profit >= 0 ? '+' : '') + cur + this.fmt(gp.profit) : '',
          profitStyle: { color: gp.sold ? (gp.profit >= 0 ? '#12a85f' : '#e23b5d') : '#8b85ab' },
          dotStyle: { width: '10px', height: '10px', borderRadius: '50%', flexShrink: 0, background: groupBySafe === 'character' ? `hsl(${this.charHue(gp.label)},70%,62%)` : 'var(--accent,#ff3355)' }
        });
        if (!collapsed) gp.ids.forEach(id => displayRows.push(rowById[id]));
      });
    }

    // draft live calc
    const d = this.state.draft;
    let draftTimelineRows = [{ date: '—', title: '保存后自动生成', note: '' }];
    let draftCostText = cur + '0', draftHasSell = false, draftProfitText = '', draftProfitStyle = {}, draftThumbBg = {}, draftHasImg = false, draftNoImg = true, draftThumbBg2 = {}, draftHasImg2 = false, draftNoImg2 = true, draftThumbBg3 = {}, draftHasImg3 = false, draftNoImg3 = true, draftSwapThumbBg = {}, draftSwapHasImg = false, draftSwapNoImg = true, draftImageTiles = [], draftNoImages = true, draftImageCountText = '0/4 张图片', draftImageHelp = '可一次选多张，最多保留 4 张';
    if (d) {
      const e = this.enrich(d);
      draftCostText = cur + this.fmt(e.cost);
      draftHasSell = this.num(d.sellPrice) > 0;
      draftProfitText = (e.profit >= 0 ? '+' : '') + cur + this.fmt(e.profit);
      draftProfitStyle = { color: e.profit >= 0 ? '#12a85f' : '#e23b5d' };
      draftTimelineRows = this.autoTimeline(d);
      if (!draftTimelineRows.length) draftTimelineRows = [{ date: '—', title: '保存后自动生成', note: '' }];
      const draftImageEntries = this.imageSlotKeys().map(key => ({ key, id: d[key], url: d[key] ? this.imgUrls[d[key]] : null })).filter(x => x.url);
      draftNoImages = draftImageEntries.length === 0;
      draftImageCountText = draftImageEntries.length + '/4 张图片';
      draftImageTiles = draftImageEntries.map((x, i) => ({
        tileStyle: { ...this.mosaicCell(draftImageEntries.length, i), position: 'relative', minWidth: 0, minHeight: 0, overflow: 'hidden', background: '#eee9f8' },
        bgStyle: { position: 'absolute', inset: 0, backgroundImage: `url(${x.url})`, backgroundSize: 'cover', backgroundPosition: 'center' },
        onRemove: () => this.removeDraftImageKey(x.key)
      }));
      const u = d.imageId ? this.imgUrls[d.imageId] : null;
      draftHasImg = !!u; draftNoImg = !u;
      draftThumbBg = u ? { position: 'absolute', inset: 0, backgroundImage: `url(${u})`, backgroundSize: 'cover', backgroundPosition: 'center' } : { display: 'none' };
      const u2 = d.imageId2 ? this.imgUrls[d.imageId2] : null;
      draftHasImg2 = !!u2; draftNoImg2 = !u2;
      draftThumbBg2 = u2 ? { position: 'absolute', inset: 0, backgroundImage: `url(${u2})`, backgroundSize: 'cover', backgroundPosition: 'center' } : { display: 'none' };
      const u3 = d.imageId3 ? this.imgUrls[d.imageId3] : null;
      draftThumbBg3 = u3 ? { position: 'absolute', inset: 0, backgroundImage: `url(${u3})`, backgroundSize: 'cover', backgroundPosition: 'center' } : { display: 'none' };
      draftHasImg3 = !!u3; draftNoImg3 = !u3;
      const us = d.swapImageId ? this.imgUrls[d.swapImageId] : null;
      draftSwapHasImg = !!us; draftSwapNoImg = !us;
      draftSwapThumbBg = us ? { position: 'absolute', inset: 0, backgroundImage: `url(${us})`, backgroundSize: 'cover', backgroundPosition: 'center' } : { display: 'none' };
    }
    const dHeat = d ? (d.heat || 0) : 0;
    const draftStars = [1, 2, 3, 4, 5].map(n => ({ onClick: () => this.setHeat(n), style: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '26px', lineHeight: 1, padding: '0 1px', color: n <= dHeat ? '#ff7a1a' : '#d8d2ea', transition: '.1s' } }));
    const dRate = d ? this.num(d.rate) : 0, dOrig = d ? this.num(d.originalPrice) : 0;
    const draftHasConv = !!(d && dRate > 0 && dOrig > 0);
    const draftConvText = cur + this.fmt(dOrig * dRate);
    const draftIsGacha = !!(d && d.method === '盲抽');
    const draftSwapped = !!(d && d.method === '盲抽' && (d.gachaResult === '置换' || d.gachaResult === '收现' || d.gachaResult === '置换/收现'));

    const batchEditFields = this.batchFieldDefs().map(f => ({ label:f.label, onClick: () => this.chooseBatchField(f.key) }));
    const bf = this.state.batchEditField || '';
    const batchEditOptions = bf ? this.batchEditOptionsFor(bf) : [];
    const batchEditTitle = bf ? ('修改' + this.batchFieldLabel(bf)) : '';
    const batchEditChooseMode = !bf;
    const batchEditOptionMode = !!bf;
    const savedText = this.state.savedAt ? '本机已保存 ' + new Date(this.state.savedAt).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }) : '本机自动保存已开启';
    const hasCloudSyncNow = !!this.state.cloudSyncId;
    const cloudStatusRaw = String(this.state.cloudStatus || '');
    const cloudHasProblem = /失败|未连接|没有找到|请先|还没有|Supabase/.test(cloudStatusRaw);
    const cloudSaveText = !hasCloudSyncNow ? '云端未连接' : (this.state.cloudBusy ? '云端处理中' : (this.state.cloudPending ? '云端未上传' : (cloudHasProblem ? '云端需处理' : '云端已同步')));
    const cloudSaveColor = !hasCloudSyncNow ? '#8c83a8' : (this.state.cloudBusy || this.state.cloudPending ? '#b7791f' : (cloudHasProblem ? '#d64262' : '#0f8f50'));
    const cloudSaveBg = !hasCloudSyncNow ? 'rgba(50,38,90,.045)' : (this.state.cloudBusy || this.state.cloudPending ? 'rgba(255,183,77,.13)' : (cloudHasProblem ? 'rgba(226,59,93,.1)' : 'rgba(61,220,151,.1)'));
    const mobileSyncBusy = !!this.state.cloudBusy;
    const mobileSyncLabel = !hasCloudSyncNow ? '同步' : (this.state.cloudBusy ? '同步中…' : (this.state.cloudPending ? '待上传' : (cloudHasProblem ? '同步异常' : '已同步')));
    const mobileSyncBtnStyle = { display: 'none', fontFamily: 'inherit', fontSize: '13px', fontWeight: 700, border: '1px solid', borderColor: (this.state.cloudBusy || this.state.cloudPending) ? 'rgba(183,121,31,.3)' : (cloudHasProblem ? 'rgba(226,59,93,.3)' : (hasCloudSyncNow ? 'rgba(15,143,80,.3)' : '#ded7ee')), color: cloudSaveColor, background: cloudSaveBg, padding: '8px 13px', borderRadius: '9px', cursor: this.state.cloudBusy ? 'default' : 'pointer', opacity: this.state.cloudBusy ? 0.7 : 1 };
    const cloudSaveBorder = !hasCloudSyncNow ? 'rgba(50,38,90,.1)' : (this.state.cloudBusy || this.state.cloudPending ? 'rgba(255,183,77,.28)' : (cloudHasProblem ? 'rgba(226,59,93,.22)' : 'rgba(61,220,151,.22)'));
    const cloudDotColor = !hasCloudSyncNow ? '#aaa3bd' : (this.state.cloudBusy || this.state.cloudPending ? '#d99023' : (cloudHasProblem ? '#e23b5d' : '#12a85f'));
    const cloudSavePillStyle = { display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: cloudSaveColor, background: cloudSaveBg, border: '1px solid ' + cloudSaveBorder, padding: '6px 11px', borderRadius: '999px' };
    const cloudSaveDotStyle = { width: '6px', height: '6px', borderRadius: '50%', background: cloudDotColor, boxShadow: '0 0 8px ' + cloudDotColor, flexShrink: 0 };
    const mobileMode = this.state.mobileMode || 'auto';
    const mobileTabView = this.state.view === 'ledger' ? 'ledger' : (this.state.filtersOpen ? 'search' : 'home');
    const _anyModalOpen = this.state.modalOpen || this.state.shippingOpen || this.state.settingsOpen || this.state.dataManageOpen || this.state.relinkRecordId || this.state.batchEditOpen || this.state.ledgerDetailKey || this.state.cloudPageOpen;
    const appClass = 'ui-app ui-mobile-full ui-view-' + mobileTabView + ' ui-fcat-' + (this.state.mobileFilterCat || 'none') + (this.state.filtersOpen ? ' ui-filters-open' : '') + (this.state.batchMode ? ' ui-batch-active' : '') + (_anyModalOpen ? ' ui-modal-open' : '');
    const mobileModeText = mobileMode === 'full' ? '清爽模式' : '完整模式';
    const activeCustomFilterCount = Object.values(this.state.customFilterSel || {}).reduce((n, arr) => n + (Array.isArray(arr) && arr.length ? 1 : 0), 0);
    const activeFilterCount = (charSel.length ? 1 : 0) + (typeSel.length ? 1 : 0) + (seriesFilter !== '全部' ? 1 : 0) + (formSel.length ? 1 : 0) + (statusSel.length ? 1 : 0) + (acquireSel.length ? 1 : 0) + (methodSel.length ? 1 : 0) + (setSel.length ? 1 : 0) + (channelSel.length ? 1 : 0) + ((purchaseChannelSel || []).length ? 1 : 0) + (tagSel.length ? 1 : 0) + (raritySel.length ? 1 : 0) + activeCustomFilterCount + (groupBySafe !== 'none' ? 1 : 0);
    const filterSummaryText = activeFilterCount ? (activeFilterCount + ' 个条件') : '全部';
    const filterToggleText = this.state.filtersOpen ? '收起筛选' : '展开筛选';

    // 作品 / 系列IP 切换
    const works = this.state.works || [];
    const curWork = works.find(w => w.id === this.state.currentWorkId) || works[0] || { group: this.DEFAULT_GROUP, name: '' };
    const workTabs = works.map(w => ({ id: w.id, name: w.name, group: w.group, active: w.id === this.state.currentWorkId, onClick: () => this.switchWork(w.id), onRename: (ev) => this.renameWork(w, ev), onRenameGroup: (ev) => this.renameGroup(w, ev), onDel: (ev) => this.delWork(w, ev), rowStyle: { display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 10px', borderRadius: '9px', cursor: 'pointer', background: w.id === this.state.currentWorkId ? 'rgba(255,51,85,.1)' : 'transparent' } }));
    const groupsMap = {}; workTabs.forEach(w => { (groupsMap[w.group || this.DEFAULT_GROUP] = groupsMap[w.group || this.DEFAULT_GROUP] || []).push(w); });
    const workGroups = Object.keys(groupsMap).map(g => ({ group: g, works: groupsMap[g] }));

    // ===== 收藏库树（侧栏 & 手机） =====
    const countByWork = {}; (this.state.items || []).forEach(it => { const wid = it.workId || this.MAIN_WORK; countByWork[wid] = (countByWork[wid] || 0) + 1; });
    const curId = this.state.currentWorkId;
    const workLogoNode = (id, size) => { const u = this.workLogo(id); return u ? { width: size + 'px', height: size + 'px', borderRadius: '7px', flexShrink: 0, backgroundImage: `url(${u})`, backgroundSize: 'cover', backgroundPosition: 'center', border: '1px solid #e3def1' } : { width: size + 'px', height: size + 'px', borderRadius: '7px', flexShrink: 0, background: this.accentAlpha(0.14), border: '1px solid ' + this.accentAlpha(0.25), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: (size * 0.5) + 'px', color: this.accentColor() }; };
    const libWorkRow = (w) => ({ id: w.id, name: w.name, count: countByWork[w.id] || 0, active: w.id === curId, hasLogo: !!this.workLogo(w.id), logoStyle: workLogoNode(w.id, 18), initial: (w.name || '?').slice(0, 1), rowStyle: { display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '6px 9px 6px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '13px', fontWeight: w.id === curId ? 700 : 500, textAlign: 'left', background: w.id === curId ? this.accentAlpha(0.12) : 'transparent', color: w.id === curId ? this.accentColor() : '#4c4580' }, countStyle: { marginLeft: 'auto', fontSize: '11px', fontFamily: "'Orbitron',sans-serif", whiteSpace: 'nowrap', flexShrink: 0, color: w.id === curId ? this.accentColor() : '#a99fc4' }, onClick: () => this.switchWork(w.id) });
    const libraryTree = Object.keys(groupsMap).map(g => ({ group: g, works: groupsMap[g].map(libWorkRow) }));
    const libAllActive = curId === this.ALL_WORKS;
    const libAllStyle = { display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '9px 11px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '13.5px', fontWeight: libAllActive ? 700 : 600, textAlign: 'left', background: libAllActive ? this.accentAlpha(0.14) : 'rgba(50,38,90,.04)', color: libAllActive ? this.accentColor() : '#4c4580' };
    const libAllCount = (this.state.items || []).length;
    const recentRows = (this.state.recentWorks || []).map(id => works.find(w => w.id === id)).filter(Boolean).slice(0, 3).map(libWorkRow);
    const hasRecent = recentRows.length > 0;
    // 手机端切换弹窗用
    const mobileWorkGroups = libraryTree;

    // ===== 设置面板数据 =====
    const sd = this.state.settingsDraft || this.makeSettingsDraft();
    const draftFieldLabels = sd.fieldLabels || {};
    const draftFilterOn = sd.filterOn || {};
    const draftStatsOn = sd.statsOn || {};
    const draftCustomFields = sd.customFields || [];
    const draftWorks = sd.works || [];
    const updateDraftFieldLabel = (key) => (e) => this.updateSettingsDraft({ fieldLabels: { ...draftFieldLabels, [key]: e.target.value } });
    const updateDraftCustomFieldLabel = (key) => (e) => this.updateSettingsDraft({ customFields: draftCustomFields.map(f => f.key === key ? { ...f, label: e.target.value } : f) });
    const toggleDraftFilterOn = (key) => () => this.updateSettingsDraft({ filterOn: { ...draftFilterOn, [key]: !draftFilterOn[key] } });
    const toggleDraftStatsOn = (key) => () => this.updateSettingsDraft({ statsOn: { ...draftStatsOn, [key]: draftStatsOn[key] === false ? true : false } });
    const L = k => (Object.prototype.hasOwnProperty.call(draftFieldLabels, k) ? draftFieldLabels[k] : (this.FIELD_DEFAULTS[k] || k));
    const labels = { character: this.flabel('character'), type: this.flabel('type'), series: this.flabel('series'), channel: this.flabel('channel'), purchaseChannel: this.flabel('purchaseChannel'), status: this.flabel('status'), form: this.flabel('form'), acquire: this.flabel('acquire') };
    const workManageRows = draftWorks.map(w => ({
      id: w.id, nameVal: w.name, groupVal: w.group || this.DEFAULT_GROUP, isCurrent: w.id === this.state.currentWorkId,
      onName: (e) => this.updateSettingsDraft({ works: draftWorks.map(x => x.id === w.id ? { ...x, name: e.target.value } : x) }),
      onGroup: (e) => this.updateSettingsDraft({ works: draftWorks.map(x => x.id === w.id ? { ...x, group: e.target.value } : x) }),
      onLogo: () => this.uploadWorkLogo(w.id), onDel: () => this.delWork(w), onPick: () => this.switchWork(w.id),
      logoStyle: this.workLogo(w.id) ? { width: '34px', height: '34px', borderRadius: '8px', backgroundImage: `url(${this.workLogo(w.id)})`, backgroundSize: 'cover', backgroundPosition: 'center', flexShrink: 0, cursor: 'pointer', border: '1px solid #ded7ee' } : { width: '34px', height: '34px', borderRadius: '8px', background: 'rgba(50,38,90,.06)', flexShrink: 0, cursor: 'pointer', border: '1px dashed #ccc4e6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#938db0' }
    }));
    const dashCfg = this.normalizeDashboardCards(sd.dashboardCards || this.state.dashboardCards);
    const dashOps = this.dashboardMetricOptions(sd.nameStyleMode || this.state.nameStyleMode || 'default');
    const setDashCard = (mode, idx) => (e) => {
      const cfg = this.normalizeDashboardCards((this.state.settingsDraft && this.state.settingsDraft.dashboardCards) || dashCfg);
      cfg[mode] = [...cfg[mode]];
      cfg[mode][idx] = e.target.value;
      this.updateSettingsDraft({ dashboardCards: cfg });
    };
    const dashboardCollectionRows = dashCfg.collection.map((v, i) => ({ no: '卡片' + (i + 1), value: v, options: dashOps.collection, onChange: setDashCard('collection', i) }));
    const dashboardSaleRows = dashCfg.sale.map((v, i) => ({ no: '卡片' + (i + 1), value: v, options: dashOps.sale, onChange: setDashCard('sale', i) }));
    const fieldRows = ['character', 'type', 'series', 'channel', 'purchaseChannel', 'status', 'form', 'acquire', 'tags', 'rarity'].filter(k => fieldVisible(k)).map(k => {
      const sOn = (draftStatsOn || {})[k] !== false;
      const fOn = !!draftFilterOn[k];
      return { key: k, labelVal: L(k), onLabel: updateDraftFieldLabel(k), onDel: this.deleteBaseField(k), filterOn: fOn, onToggle: toggleDraftFilterOn(k), onStatsToggle: toggleDraftStatsOn(k),
        filterStyle: { display: 'inline-flex', alignItems: 'center', gap: '5px', cursor: 'pointer', fontSize: '12.5px', color: fOn ? '#251d49' : '#938db0' },
        statStyle: { display: 'inline-flex', alignItems: 'center', gap: '5px', cursor: 'pointer', fontSize: '12.5px', color: sOn ? '#251d49' : '#938db0' },
        dot: { width: '34px', height: '20px', borderRadius: '999px', position: 'relative', flexShrink: 0, transition: '.15s', background: fOn ? 'var(--accent,#ff3355)' : '#d8d2ea' },
        knob: { position: 'absolute', top: '2px', left: fOn ? '16px' : '2px', width: '16px', height: '16px', borderRadius: '50%', background: '#fff', transition: '.15s' },
        statDot: { width: '34px', height: '20px', borderRadius: '999px', position: 'relative', flexShrink: 0, transition: '.15s', background: sOn ? 'var(--accent,#ff3355)' : '#d8d2ea' },
        statKnob: { position: 'absolute', top: '2px', left: sOn ? '16px' : '2px', width: '16px', height: '16px', borderRadius: '50%', background: '#fff', transition: '.15s' } };
    });
    const ob = this.state.optBuf || {};
    const optionGroups = [
      { key: 'character', label: L('character'), text: ob.charOrder != null ? ob.charOrder : (this.state.charOrder || []).join('\n'), onChange: this.setOptionsText('charOrder', 'zzz_char_order') },
      { key: 'type', label: L('type'), text: ob.typesList != null ? ob.typesList : (this.state.typesList || []).join('\n'), onChange: this.setOptionsText('typesList', 'zzz_types') },
      { key: 'series', label: L('series'), text: ob.seriesList != null ? ob.seriesList : (this.state.seriesList || []).join('\n'), onChange: this.setOptionsText('seriesList', 'zzz_series') },
      { key: 'channel', label: L('channel'), text: ob.channels != null ? ob.channels : (this.state.channels || []).join('\n'), onChange: this.setOptionsText('channels', 'zzz_channels') },
      { key: 'purchaseChannel', label: L('purchaseChannel'), text: ob.purchaseChannels != null ? ob.purchaseChannels : (this.state.purchaseChannels || this.CHANNELS).join('\n'), onChange: this.setOptionsText('purchaseChannels', 'zzz_purchase_channels') },
      { key: 'status', label: L('status'), text: ob.statusList != null ? ob.statusList : (this.state.statusList || []).join('\n'), onChange: this.setOptionsText('statusList', 'zzz_status') },
      { key: 'form', label: L('form'), text: ob.formOrder != null ? ob.formOrder : (this.state.formOrder || []).join('\n'), onChange: this.setOptionsText('formOrder', 'zzz_form_order') },
      { key: 'acquire', label: L('acquire'), text: ob.acquireOrder != null ? ob.acquireOrder : (this.state.acquireOrder || []).join('\n'), onChange: this.setOptionsText('acquireOrder', 'zzz_acquire_order') },
      { key: 'reminderType', label: '提醒类型', text: ob.reminderTypes != null ? ob.reminderTypes : (this.state.reminderTypes || this.REMINDER_TYPES).join('\n'), onChange: this.setOptionsText('reminderTypes', 'zzz_reminder_types') }
    ].filter(o => o.key === 'reminderType' || fieldVisible(o.key));
    // 自定义字段
    const customFieldRows = draftCustomFields.map(f => { const sOn = (draftStatsOn || {})[f.key] !== false; const fOn = !!draftFilterOn[f.key]; return { key: f.key, labelVal: f.label, onLabel: updateDraftCustomFieldLabel(f.key), onDel: () => this.delCustomField(f.key), onToggle: toggleDraftFilterOn(f.key), onStatsToggle: toggleDraftStatsOn(f.key),
      filterStyle: { display: 'inline-flex', alignItems: 'center', gap: '5px', cursor: 'pointer', fontSize: '12.5px', color: fOn ? '#251d49' : '#938db0' },
      statStyle: { display: 'inline-flex', alignItems: 'center', gap: '5px', cursor: 'pointer', fontSize: '12.5px', color: sOn ? '#251d49' : '#938db0' },
      dot: { width: '34px', height: '20px', borderRadius: '999px', position: 'relative', flexShrink: 0, transition: '.15s', background: fOn ? 'var(--accent,#ff3355)' : '#d8d2ea' },
      knob: { position: 'absolute', top: '2px', left: fOn ? '16px' : '2px', width: '16px', height: '16px', borderRadius: '50%', background: '#fff', transition: '.15s' },
      statDot: { width: '34px', height: '20px', borderRadius: '999px', position: 'relative', flexShrink: 0, transition: '.15s', background: sOn ? 'var(--accent,#ff3355)' : '#d8d2ea' },
      statKnob: { position: 'absolute', top: '2px', left: sOn ? '16px' : '2px', width: '16px', height: '16px', borderRadius: '50%', background: '#fff', transition: '.15s' } }; });
    const draftCustomInputs = (this.state.customFields || []).map(f => { const val = (this.state.draft && this.state.draft.custom && this.state.draft.custom[f.key]) || ''; const opts = (f.options || []).slice(); if (val && !opts.includes(val)) opts.push(val); const menuOpen = !!(this.state.customMenuOpen || {})[f.key]; return { key: f.key, label: f.label, value: val, display: val || '（未选择）', menuOpen, onToggleMenu: this.toggleCustomMenu(f.key), onClear: () => this.pickCustom(f.key, ''), onChange: this.onCustomDraft(f.key), optionItems: opts.map(o => ({ v: o, onPick: () => this.pickCustom(f.key, o), rowStyle: this.menuRow(val === o) })), hasOpts: opts.length > 0, onManage: () => this.openManage('custom:' + f.key), onRenameField: () => this.renameCustomFieldLabel(f.key) }; });
    // 按系列IP分组的作品管理
    const draftCurrentWorkId = sd.currentWorkId || this.state.currentWorkId;
    const wgMap = {}; draftWorks.forEach(w => { const gkey = (w.group || this.DEFAULT_GROUP); (wgMap[gkey] = wgMap[gkey] || []).push(w); });
    const workSettingGroups = Object.keys(wgMap).map(g => ({
      group: g,
      onGroupName: (e) => {
        const nextGroup = e.target.value;
        this.updateSettingsDraft({ works: draftWorks.map(x => (x.group || this.DEFAULT_GROUP) === g ? { ...x, group: nextGroup } : x) });
      },
      onAddWork: () => this.addSeriesAlone(g),
      works: wgMap[g].map(w => ({ id: w.id, nameVal: w.name, isCurrent: w.id === draftCurrentWorkId,
        onName: (e) => this.updateSettingsDraft({ works: draftWorks.map(x => x.id === w.id ? { ...x, name: e.target.value } : x) }),
        onLogo: () => this.uploadWorkLogo(w.id),
        onDel: () => {
          if ((draftWorks || []).length <= 1) { window.alert('至少保留一个作品。'); return; }
          if (!window.confirm('删除作品「' + (w.name || '未命名作品') + '」？保存后会同时移除它下面的谷子。')) return;
          const nextWorks = draftWorks.filter(x => x.id !== w.id);
          const nextCurrent = w.id === draftCurrentWorkId ? (nextWorks[0] && nextWorks[0].id) : draftCurrentWorkId;
          this.updateSettingsDraft({ works: nextWorks, currentWorkId: nextCurrent });
        },
        onPick: () => this.updateSettingsDraft({ currentWorkId: w.id }),
        useStyle: { flexShrink: 0, fontFamily: 'inherit', fontSize: '12px', fontWeight: 700, cursor: 'pointer', padding: '6px 10px', borderRadius: '7px', border: '1px solid ' + (w.id === draftCurrentWorkId ? '#2f6fdb' : '#ded7ee'), background: w.id === draftCurrentWorkId ? 'rgba(47,111,219,.1)' : 'transparent', color: w.id === draftCurrentWorkId ? '#2f6fdb' : '#b9b3d2' },
        useText: w.id === draftCurrentWorkId ? '用' : '否',
        logoStyle: this.workLogo(w.id) ? { width: '32px', height: '32px', borderRadius: '8px', backgroundImage: `url(${this.workLogo(w.id)})`, backgroundSize: 'cover', backgroundPosition: 'center', flexShrink: 0, cursor: 'pointer', border: '1px solid #ded7ee' } : { width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(50,38,90,.06)', flexShrink: 0, cursor: 'pointer', border: '1px dashed #ccc4e6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', color: '#938db0' } }))
    }));
    const customHeaderLogo = this.workLogo(this.state.currentWorkId) || this.logoUrl || '';
    const headerLogoUrl = customHeaderLogo;
    const logoFallback = !customHeaderLogo;
    // 作品管理弹窗（直接编辑实时数据）
    const _wmMap = {}; (this.state.works || []).forEach(w => { const g = w.group || this.DEFAULT_GROUP; (_wmMap[g] = _wmMap[g] || []).push(w); });
    const workManageGroups = Object.keys(_wmMap).map(g => ({
      group: g,
      onRenameGroup: () => this.renameGroup(_wmMap[g][0]),
      onAddWork: () => this.addSeriesAlone(g),
      works: _wmMap[g].map(w => ({
        id: w.id, name: w.name || '未命名作品', isCurrent: w.id === this.state.currentWorkId,
        hasLogo: !!this.workLogo(w.id), noLogoText: !this.workLogo(w.id),
        logoStyle: this.workLogo(w.id) ? { width: '34px', height: '34px', borderRadius: '8px', backgroundImage: `url(${this.workLogo(w.id)})`, backgroundSize: 'cover', backgroundPosition: 'center', flexShrink: 0, cursor: 'pointer' } : { width: '34px', height: '34px', borderRadius: '8px', background: 'rgba(50,38,90,.06)', border: '1px dashed #d4cee7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a49ec4', fontSize: '10px', flexShrink: 0, cursor: 'pointer' },
        onLogo: () => this.uploadWorkLogo(w.id), onRename: () => this.renameWork(w), onDel: () => this.delWork(w), onPick: () => { this.switchWork(w.id); this.closeWorkManage(); },
        useStyle: { flexShrink: 0, fontFamily: 'inherit', fontSize: '12px', fontWeight: 700, cursor: 'pointer', padding: '6px 10px', borderRadius: '7px', border: '1px solid ' + (w.id === this.state.currentWorkId ? 'transparent' : '#ded7ee'), background: w.id === this.state.currentWorkId ? this.accentColor() : '#fff', color: w.id === this.state.currentWorkId ? '#fff' : '#8b84ad' },
        useText: w.id === this.state.currentWorkId ? '当前' : '切到'
      }))
    }));
    const _setMgWork = (this.state.draft && this.state.draft.workId) || this.state.currentWorkId || this.MAIN_WORK;
    const setManageList = (this.state.sets || []).filter(s => (s.workId || this.MAIN_WORK) === _setMgWork).map(s => {
      const got = this.setCollectedCodes(s.id, null).length;
      const collapsed = !!(this.state.setManageCollapsed || {})[s.id];
      return {
        id: s.id, name: s.name, progress: (s.total ? got + ' / ' + s.total : String(got)) + ' 款',
        collapsed, notCollapsed: !collapsed, caret: collapsed ? '▸' : '▾', onToggle: () => this.toggleSetCollapse(s.id),
        onRename: () => this.renameSet(s.id), onDel: () => this.delSet(s.id), onAddMember: () => this.addSetMember(s.id),
        members: (s.members || []).map((m, idx) => ({ label: m.code + ' ' + m.name, onRename: () => this.renameSetMember(s.id, idx), onDel: () => this.delSetMember(s.id, idx) })),
        charChips: this.orderedChars().filter(c => c && c !== '全部').map(c => { const on = (s.members || []).some(m => m.name === c); return { name: c, added: on, onAdd: () => this.addSetMemberChar(s.id, c), chipStyle: { padding: '4px 11px', borderRadius: '999px', fontFamily: 'inherit', fontSize: '12px', cursor: on ? 'default' : 'pointer', border: '1px solid ' + (on ? 'transparent' : '#ded7ee'), background: on ? this.accentAlpha(0.12) : '#fff', color: on ? this.accentColor() : '#595287', opacity: on ? 0.65 : 1 } }; })
      };
    });
    const cnPrefix = (this.state.collectorName || '').trim();
    const setFilterOn = (this.state.filterOn || {})['set'] === true;
    const setGroupOn = (this.state.statsOn || {})['set'] !== false;
    const setBatchOn = (this.state.batchOn || {})['set'] !== false;
    const _tglBase = { padding: '4px 12px', borderRadius: '999px', fontFamily: 'inherit', fontSize: '12px', fontWeight: 700, cursor: 'pointer', border: '1px solid' };
    const setFilterStyle = { ..._tglBase, borderColor: setFilterOn ? 'transparent' : '#ded7ee', background: setFilterOn ? this.accentColor() : '#fff', color: setFilterOn ? '#fff' : '#8b84ad' };
    const setGroupStyle = { ..._tglBase, borderColor: setGroupOn ? 'transparent' : '#ded7ee', background: setGroupOn ? this.accentColor() : '#fff', color: setGroupOn ? '#fff' : '#8b84ad' };
    const setBatchStyle = { ..._tglBase, borderColor: setBatchOn ? 'transparent' : '#ded7ee', background: setBatchOn ? this.accentColor() : '#fff', color: setBatchOn ? '#fff' : '#8b84ad' };
    const cnDisplay = cnPrefix || 'CN / 昵称';
    const cnSidebarClass = 'ui-sidebar-cn ui-editable-text' + (cnPrefix ? '' : ' ui-sidebar-cn-empty');
    const shipDraft = this.state.shippingDraft || this.newShippingDraft();
    const shipVisibleItems = this.shippingVisibleItems(shipDraft);
    const shipItemChoices = shipVisibleItems.map(it => ({ id: it.id, label: ((it.name || '未命名') + (it.status ? ' · ' + it.status : '') + (it.purchaseChannel ? ' · ' + it.purchaseChannel : '')), checked: (shipDraft.itemIds || []).includes(it.id), onToggle: this.toggleShipItem(it.id) }));
    const shipStatusOptions = [...new Set((this.state.items || []).map(it => it.status).filter(Boolean))];
    const shipRecords = this.state.shippingRecords || [];
    const shippingBatchRows=(this.state.shippingBatches||[]).map(b=>({name:b.batch_name||b.export_filename||'排发记录',group:b.group||'未分类渠道',itemCount:b.item_count||0,documentCount:b.document_count||0,date:b.dateText||'',onDelete:this.deleteShippingBatch(b.id)}));
    const pkgMap = {}; shipRecords.forEach(r => { const k=this.shippingPackageKey(r); (pkgMap[k]=pkgMap[k]||[]).push(r); });
    const shippingPackageRows = Object.entries(pkgMap).map(([key,rs]) => { const ids=[...new Set(rs.flatMap(r=>r.itemIds||[]))]; const itemName=(id)=>{const it=(this.state.items||[]).find(x=>x.id===id);return it?(it.name||'未命名'):'(已删除)';}; return { key, group:rs[0].group||'未分类渠道', batch:'排发中心', recordCount:rs.length, itemCount:ids.length, types:[...new Set(rs.map(r=>r.typeLabel||this.shippingTypeLabel(r.type).module))].join('、'), onView:this.viewShippingPackage(key), onExport:()=>this.exportShippingPackage(key), records:rs.map(r=>{ const names=(r.itemIds||[]).map(itemName), thumbs=(r.images||[]).filter(im=>im&&im.image).slice(0,4).map(im=>({style:{backgroundImage:`url(${im.image})`}})); return { ...r, type:r.typeLabel||this.shippingTypeLabel(r.type).module, itemCount:(r.itemIds||[]).length, itemNames: names.length?names.join('、'):'未关联谷子', note:(r.note||'无备注')+' · '+((r.images||[]).length)+' 张图', hasThumb:thumbs.length>0, thumbs, downloadText:this.isPhoneDevice()?'分享':'下载', onDownload:this.downloadShippingRecord(r.id), onDelete:this.deleteShipping(r.id), onRelink:this.openRelinkRecord(r.id) }; }) }; });
    const _shipChannels = shippingPackageRows.map(p => p.group);
    const _shipViewCh = (this.state.shippingViewChannel && _shipChannels.includes(this.state.shippingViewChannel)) ? this.state.shippingViewChannel : (_shipChannels[0] || null);
    const shippingChannelChips = _shipChannels.map(g => ({ label: g, active: g === _shipViewCh, onClick: this.setShippingViewChannel(g), style: { flexShrink: 0, whiteSpace: 'nowrap', fontFamily: 'inherit', fontSize: '12.5px', fontWeight: 700, padding: '6px 13px', borderRadius: '999px', cursor: 'pointer', border: '1px solid', borderColor: g === _shipViewCh ? 'transparent' : '#ded7ee', background: g === _shipViewCh ? this.accentColor() : '#fff', color: g === _shipViewCh ? '#fff' : '#8b84ad' } }));
    const shippingPackageRowsView = shippingPackageRows.filter(p => p.group === _shipViewCh);
    const previewKey = this.state.shippingPreviewPackageKey || (shippingPackageRows[0] && shippingPackageRows[0].key) || '';
    const previewRecords = shipRecords.filter(r => this.shippingPackageKey(r)===previewKey).sort((a,b)=>(a.createdAt||0)-(b.createdAt||0));
    // 导出预览：跟着右边勾选的谷子实时汇总它们关联的全部资料（勾了才显示，去重）
    const _exSelIds = this.state.exportIds || [];
    const _exSelRecords = _exSelIds.length ? shipRecords.filter(r => (r.itemIds||[]).some(id => _exSelIds.includes(id))).sort((a,b)=>{const o=this.SHIPPING_TYPES;return (o.indexOf(a.type)-o.indexOf(b.type))||((a.createdAt||0)-(b.createdAt||0));}) : [];
    const previewItems = _exSelIds.map(id=>(this.state.items||[]).find(it=>it.id===id)).filter(Boolean);
    const previewPackageRows = _exSelRecords.flatMap(r=>(r.images||[]).map(im=>({image:im.image,imgEl:im.image?React.createElement('img',{src:im.image}):null,type:(r.typeLabel||this.shippingTypeLabel(r.type).module)+' · '+this.shippingRoleLabel(im.role),note:r.note||'',hasNote:!!r.note})));
    const previewItemSummary = previewItems.length ? ('本批共 '+previewItems.length+' 个谷子：\n'+previewItems.map((it,i)=>(i+1)+'. '+(it.name||'未命名')+(it.qty?' ×'+it.qty:'')).join('\n')) : '本批尚未关联具体谷子。';
    // 导出选谷子器
    const _relinkId = this.state.relinkRecordId;
    const _relinkRec = _relinkId ? (this.state.shippingRecords || []).find(r => r.id === _relinkId) : null;
    const _relinkSel = this.state.relinkItemIds || [];
    const _relinkQ = String(this.state.relinkSearch || '').trim().toLowerCase();
    const relinkOpen = !!_relinkRec;
    const relinkTitle = _relinkRec ? ((_relinkRec.typeLabel || _relinkRec.type || '资料') + (_relinkRec.group ? ' · ' + _relinkRec.group : '')) : '';
    const _relinkGrp = String(this.state.relinkGroup || '').trim();
    const relinkItemChoices = _relinkRec ? (this.state.items || []).filter(it => {
      const isLinked = _relinkSel.includes(it.id);
      if (_relinkQ) { const hay = [it.name, it.character, it.type, it.series, it.purchaseChannel].map(x => String(x || '').toLowerCase()).join(' '); return hay.includes(_relinkQ); }
      if (_relinkGrp) return isLinked || String(it.purchaseChannel || '').trim() === _relinkGrp;
      return true;
    }).slice(0, 300).map(it => ({ id: it.id, label: (it.name || '未命名') + (it.status ? ' · ' + it.status : '') + (it.purchaseChannel ? ' · ' + it.purchaseChannel : ''), checked: _relinkSel.includes(it.id), onToggle: this.toggleRelinkItem(it.id) })) : [];
    const relinkSelectedCount = _relinkSel.length;
    const relinkRoleOptions = this.shippingRoles(this.state.relinkRecordType || (_relinkRec && _relinkRec.type) || '补充资料').map(v => ({ value: v, label: this.shippingRoleLabel(v) }));
    const relinkImageRows = (this.state.relinkImages || []).map(im => ({
      id: im.id, image: im.image, role: im.role,
      roleLabel: this.shippingRoleLabel(im.role),
      onOpenRole: (ev) => this.openGenericSelect('图片分类', relinkRoleOptions, im.role, (v) => this.setRelinkImageRole(im.id)({ target: { value: v } }), ev),
      onToggleRemove: this.toggleRelinkImageRemove(im.id), onRoleChange: this.setRelinkImageRole(im.id),
      hasThumb: !!String(im.image || '').trim(), thumbStyle: `background-image:url(${im.image});`,
      cardStyle: im.toRemove ? 'opacity:.45;' : '',
      removeLabel: im.toRemove ? '撤销移除' : '移除'
    }));
    const noRelinkImages = relinkImageRows.length === 0;
    const relinkNewFileRows = (this.state.relinkNewFiles || []).map((f, idx) => ({
      idx, filename: f.filename, role: f.role,
      roleLabel: this.shippingRoleLabel(f.role),
      onOpenRole: (ev) => this.openGenericSelect('图片分类', relinkRoleOptions, f.role, (v) => this.setRelinkNewFileRole(idx)({ target: { value: v } }), ev),
      onRemove: this.removeRelinkNewFile(idx), onRoleChange: this.setRelinkNewFileRole(idx)
    }));
    const hasRelinkNewFiles = relinkNewFileRows.length > 0;
    const _exRecs = this.state.shippingRecords || [];
    const _exGroupSet = [...new Set(_exRecs.map(r=>String(r.group||'未分类渠道')).filter(Boolean))];
    const _exVisible = this.exportVisibleItems();
    const _exIds = this.state.exportIds || [];
    const exportGroupOptions = _exGroupSet;
    this._exportGroupOpts = exportGroupOptions;
    const exportGroupText = this.state.exportGroup ? this.state.exportGroup : '全部团／渠道';
    const exportItemChoices = _exVisible.map(it=>{const grps=[...new Set(_exRecs.filter(r=>(r.itemIds||[]).includes(it.id)).map(r=>String(r.group||'未分类渠道')))];return{id:it.id,label:((it.name||'未命名')+(it.character?' · '+it.character:'')+(it.status?' · '+it.status:'')+(grps.length?' 〔'+grps.join('／')+'〕':'')),checked:_exIds.includes(it.id),onToggle:this.toggleExportItem(it.id)};});

    // ===== 单个谷子的"排发"tab =====
    const modalTabIsEdit = (this.state.modalTab || 'edit') === 'edit';
    const tabBtnBase = (active) => ({ fontFamily: 'inherit', fontSize: '13px', fontWeight: 700, padding: '8px 16px', border: 'none', borderRadius: '9px 9px 0 0', cursor: 'pointer', background: active ? '#fff' : 'transparent', color: active ? '#251d49' : '#938db0', borderBottom: active ? '2px solid var(--accent,#ff3355)' : '2px solid transparent' });
    const editTabStyle = tabBtnBase(modalTabIsEdit);
    const shipTabStyle = tabBtnBase(!modalTabIsEdit);
    const curEditItemId = this.curEditItemId();
    const itemShipRecordsRaw = curEditItemId ? this.itemShipRecordsFor(curEditItemId) : [];
    const itemShipGroups = this.SHIPPING_TYPES.map(t => ({
      type: t, label: this.shippingTypeLabel(t).module,
      records: itemShipRecordsRaw.filter(r => (r.type || '补充资料') === t).map(r => ({
        id: r.id,
        roleText: (r.images || []).map(im => this.shippingRoleLabel(im.role)).join('、') || '资料',
        note: r.note || '', hasNote: !!r.note,
        thumbStyle: { backgroundImage: `url(${((r.images||[]).find(im=>im&&im.image)||{}).image||''})` }, hasThumb: !!((r.images||[]).find(im=>im&&im.image)),
        group: r.group || '未分类渠道',
        isShared: (r.itemIds || []).length > 1, sharedCount: (r.itemIds || []).length - 1,
        onRelink: this.openRelinkRecord(r.id), onUnlink: this.unlinkItemFromRecord(r.id), onDelete: this.deleteShipping(r.id)
      }))
    })).filter(g => g.records.length > 0);
    const hasItemShipRecords = itemShipGroups.length > 0;
    const noItemShipRecords = !hasItemShipRecords;

    // ===== 关联已有资料 搜索列表 =====
    const linkQ = (this.state.linkExistingSearch || '').trim().toLowerCase();
    const linkCh = String(this.state.linkExistingChannel || '').trim();
    const linkExistingChannels = [...new Set((this.state.shippingRecords || []).map(r => r.group || '未分类渠道'))];
    const linkExistingChannelChips = ['全部', ...linkExistingChannels].map(g => { const val = g === '全部' ? '' : g; const active = linkCh === val; return { label: g, onClick: this.setLinkExistingChannel(val), style: { flexShrink: 0, whiteSpace: 'nowrap', fontFamily: 'inherit', fontSize: '12px', fontWeight: 700, padding: '5px 12px', borderRadius: '999px', cursor: 'pointer', border: '1px solid', borderColor: active ? 'transparent' : '#ded7ee', background: active ? this.accentColor() : '#fff', color: active ? '#fff' : '#8b84ad' } }; });
    const linkExistingRows = (this.state.shippingRecords || []).filter(r => {
      if (linkCh && (r.group || '未分类渠道') !== linkCh) return false;
      if (!linkQ) return true;
      const hay = [r.group, r.note, this.shippingTypeLabel(r.type || '').module, ...(r.images || []).map(im => this.shippingRoleLabel(im.role))].join(' ').toLowerCase();
      return hay.includes(linkQ);
    }).slice(0, 60).map(r => ({
      id: r.id, typeLabel: r.typeLabel || this.shippingTypeLabel(r.type || '补充资料').module,
      roleText: (r.images || []).map(im => this.shippingRoleLabel(im.role)).join('、') || '资料',
      note: r.note || '', group: r.group || '未分类渠道',
      thumbStyle: { backgroundImage: `url(${r.image})` }, hasThumb: !!r.image,
      itemCount: (r.itemIds || []).length,
      alreadyLinked: curEditItemId ? (r.itemIds || []).includes(curEditItemId) : false,
      canLink: curEditItemId ? !(r.itemIds || []).includes(curEditItemId) : true,
      onLink: this.linkRecordToCurrentItem(r.id)
    }));
    const noLinkExistingRows = linkExistingRows.length === 0;

    // ===== 角色分类管理弹窗 =====
    const shipRoleManageType = this.state.shipRoleManageType || '本体资料';
    const shipRoleManageTitle = '管理「' + this.shippingTypeLabel(shipRoleManageType).module + '」的图片分类';
    const shipRoleManageRows = this.shippingRoles(shipRoleManageType).map((name, idx) => ({
      name, idx,
      onRename: this.shipRoleRename(name), onDelete: this.shipRoleDelete(name),
      onMoveUp: this.shipRoleMove(name, -1), onMoveDown: this.shipRoleMove(name, 1)
    }));

    // ===== 手机端：筛选改为「横向分类 tab + 只展开当前选中类别」 =====
    const mobileFilterCatDefs = [
      { key: 'character', label: labels.character, show: fieldVisible('character') && this.state.filterOn.character !== false },
      { key: 'type', label: labels.type, show: fieldVisible('type') && this.state.filterOn.type !== false },
      { key: 'series', label: labels.series, show: showSeriesFilter && this.state.filterOn.series !== false },
      { key: 'form', label: labels.form, show: fieldVisible('form') && this.state.filterOn.form !== false },
      { key: 'status', label: labels.status, show: showStatusFilter },
      { key: 'acquire', label: labels.acquire, show: fieldVisible('acquire') && this.state.filterOn.acquire !== false },
      { key: 'method', label: this.flabel('method'), show: showMethodFilter },
      { key: 'channel', label: labels.channel, show: showChannelFilter && this.state.filterOn.channel !== false },
      { key: 'purchaseChannel', label: labels.purchaseChannel, show: showPurchaseChannelFilter && this.state.filterOn.purchaseChannel !== false },
      { key: 'set', label: this.flabel('set'), show: showSetFilter },
      { key: 'tag', label: this.flabel('tags'), show: showTagFilter },
      { key: 'rarity', label: this.flabel('rarity'), show: showRarityFilter },
      { key: 'custom', label: '自定义', show: (customFilterRows || []).length > 0 },
      { key: 'group', label: '分组', show: true }
    ].filter(c => c.show);
    const mobileFilterCat = this.state.mobileFilterCat || '';
    const mobileFilterCatChips = mobileFilterCatDefs.map(c => ({
      label: c.label, key: c.key,
      onClick: () => this.setState({ mobileFilterCat: mobileFilterCat === c.key ? '' : c.key }),
      style: { ...this.segStyle(mobileFilterCat === c.key), whiteSpace: 'nowrap', flexShrink: 0 }
    }));
    const galleryIconStyle = { ...this.segStyle(view === 'gallery'), padding: '4px 6px', fontSize: '11px', borderRadius: '6px' };
    const circleIconStyle = { ...this.segStyle(view === 'circle'), padding: '4px 6px', fontSize: '11px', borderRadius: '6px' };
    const mobileGroupTabStyle = { padding: '6px 3px', fontSize: '10px', borderRadius: '7px', flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' };
    const mobileGroupTextLabel = t => t.label || (t.key === 'all' ? '全部' : '');
    const mobileGroupTabs = groupTabs.map(t => ({ ...t, mobileLabel: mobileGroupTextLabel(t), style: { ...t.style, ...mobileGroupTabStyle } }));
    const gtAll = mobileGroupTabs.find(t => t.key === 'all') || mobileGroupTabs[0];
    const gtInhand = mobileGroupTabs.find(t => t.key === 'inhand') || mobileGroupTabs[0];
    const gtAir = mobileGroupTabs.find(t => t.key === 'air') || mobileGroupTabs[0];
    const gtSale = mobileGroupTabs.find(t => t.key === 'sale') || mobileGroupTabs[0];

    const _wmOn = this.state.shipWatermark !== false;
    const shipWatermarkToggleStyle = { flexShrink: 0, width: '46px', minWidth: '46px', height: '28px', minHeight: '28px', borderRadius: '999px', border: 'none', cursor: 'pointer', padding: 0, position: 'relative', background: _wmOn ? this.accentColor() : '#d8d2ea', transition: 'background .18s' };
    const shipWatermarkKnobStyle = { position: 'absolute', top: '3px', left: _wmOn ? '21px' : '3px', width: '22px', height: '22px', borderRadius: '50%', background: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,.25)', transition: 'left .18s' };
    return {
      shippingExportButtonText: this.isPhoneDevice() ? '分享排发长图' : '下载排发长图',
      toggleShipWatermark: this.toggleShipWatermark, shipWatermarkToggleStyle, shipWatermarkKnobStyle,
      setRoot: this.setRoot, setImportRef: this.setImportRef, setExcelImportRef: this.setExcelImportRef, stop: this.stop,
      openShipping: this.openShipping, closeShipping: this.closeShipping, shippingOpen: this.state.shippingOpen, shippingCount: shipRecords.length, shippingPackageCount: shippingPackageRows.length, shippingBatchRows, shippingBatchCount:shippingBatchRows.length, noShippingBatches:shippingBatchRows.length===0, shippingTypes: this.SHIPPING_TYPES, shippingTypeOptions:this.SHIPPING_TYPES.map(value=>({value,label:this.shippingTypeLabel(value).module})), shippingRoleOptions:this.shippingRoles(shipDraft.type).map(value=>({value,label:this.shippingRoleLabel(value)})), shipRole:shipDraft.role || this.shippingRoles(shipDraft.type)[0], shipGroup: shipDraft.group || '',  shipBatch: '排发中心', shipTypeMenuItems: this.SHIPPING_TYPES.map(v=>({label:this.shippingTypeLabel(v).module,onPick:this.pickShip('type',v),rowStyle:this.menuRow((shipDraft.type||'本体资料')===v)})), shipTypeDisplay: this.shippingTypeLabel(shipDraft.type||'本体资料').module, shipTypeMenuOpen: this.state.shipTypeMenuOpen, toggleShipTypeMenu: this.toggleShipMenu('shipTypeMenuOpen'), shipRoleMenuItems: this.shippingRoles(shipDraft.type).map(v=>({label:this.shippingRoleLabel(v),onPick:this.pickShip('role',v),rowStyle:this.menuRow((shipDraft.role||this.shippingRoles(shipDraft.type)[0])===v)})), shipRoleDisplay: this.shippingRoleLabel(shipDraft.role||this.shippingRoles(shipDraft.type)[0]), shipRoleMenuOpen: this.state.shipRoleMenuOpen, toggleShipRoleMenu: this.toggleShipMenu('shipRoleMenuOpen'), shipStatusMenuItems: ['全部',...shipStatusOptions].map(v=>({label:v==='全部'?'全部状态':v,onPick:this.pickShip('status',v),rowStyle:this.menuRow((shipDraft.status||'全部')===v)})), shipStatusDisplay: (shipDraft.status&&shipDraft.status!=='全部')?shipDraft.status:'全部状态', shipStatusMenuOpen: this.state.shipStatusMenuOpen, toggleShipStatusMenu: this.toggleShipMenu('shipStatusMenuOpen'), shipGroupMenuItems: [...new Set([...(this.state.purchaseChannels||[]),...(this.state.channels||[]),...((this.state.shippingRecords||[]).map(r=>r.group).filter(Boolean))])].map(v=>({label:v,onPick:this.pickShip('group',v),rowStyle:this.menuRow(shipDraft.group===v)})), shipGroupMenuOpen: this.state.shipGroupMenuOpen, toggleShipGroupMenu: this.toggleShipMenu('shipGroupMenuOpen'), hasShipGroupMenu: [...new Set([...(this.state.purchaseChannels||[]),...(this.state.channels||[])])].length>0, shippingGroups: [...new Set([...(this.state.purchaseChannels || []), ...shipRecords.map(r => r.group).filter(Boolean)])], shippingBatches: [...new Set(shipRecords.filter(r => !shipDraft.group || r.group === shipDraft.group).map(r => r.batch).filter(Boolean))], fixedCn: cnPrefix || '未填写', shipType: shipDraft.type || '本体资料', openShipRoleManageForType: this.openShipRoleManage(shipDraft.type || '本体资料'), shipNote: shipDraft.note || '', shipSearch: shipDraft.search || '', shipStatus: shipDraft.status || '全部', shipStatusOptions, shipVisibleCount: shipVisibleItems.length, shipSelectedCount: (shipDraft.itemIds || []).length, noShipItemChoices: shipItemChoices.length === 0, onShipGroup: this.onShipField('group'), onShipBatch: this.onShipField('batch'), onShipType: this.onShipField('type'), onShipRole:this.onShipField('role'), onShipNote: this.onShipField('note'), onShipSearch: this.onShipField('search'), onShipStatus: this.onShipField('status'), selectAllVisibleShipItems: this.selectAllVisibleShipItems, clearShipItems: this.clearShipItems, reuseLastShipItems: this.reuseLastShipItems, onShipImage: this.onShipImage, saveShipping: this.saveShipping, shipNotice: this.state.shipNotice || '', hasShipNotice: !!this.state.shipNotice, shipNotConnected: !this.shippingSyncCode(), shipItemChoices, relinkOpen, relinkTitle, relinkItemChoices, relinkSelectedCount, onRelinkSearch: this.onRelinkSearch, relinkSearch: this.state.relinkSearch || '', closeRelink: this.closeRelink, saveRelink: this.saveRelink, relinkNote: this.state.relinkNote || '', onRelinkNote: this.onRelinkNote, relinkGroup: this.state.relinkGroup || '', onRelinkGroup: this.onRelinkGroup, relinkGroupText: (this.state.relinkGroup || '').trim() || '（未选择团／渠道）', hasRelinkGroupFilter: !!(this.state.relinkGroup || '').trim(), openRelinkGroupSelect: this.openRelinkGroupSelect, relinkNoteOpen: this.state.relinkNoteOpen, toggleRelinkNote: this.toggleRelinkNote, relinkNoteCaret: this.state.relinkNoteOpen ? '▲' : '▼', stopEvt: (e)=>{ e && e.stopPropagation && e.stopPropagation(); }, noRelinkChoices: relinkItemChoices.length === 0, relinkRoleOptions, relinkImageRows, noRelinkImages, onRelinkNewFiles: this.onRelinkNewFiles, relinkNewFileRows, hasRelinkNewFiles, shippingPackageRows: shippingPackageRowsView, shippingChannelChips, hasShippingChannels: shippingChannelChips.length > 0, noShippingPackages: shippingPackageRows.length === 0, hasShipDraftImage:(shipDraft.files||[]).length>0, shipUploadText:(shipDraft.files||[]).length?'＋ 继续添加图片':'＋ 添加资料图片', shipDraftImageSummary:(shipDraft.files||[]).map(x=>this.shippingRoleLabel(x.role)+'：'+x.filename).join('；'), clearShipImages:this.clearShipImages, previewCn: cnPrefix || '未填写', previewGroup: this.state.shippingPreviewGroup || (previewRecords[0] && previewRecords[0].group) || '未选择团／渠道', previewBatch: '按当前勾选谷子自动汇总', previewPackageRows, previewItemSummary, noPreviewPackage: previewPackageRows.length === 0, exportShippingPackage: this.exportShippingPackage, exportSelectedShipping:this.exportSelectedShipping,
      toggleShipAddForm: this.toggleAddFormCollapsed, shipAddExpanded: !this.state.shipAddCollapsed, shipAddCaret: this.state.shipAddCollapsed ? '▼ 展开' : '▲ 收起',
      exportGroup: this.state.exportGroup || '', exportSearch: this.state.exportSearch || '', onExportGroup: this.onExportGroup, openExportGroupSelect: this.openExportGroupSelect, exportGroupText, onExportSearch: this.onExportSearch, exportGroupOptions, exportItemChoices, noExportChoices: exportItemChoices.length === 0, exportVisibleCount: _exVisible.length, exportSelectedCount: _exIds.length, selectAllExportItems: this.selectAllExportItems, clearExportItems: this.clearExportItems,
      workGroupLabel: this.state.workGroupLabel, workGroupName: curWork.group || this.DEFAULT_GROUP, workName: curWork.name || '', workTabs, workGroups, libraryTree, libAllActive, libAllStyle, libAllCount, recentRows, hasRecent, mobileWorkGroups, isAllWorks, switchAll: () => this.switchWork(this.ALL_WORKS), workMenuOpen: this.state.workMenuOpen, toggleWorkMenu: this.toggleWorkMenu, addWork: this.addWork,
      openSettings: this.openSettings, closeSettings: this.cancelSettings, cancelSettings: this.cancelSettings, saveSettings: this.saveSettings, clearAllData: this.clearAllData, settingsOpen: this.state.settingsOpen, dataManageOpen: this.state.dataManageOpen, openDataManage: this.openDataManage, batchEditOpen: this.state.batchEditOpen, closeBatchEditor: this.closeBatchEditor, openBatchEditor: this.openBatchEditor, batchEditFields, batchEditOptions, batchEditTitle, batchEditChooseMode, batchEditOptionMode, batchEditBack: this.batchEditBack, closeDataManage: this.closeDataManage, confirmExcelExport: this.confirmExcelExport, confirmExcelTemplate: this.confirmExcelTemplate, confirmExcelImport: this.confirmExcelImport, confirmJsonExport: this.confirmJsonExport, confirmJsonImport: this.confirmJsonImport,
      cnVal: sd.collectorName || '', curVal: sd.currency || this.cur(), accentVal: sd.accent || this.props.accent || '#ff3355', nameStyleVal: sd.nameStyleMode || this.state.nameStyleMode || 'default', displayModeVal: sd.displayMode || this.state.displayMode || 'standard', stylePreviewText: this.previewStyleText(sd.nameStyleMode || this.state.nameStyleMode || 'default'), titleVal: sd.title || '', subtitleVal: sd.subtitle || '', footerVal: sd.footer || '',
      onCn: this.onDraftSettingField('collectorName'), onCurrency: this.onDraftSettingField('currency'), onAccent: this.onDraftSettingField('accent'), onNameStyle: this.setNameStyle, onDisplayMode: this.setDisplayMode, onTitleSet: this.onDraftSettingField('title'), onSubtitleSet: this.onDraftSettingField('subtitle'), onFooterSet: this.onDraftSettingField('footer'),
      showWelcomeCard: (this.state.items || []).length <= 2, cloudSyncCode: this.state.cloudSyncCode || '', hasCloudCode: !!this.state.cloudSyncCode, noCloudCode: !this.state.cloudSyncCode, hasCloudStatus: !!this.state.cloudStatus, cloudStatus: this.state.cloudStatus || '', copyCloudCode: this.copyCloudCode, cloudCodeInput: this.state.cloudCodeInput || '', onCloudCodeInput: this.onCloudCodeInput, createCloudCollection: this.createCloudCollection, connectCloudCollection: this.connectCloudCollection, pushCloud: this.pushCloud, pullCloud: this.pullCloud, mergeCloudAndLocal: this.mergeCloudAndLocal, mobileCloudSync: this.mobileCloudSync, checkCloudVersion: this.checkCloudVersion, disconnectCloud: this.disconnectCloud, hasCloudSync: !!this.state.cloudSyncId, accountCloudTitle: this.state.cloudSyncId ? '账号收藏库已连接' : '正在建立账号收藏库', cloudSyncText: this.state.cloudStatus || (this.state.cloudSyncId ? '账号云端已连接。' : '账号云端未连接。'), cloudPageOpen: this.state.cloudPageOpen, openCloudPage: this.openCloudPage, closeCloudPage: this.closeCloudPage, goCloudOrSettings: this.goCloudOrSettings,
      labels, workManageRows, fieldRows, optionGroups, customFieldRows, draftCustomInputs, hasCustomFields: draftCustomFields.length > 0, addCustomField: this.addCustomField, restoreBaseFields: this.restoreBaseFields, migrateSeriesToSet: this.migrateSeriesToSet, migrateSeriesToCustom: this.migrateSeriesToCustom, workSettingGroups, dashboardCollectionRows, dashboardSaleRows, addGroupAlone: this.addGroupAlone, uploadBg: this.uploadBg, clearBg: this.clearBg, hasBg: !!this.bgUrl, addWorkInline: this.addWork,
      addFormOpt: this.addOptionTo('formOrder', 'zzz_form_order', '输入新的形态'), addStatusOpt: this.addOptionTo('statusList', 'zzz_status', '输入新的状态'), addAcquireOpt: this.addOptionTo('acquireOrder', 'zzz_acquire_order', '输入新的来源方式'), formMenuItems, formDisplay, formMenuOpen: this.state.formMenuOpen, toggleFormMenu: this.toggleFormMenu, statusMenuItems, statusDisplay, statusMenuOpen: this.state.statusMenuOpen, toggleStatusMenu: this.toggleStatusMenu, acquireMenuItems, acquireDisplay, acquireMenuOpen: this.state.acquireMenuOpen, toggleAcquireMenu: this.toggleAcquireMenu, methodMenuItems, methodDisplay, methodMenuOpen: this.state.methodMenuOpen, toggleMethodMenu: this.toggleMethodMenu, clearMethod: this.clearMethod, hasMethodItems: methodMenuItems.length > 0,
      lblCharacter: labels.character, lblType: labels.type, lblChannel: labels.channel, lblPurchaseChannel: labels.purchaseChannel, lblSeries: labels.series, lblStatus: labels.status, lblForm: labels.form, lblAcquire: labels.acquire, showReminderFields, reminderDateLabel, reminderDateHint,
      cnPrefix, hasCn: !!cnPrefix, cnDisplay, cnSidebarClass,
      rootBgStyle: this.bgUrl ? { backgroundImage: `linear-gradient(180deg,rgba(255,255,255,.78),rgba(255,255,255,.9)), url(${this.bgUrl})`, backgroundSize: 'cover', backgroundAttachment: 'fixed', backgroundPosition: 'center' } : {},
      appClass, mobileModeText, toggleMobileMode: this.toggleMobileMode, filterSummaryText, filterToggleText, toggleFiltersOpen: this.toggleFiltersOpen,
      tabHome: this.tabHome, tabSearch: this.tabSearch, tabAdd: this.openAdd, tabLedger: this.tabLedger, tabMine: this.tabMine, closeMine: this.closeMine, mobileMineOpen: this.state.mobileMineOpen,
      tabHomeActive: this.state.view === 'gallery' && !this.state.filtersOpen && !this.state.mobileMineOpen,
      tabSearchActive: this.state.view === 'gallery' && this.state.filtersOpen && !this.state.mobileMineOpen,
      tabLedgerActive: this.state.view === 'ledger' && !this.state.mobileMineOpen,
      tabMineActive: this.state.mobileMineOpen,
      tabHomeStyle: this.tabBtnStyle(this.state.view === 'gallery' && !this.state.filtersOpen && !this.state.mobileMineOpen),
      tabSearchStyle: this.tabBtnStyle(this.state.view === 'gallery' && this.state.filtersOpen && !this.state.mobileMineOpen),
      tabLedgerStyle: this.tabBtnStyle(this.state.view === 'ledger' && !this.state.mobileMineOpen),
      tabMineStyle: this.tabBtnStyle(this.state.mobileMineOpen),
      savedText, cloudSaveText, cloudSaveColor, cloudSavePillStyle, cloudSaveDotStyle, mobileSyncLabel, mobileSyncBtnStyle, mobileSyncBusy, doExport: this.doExport, doExcelExport: this.doExcelExport, doExcelTemplate: this.doExcelTemplate, triggerExcelImport: this.triggerExcelImport, onExcelImportFile: this.onExcelImportFile, triggerImport: this.triggerImport, onImportFile: this.onImportFile,
      logoFallback,
      logoStyle: logoFallback ? { height: '54px', width: '54px', borderRadius: '15px', position: 'relative', overflow: 'hidden', cursor: 'pointer', flexShrink: 0, border: '1px solid #ded7ee', background: 'linear-gradient(145deg,#ffffff,#f8f4ff)', boxShadow: '0 8px 20px rgba(50,38,90,.08)' } : { height: '54px', width: '160px', backgroundImage: `url(${headerLogoUrl})`, backgroundSize: 'contain', backgroundPosition: 'left center', backgroundRepeat: 'no-repeat', filter: 'drop-shadow(0 4px 14px rgba(0,0,0,.5))', cursor: 'pointer', flexShrink: 0 },
      sidebarLogoStyle: { width: '100%', height: '112px', borderRadius: '15px', position: 'relative', overflow: 'hidden', flexShrink: 0, cursor: 'pointer', border: '1px solid #e3def1', backgroundColor: 'rgba(255,255,255,.86)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.7), 0 8px 20px rgba(50,38,90,.08)', backgroundImage: logoFallback ? 'linear-gradient(145deg,#ffffff,#f8f4ff)' : `url(${headerLogoUrl})`, backgroundSize: logoFallback ? 'cover' : 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }, title: this.state.title || '谷子收纳', subtitle: this.state.subtitle || '梦 境 特 工 档 案', footer: this.state.footer || '梦境特工档案 · コードナンバー：収集家', uploadLogo: this.uploadLogo, onTitleBlur: this.onTitleBlur, onSubtitleBlur: this.onSubtitleBlur, onFooterBlur: this.onFooterBlur, onCnBlur: this.onCnBlur, onCnFocus: this.onCnFocus,
      statIn: cur + this.fmtBig(totalIn), statSell: cur + this.fmtBig(totalSell), statInFull: cur + this.fmt(totalIn), statSellFull: cur + this.fmt(totalSell),
      statProfit: (totalProfit >= 0 ? '+' : '') + cur + this.fmtBig(totalProfit), statProfitFull: (totalProfit >= 0 ? '+' : '') + cur + this.fmt(totalProfit),
      statProfitStyle: { color: totalProfit >= 0 ? '#12a85f' : '#e23b5d' },
      statNet: cur + this.fmt(totalIn - totalSell),
      statCol: colCount, statSale: saleCount,
      groupTabs,
      setDashboard: this.setDashboard, setTable: this.setTable, setGallery: this.setGallery, setCircle: this.setCircle, setLedger: this.setLedger,
      sortByName: () => this.toggleTableSort('name'), sortNameMark: sortMark('name'),
      sortByCharacter: () => this.toggleTableSort('character'), sortCharacterMark: sortMark('character'),
      sortByType: () => this.toggleTableSort('type'), sortTypeMark: sortMark('type'),
      sortByGroup: () => this.toggleTableSort('group'), sortGroupMark: sortMark('group'),
      sortByStatus: () => this.toggleTableSort('status'), sortStatusMark: sortMark('status'),
      sortByQty: () => this.toggleTableSort('qty'), sortQtyMark: sortMark('qty'),
      sortByOriginal: () => this.toggleTableSort('original'), sortOriginalMark: sortMark('original'),
      sortByBuy: () => this.toggleTableSort('buy'), sortBuyMark: sortMark('buy'),
      sortByShip: () => this.toggleTableSort('ship'), sortShipMark: sortMark('ship'),
      sortBySell: () => this.toggleTableSort('sell'), sortSellMark: sortMark('sell'),
      sortByProfit: () => this.toggleTableSort('profit'), sortProfitMark: sortMark('profit'),
      sortByChannel: () => this.toggleTableSort('channel'), sortChannelMark: sortMark('channel'),
      sortByPurchaseChannel: () => this.toggleTableSort('purchaseChannel'), sortPurchaseChannelMark: sortMark('purchaseChannel'),
      sortByDate: () => this.toggleTableSort('date'), sortDateMark: sortMark('date'),
      tableColumnMenuOpen: this.state.tableColumnMenuOpen, toggleTableColumnMenu: this.toggleTableColumnMenu, resetTableColumns: this.resetTableColumns, tableColumnChips, tableColumnSummary, tableGridStyle, tableGridOuterStyle,
      showTableImage: this.tableColumnVisible('image'), showTableName: this.tableColumnVisible('name'), showTableCharacter: this.tableColumnVisible('character'), showTableType: this.tableColumnVisible('type'), showTableGroup: this.tableColumnVisible('group'), showTableStatus: this.tableColumnVisible('status'), showTableQty: this.tableColumnVisible('qty'), showTableOriginal: this.tableColumnVisible('original'), showTableBuy: this.tableColumnVisible('buy'), showTableShip: this.tableColumnVisible('ship'), showTableSell: this.tableColumnVisible('sell'), showTableProfit: this.tableColumnVisible('profit'), showTableChannel: this.tableColumnVisible('channel'), showTablePurchaseChannel: this.tableColumnVisible('purchaseChannel'), showTableDate: this.tableColumnVisible('date'), showTableActions: this.tableColumnVisible('actions'),
      dashboardBtnStyle: this.segStyle(view === 'dashboard'), tableBtnStyle: this.segStyle(view === 'table'), galleryBtnStyle: this.segStyle(view === 'gallery'), circleBtnStyle: this.segStyle(view === 'circle'), ledgerBtnStyle: this.segStyle(view === 'ledger'),
      navViewItems: [
        { key: 'dashboard', iconPath: 'M3 11.5 12 4l9 7.5M5.5 10v9a1 1 0 0 0 1 1H10v-6h4v6h3.5a1 1 0 0 0 1-1v-9', label: '首页', onClick: this.setDashboard },
        { key: 'gallery', iconPath: 'M3 4h18v16H3zM8 4v16M3 10h5', label: '图鉴', onClick: this.setGallery },
        { key: 'circle', iconPath: 'M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6z', label: '圆图', onClick: this.setCircle },
        { key: 'table', iconPath: 'M3 4h18v16H3zM3 9h18M9 9v11', label: '表格', onClick: this.setTable },
        { key: 'ledger', iconPath: 'M3 6h18v13H3zM3 10h18M16.5 14.5h.01', label: '钱包', onClick: this.setLedger }
      ].map(t => ({ label: t.label, iconPath: t.iconPath, active: view === t.key, style: this.navItemStyle(view === t.key), iconStyle: this.navIconStyle(view === t.key), onClick: t.onClick })),
      navGroupItems,
      openAdd: this.openAdd, openBulkImageImport: this.openBulkImageImport, toggleBatchMode: this.toggleBatchMode, batchMode: this.state.batchMode, showBatchControl, showBatchBar, batchButtonText: this.state.batchMode ? '退出批量' : '批量编辑', mobileBatchText: this.state.batchMode ? '退出' : '批量', batchSelectedText: (this.state.selectedIds || []).length + ' 件', batchSelectVisible: this.batchSelectVisible, batchClear: this.batchClear, batchEditStatus: this.batchEditStatus, batchEditReminder: this.batchEditReminder, batchEditField: this.batchEditField, batchQtyPlus: this.batchQtyPlus, batchDelete: this.batchDelete, hasBulkEditNav: (this.state.bulkEditIds || []).length > 1 && this.state.modalOpen, bulkEditProgress: ((this.bulkCurrentIndex ? this.bulkCurrentIndex() : (this.state.bulkEditIndex || 0)) + 1) + '/' + ((this.state.bulkEditIds || []).length || 1), saveBulkPrev: this.saveBulkPrev, saveBulkNext: this.saveBulkNext,
      search, onSearch: this.onSearch, charChips, addCharacter: this.addCharacter, addTypeF: this.addType, addSeriesF: this.addSeries, addChannelF: this.addChannel, typeChips, seriesChips, showSeriesFilter, formChips, statusChips, showStatusFilter, acquireChips, methodChips, setChips, tagChips, rarityChips, channelChips, purchaseChannelChips, showChannelFilter, showPurchaseChannelFilter, customFilterRows, groupByChips, hasRows: filtered.length > 0, fCountText, fCostText, fSellText, fNetText, fProfitText, fProfitStyle, fSummaryLabel,
      labelChar: labels.character, labelType: labels.type, labelSeries: labels.series, labelChannel: labels.channel, labelPurchaseChannel: labels.purchaseChannel, labelForm: labels.form, labelStatus: labels.status, labelAcquire: labels.acquire, labelMethod: this.flabel('method'), labelSet: String(this.flabel('set')||'').replace(/\s*\/\s*/g,'/'), labelTags: this.flabel('tags'), labelRarity: String(this.flabel('rarity')||'').replace(/\s*\/\s*/g,'/'),
      showCharF: fieldVisible('character') && this.state.filterOn.character !== false, showTypeF: fieldVisible('type') && this.state.filterOn.type !== false, showFormF: fieldVisible('form') && this.state.filterOn.form !== false, showStatusF: showStatusFilter, showAcquireF: fieldVisible('acquire') && this.state.filterOn.acquire !== false, showMethodF: showMethodFilter, showSetF: showSetFilter,
      showSeriesF: showSeriesFilter && this.state.filterOn.series !== false, showChannelF: showChannelFilter && this.state.filterOn.channel !== false, showPurchaseChannelF: showPurchaseChannelFilter && this.state.filterOn.purchaseChannel !== false,
      showTagFilter, showRarityFilter, yrCards, showYrReview, yrLabel: yearKey + ' 年度回顾',
      mobileFilterCat, mobileFilterCatChips, galleryIconStyle, circleIconStyle, mobileGroupTabs, gtAll, gtInhand, gtAir, gtSale,
      modalTab: this.state.modalTab || 'edit', switchToEditTab: this.switchModalTab('edit'), switchToShipTab: this.switchModalTab('ship'), isEditTab: modalTabIsEdit, isShipTab: !modalTabIsEdit, editTabStyle, shipTabStyle,
      itemShipGroups, hasItemShipRecords, noItemShipRecords, itemShipDraftOpen: this.state.itemShipDraftOpen, itemShipListView: !this.state.itemShipDraftOpen, openItemAddShip: this.openItemAddShip, closeItemAddShip: this.closeItemAddShip, toggleItemShipItemsPanel: this.toggleItemShipItemsPanel, itemShipItemsPanelOpen: this.state.itemShipItemsPanelOpen, itemShipItemsCaret: this.state.itemShipItemsPanelOpen ? '▲ 收起' : '▼ 展开选择',
      openLinkExistingShip: this.openLinkExistingShip, closeLinkExistingShip: this.closeLinkExistingShip, linkExistingShipOpen: this.state.linkExistingShipOpen, linkExistingSearch: this.state.linkExistingSearch || '', onLinkExistingSearch: this.onLinkExistingSearch, linkExistingRows, noLinkExistingRows, linkExistingChannelChips, hasLinkExistingChannels: linkExistingChannelChips.length > 1,
      genericSelectOpen: this.state.genericSelectOpen, genericSelectTitle: this.state.genericSelectTitle || '选择', closeGenericSelect: this.closeGenericSelect,
      genericSelectPopStyle: (() => {
        const a = this.state.genericSelectAnchor;
        const base = { position: 'fixed', zIndex: 601, background: '#ffffff', border: '1px solid #ded7ee', borderRadius: '11px', boxShadow: '0 14px 36px rgba(0,0,0,.16)', padding: '6px', maxHeight: '240px', overflowY: 'auto', WebkitOverflowScrolling: 'touch' };
        if (!a) { return { ...base, left: '50%', top: '40%', transform: 'translate(-50%,-50%)', width: 'min(90vw,340px)' }; }
        const vw = (typeof window !== 'undefined' ? window.innerWidth : 380);
        const vh = (typeof window !== 'undefined' ? window.innerHeight : 700);
        const width = Math.max(a.width, 160);
        let left = a.left; if (left + width > vw - 8) left = Math.max(8, vw - 8 - width);
        const spaceBelow = vh - a.bottom;
        if (spaceBelow < 200 && a.top > spaceBelow) { return { ...base, left: left + 'px', bottom: (vh - a.top + 5) + 'px', width: width + 'px', maxHeight: Math.min(240, a.top - 16) + 'px' }; }
        return { ...base, left: left + 'px', top: (a.bottom + 5) + 'px', width: width + 'px', maxHeight: Math.min(240, spaceBelow - 16) + 'px' };
      })(),
      genericSelectRows: (this.state.genericSelectOptions || []).map(o => ({ label: o.label, active: String(o.value) === String(this.state.genericSelectValue), rowStyle: this.menuRow(String(o.value) === String(this.state.genericSelectValue)), onPick: this.pickGenericSelect(o.value) })),
      shipRoleManageOpen: this.state.shipRoleManageOpen, closeShipRoleManage: this.closeShipRoleManage, shipRoleManageTitle, shipRoleManageRows, shipRoleAdd: this.shipRoleAdd,
      toast: this.state.toast || '', hasToast: !!this.state.toast, showTip: this.showTip,
      displayRows, isEmpty: itemRows.length === 0 && view !== 'ledger' && view !== 'dashboard', isDashboard: view === 'dashboard', isTable: view === 'table', isGallery: view === 'gallery', isCircle: view === 'circle', isLedger: view === 'ledger',
      dashboardTodoRows, dashboardSummaryRows, dashboardRecentItems, dashboardRecentDocs, hasDashboardItems: dashboardRecentItems.length>0, noDashboardItems: dashboardRecentItems.length===0, hasDashboardDocs: dashboardRecentDocs.length>0, noDashboardDocs: dashboardRecentDocs.length===0, dashboardMonthCost: cur + this.fmt(dashboardMonthCostNum), dashboardTotalCost: cur + this.fmt(totalIn),
      budgetInput: (this.state.budgets || {})[budgetMonthKey] || '', hasFeeComposition, feeComposition, feeTotalText, budgetDisplayText: budget > 0 ? (cur + this.fmt(budget)) : (isAllScope ? '不适用' : '未设置'), consumeTitle: TXT.consumeTitle || '消费表', ledgerMonthAreaPath, jumpBudgetThisMonth: this.jumpBudgetThisMonth, ledgerDetailOpen, ledgerDetailItems, ledgerDetailTitle, ledgerDetailTotal, ledgerDetailEmpty, closeLedgerDetail: this.closeLedgerDetail, onBudgetChange: this.onBudgetChange, onBudgetQuickEdit: this.onBudgetQuickEdit, ledgerScopeText, ledgerRangeText, mobileWalletRangeText, mobileWalletScopeText, ledgerModeChips, ledgerYearOptions, ledgerMonthOptions, ledgerWeekOptions, ledgerYear, ledgerMonth, ledgerWeek, showLedgerYear, showLedgerMonth, showLedgerWeek, onLedgerYear: this.onLedgerYear, onLedgerMonth: this.onLedgerMonth, onLedgerWeek: this.onLedgerWeek, openLedgerYearSelect: this.openLedgerYearSelect, openLedgerMonthSelect: this.openLedgerMonthSelect, openLedgerWeekSelect: this.openLedgerWeekSelect, ledgerYearText, ledgerMonthText, ledgerWeekText, ledgerPieBy, onLedgerPieBy: this.onLedgerPieBy, ledgerPieChips, ledgerPieTitle, ledgerPieStyle, ledgerPieRows, ledgerPieTotal, ledgerPieCenterLabel, ledgerPieTopText, ledgerPieTip, ledgerPieSegments, ledgerPieActiveName, ledgerPieActivePercent, ledgerPieActiveValue, ledgerPieActiveDot, ledgerDetailRows, ledgerDetailSummary, monthSpentText: cur + this.fmt(monthSpent), monthSpentBig: cur + this.fmtBig(monthSpent), monthSpentFull: cur + this.fmt(monthSpent), budgetRemainText: panelRemainText, budgetRemainStyle: panelRemainStyle, budgetPctText: panelPctText, budgetPctStyle: panelPctStyle, budgetBarStyle: panelBarStyle, budgetStatusText: panelStatusText, ledgerTitle: TXT.ledgerTitle, ledgerHelpText: '', budgetLabel: panelBudgetLabel, spentLabel: panelSpentLabel, remainLabel: panelRemainLabel, progressLabel: panelProgressLabel, showBudgetEdit, showBudgetView: !showBudgetEdit, monthsTitle: TXT.months, reminderCenterTitle: TXT.reminderCenter, noReminderText: TXT.noReminder, mobileWalletTitle: TXT.walletMini, miniBudgetLabel: TXT.miniBudget, miniSpentLabel: TXT.miniSpent, miniRemainLabel: TXT.miniRemain, addItemText: TXT.addItem, ledgerMonths: ledgerMonthCells, barTop, barBottom, areaColor, ledgerMonthBars, ledgerMonthDots, ledgerMonthLinePoints, accentColorVal: this.accentColor(), hasLedgerPeakBubble, ledgerPeakBubbleText, ledgerPeakBubbleStyle, authReady: this.state.authReady, authChecking: !this.state.authReady, authLoggedIn: this.state.authReady && !!this.state.authUser, authLoggedOut: this.state.authReady && !this.state.authUser, syncConflictOpen: this.state.authReady && !!this.state.authUser && !!this.state.syncConflict, syncConflictCloudTime: this.fmtCloudTime((this.state.syncConflict && this.state.syncConflict.remoteAt) || this.state.cloudRemoteUpdatedAt || ''), syncConflictLocalTime: ((this.state.syncConflict && this.state.syncConflict.localAt) ? this.fmtCloudTime(this.state.syncConflict.localAt) : '此设备尚无同步记录'), syncConflictCloudBtnText: (this.state.cloudBusy && this.state.syncConflictChoice === 'cloud') ? '正在读取云端…' : '使用云端版本覆盖本机', syncConflictLocalBtnText: (this.state.cloudBusy && this.state.syncConflictChoice === 'local') ? '正在上传本机…' : '使用本机版本覆盖云端', chooseCloudVersion: this.chooseCloudVersion, chooseLocalVersion: this.chooseLocalVersion, authUsername: this.state.authUsername || '', authPassword: this.state.authPassword || '', authPassword2: this.state.authPassword2 || '', authError: this.state.authError || '', hasAuthError: !!this.state.authError, authBusy: this.state.authBusy, authIsLogin: (this.state.authMode || 'login') === 'login', authIsRegister: this.state.authMode === 'register', onAuthUsername: this.onAuthUsername, onAuthPassword: this.onAuthPassword, onAuthPassword2: this.onAuthPassword2, toLoginMode: this.switchAuthMode('login'), toRegisterMode: this.switchAuthMode('register'), doLogin: this.doLogin, doRegister: this.doRegister, doLogout: this.doLogout, authLoginBtnText: this.state.authBusy ? '登录中…' : '登录', authRegisterBtnText: this.state.authBusy ? '注册中…' : '注册并登录', authCurrentName: ((this.state.authUser && this.state.authUser.user_metadata && this.state.authUser.user_metadata.username) || ''), ledgerPeakLabel, ledgerPeakValue, ledgerPeakDate, ledgerDaysLabel, ledgerDaysValue, ledgerDaysNote, ledgerAvgValue, ledgerAvgNote, ledgerMonthHint, ledgerMonthTotal, ledgerMonthPeakText, topCostRows, topQtyRows, topCharacterRows, topPlatformRows, ledgerRankCards, reviewCards, completeSetRows, reviewPeriodText, achievementRows, ledgerRankTitle1, ledgerRankTitle2, ledgerRankTitle3, ledgerRankTitle4, upcomingReminders, ledgerReminderRows, hasLedgerReminders: ledgerReminderRows.length > 0, noLedgerReminders: ledgerReminderRows.length === 0, hasUpcomingReminders: upcomingReminders.length > 0, mobileReminderText, mobileReminderDetail, mobileTodoRows, mobileBudgetText: budget > 0 ? (cur + this.fmt(budget)) : '未设', reminderCountText,
      qtyBadgeStyle: { position: 'absolute', top: '1px', right: '5px', minWidth: '22px', height: '22px', padding: '0 6px', borderRadius: '999px', background: `radial-gradient(circle at 32% 28%, ${this.accentLight(0.5)}, ${this.accentColor()} 82%)`, color: '#fff', fontSize: '12px', fontWeight: 800, lineHeight: 1, fontFamily: "'Orbitron',sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 3px 9px ${this.accentAlpha(0.5)}`, border: '2.5px solid #fff' },
      modalOpen: this.state.modalOpen, modalTitle: this.state.editing ? '编辑谷子' : '新增谷子', isEditing: !!this.state.editing, isNewItem: !this.state.editing, duplicateCurrent: this.duplicateCurrent, deleteCurrent: this.deleteCurrent,
      itemEvidenceSelectedCount:(this.state.itemEvidenceDrafts||[]).length, hasItemEvidenceDrafts:(this.state.itemEvidenceDrafts||[]).length>0, noCloudForItemEvidence:!this.shippingSyncCode(), itemEvidenceExistingSelect:'', itemEvidenceExistingCount:(this.state.itemEvidenceExistingIds||[]).length, itemEvidenceExistingOptions:(this.state.shippingRecords||[]).filter(r=>r.type==='本体资料').map(r=>({value:r.id,label:[r.group,r.title,r.note,(r.images||[]).length+'张图'].filter(Boolean).join(' · ')})), onItemEvidenceExistingSelect:this.onItemEvidenceExistingSelect, openItemEvidenceExistingSelect:this.openItemEvidenceExistingSelect, itemEvidenceOpen:!!this.state.itemEvidenceOpen, toggleItemEvidence:this.toggleItemEvidence, itemEvidenceCaret:this.state.itemEvidenceOpen?'▲ 收起':'▼ 展开', itemEvidenceBadge:((this.state.itemEvidenceDrafts||[]).length+(this.state.itemEvidenceExistingIds||[]).length)>0?('已选 '+((this.state.itemEvidenceDrafts||[]).length+(this.state.itemEvidenceExistingIds||[]).length)): '可选填', itemEvidenceSummary:(()=>{const a=(this.state.itemEvidenceDrafts||[]).length,b=(this.state.itemEvidenceExistingIds||[]).length;if(a||b)return ['待上传 '+a+' 张',b?'复用 '+b+' 份':''].filter(Boolean).join(' · ');return '可以先不填，保存后再补';})(),
      itemEvidenceRequirementName:(()=>{const n=(this.state.itemEvidenceDrafts||[]).filter(x=>x.role==='肾表／群内交款要求').length;return n?n+' 张已选':'点击选择';})(),
      itemEvidencePaidName:(()=>{const n=(this.state.itemEvidenceDrafts||[]).filter(x=>x.role==='我的付款截图').length;return n?n+' 张已选':'点击选择';})(),
      onItemEvidenceRequirement:this.onItemEvidencePick('肾表／群内交款要求'), onItemEvidencePaid:this.onItemEvidencePick('我的付款截图'),
      clearAllItemEvidence:()=>this.setState({itemEvidenceDrafts:[],itemEvidenceExistingIds:[]}),
      draft: d || this.emptyDraft(),
      CHARACTERS: this.orderedChars(), TYPES: this.TYPES, reminderTypeOptions: (this.state.reminderTypes && this.state.reminderTypes.length ? this.state.reminderTypes : this.REMINDER_TYPES), reminderMenuItems, reminderDisplay, reminderMenuOpen: this.state.reminderMenuOpen, toggleReminderMenu: this.toggleReminderMenu, addReminderType: this.addReminderType, clearReminderType: () => this.pickReminderType(''), STATUSES: this.state.statusList || this.STATUSES, FORMS: this.FORMS,
      closeModal: this.closeModal, saveItem: this.saveItem, onDraftChange: this.onDraftChange, onMoneyBlur: this.onMoneyBlur, onMoneyKeyDown: this.onMoneyKeyDown, autoGrowNote: this.autoGrowNote, charMenuItems, charDisplay, charMenuOpen: this.state.charMenuOpen, toggleCharMenu: this.toggleCharMenu, onTypeChange: this.onTypeChange, onSeriesChange: this.onSeriesChange, fillName: this.fillName, draftStars, typeMenuItems, typeDisplay, hasTypeMenuItems, typeMenuOpen: this.state.typeMenuOpen, toggleTypeMenu: this.toggleTypeMenu, addType: this.addType, seriesMenuItems, seriesDisplay, hasSeriesMenuItems, seriesMenuOpen: this.state.seriesMenuOpen, toggleSeriesMenu: this.toggleSeriesMenu, addSeries: this.addSeries, clearSeries: this.clearSeries, channelMenuItems, channelMenuOpen: this.state.channelMenuOpen, toggleChannelMenu: this.toggleChannelMenu, addChannel: this.addChannel, clearChannel: this.clearChannel, channelDisplay: (this.state.draft && this.state.draft.channel) ? this.state.draft.channel : '（未分类）', hasChannelMenuItems: channelMenuItems.length > 0, purchaseChannelMenuItems, purchaseChannelMenuOpen: this.state.purchaseChannelMenuOpen, togglePurchaseChannelMenu: this.togglePurchaseChannelMenu, addPurchaseChannel: this.addPurchaseChannel, clearPurchaseChannel: this.clearPurchaseChannel, purchaseChannelDisplay: (this.state.draft && this.state.draft.purchaseChannel) ? this.state.draft.purchaseChannel : '（未分类）', hasPurchaseChannelMenuItems: purchaseChannelMenuItems.length > 0, fillBuyFromRate: this.fillBuyFromRate, draftHasConv, draftConvText, draftIsGacha, draftSwapped,
      onImagePick: this.onImagePick, onImagePick2: this.onImagePick2, onImagePick3: this.onImagePick3, onImagePickSwap: this.onImagePickSwap, swapMenuItems, swappedDisplay, swapHint, swapNoteLabel, draftIsSwapKind, swapMenuOpen: this.state.swapMenuOpen, toggleSwapMenu: this.toggleSwapMenu, swapCharMenuItems, swapCharDisplay, swapCharMenuOpen: this.state.swapCharMenuOpen, toggleSwapCharMenu: this.toggleSwapCharMenu, clearSwapCharacter: this.clearSwapCharacter, swapCharHasAvatar, swapCharAvatarStyle, removeDraftImg: this.removeDraftImg, removeDraftImg2: this.removeDraftImg2, removeDraftImg3: this.removeDraftImg3, removeDraftImg4: this.removeDraftImg4, removeDraftSwapImg: this.removeDraftSwapImg,
      draftTimelineRows, showBrandField: fieldVisible('series') && !!(d && d.series), draftWorkName, draftWorkGroupName, draftWorkMenuGroups, draftWorkMenuOpen: this.state.draftWorkMenuOpen, toggleDraftWorkMenu: this.toggleDraftWorkMenu, addWorkInline: this.addWorkInline, draftIsSelling, draftNotSelling,
      manageOpen: this.state.manageOpen, closeManage: this.closeManage, manageTitle, manageRows, manageAddText, onManageAdd, manageCanRenameLabel, onManageRenameLabel, manageCanToggle, manageCanBatch, manageFilterOn, workManageOpen: this.state.workManageOpen, openWorkManage: this.openWorkManage, closeWorkManage: this.closeWorkManage, workManageGroups, addGroupAlone: this.addGroupAlone, setManageOpen: this.state.setManageOpen, openSetManage: this.openSetManage, closeSetManage: this.closeSetManage, setManageList, addSetInManage: this.addSetInManage, hasSetManageList: setManageList.length > 0, setFieldLabel: this.setLabelText(), renameSetLabel: this.renameSetLabel, setFilterStyle, setGroupStyle, setBatchStyle, setFilterText: setFilterOn ? '筛选 ✓' : '筛选', setGroupText: setGroupOn ? '分组 ✓' : '分组', setBatchText: setBatchOn ? '批量 ✓' : '批量', onSetToggleFilter: this.toggleFilterOn('set'), onSetToggleGroup: this.toggleStatsOn('set'), onSetToggleBatch: this.toggleBatchOn('set'), manageGroupOn, onManageToggleFilter, onManageToggleGroup, manageFilterStyle, manageGroupStyle, manageFilterText: manageFilterOn ? '筛选 ✓' : '筛选', manageGroupText: manageGroupOn ? '分组 ✓' : '分组', manageBatchOn, onManageToggleBatch, manageBatchStyle, manageBatchText: manageBatchOn ? '批量 ✓' : '批量',
      mgrStatus: () => this.openManage('status'), mgrMethod: () => this.openManage('method'), mgrTradeTags: () => this.openManage('tradeTags'), mgrRarityTags: () => this.openManage('rarityTags'),
      lblMethod: (this.state.fieldLabels||{}).method || '购买方式', lblTags: (this.state.fieldLabels||{}).tags || '交易标签', lblRarity: (this.state.fieldLabels||{}).rarity || '稀有度 / 心动标签', hasTagsField, hasRarityField, mgrCharacter: () => this.openManage('character'), mgrType: () => this.openManage('type'), mgrForm: () => this.openManage('form'), mgrSeries: () => this.openManage('series'), mgrAcquire: () => this.openManage('acquire'), mgrChannel: () => this.openManage('channel'), mgrPurchaseChannel: () => this.openManage('purchaseChannel'), mgrReminder: () => this.openManage('reminder'), mgrTrade: () => this.openManage('tradeTags'), mgrRarity: () => this.openManage('rarityTags'),
      setMenuOpen: this.state.setMenuOpen, toggleSetMenu: this.toggleSetMenu, addSet: this.addSet, clearSet: () => this.pickSet(''),
      setDisplay: (() => { const s = this.setById(d && d.setId); if (!s) return '（选择套装）'; const got = this.setCollectedCodes(s.id, d && d.id).length; return s.name + (s.total ? '（' + got + '/' + s.total + '）' : ''); })(),
      hasSet: !!(d && d.setId && this.setById(d.setId)),
      hasSetMembers: (() => { const s = this.setById(d && d.setId); return !!(s && s.members && s.members.length); })(),
      noSetMembers: (() => { const s = this.setById(d && d.setId); return !(s && s.members && s.members.length); })(),
      setVariantDisplay: (d && d.setVariant) ? d.setVariant : '（选择款式）',
      toggleSetVariantMenu: this.toggleSetVariantMenu, setVariantMenuOpen: this.state.setVariantMenuOpen,
      setMemberItems: (() => { const s = this.setById(d && d.setId); if (!s || !s.members) return []; const got = this.setCollectedCodes(s.id, d && d.id); return s.members.map((m, idx) => { const label = m.code + ' ' + m.name; const on = (d && d.setVariant) === label; return { label, got: got.includes(m.code + ' ' + m.name) || got.includes(m.code), onPick: () => this.pickSetMember(m), onRename: () => this.renameSetMember(idx), onDel: () => this.delSetMember(idx), rowStyle: this.menuRow(on) }; }); })(),
      setMemberEditMode: !!this.state.setMemberEditMode, setMemberEditText: this.state.setMemberEditMode ? '✓ 完成' : '⚙ 管理', toggleSetMemberEdit: this.toggleSetMemberEdit, addSetMember: this.addSetMember,
      setMenuItems: (this.state.sets || []).filter(s => (s.workId || this.MAIN_WORK) === ((d && d.workId) || this.state.currentWorkId || this.MAIN_WORK)).sort((a, b) => (a.id === this.state.lastSetId ? -1 : b.id === this.state.lastSetId ? 1 : 0)).map(s => { const got = this.setCollectedCodes(s.id, d && d.id).length; return { name: s.name + (s.id === this.state.lastSetId ? ' · 最近' : ''), progress: s.total ? got + '/' + s.total : String(got), onPick: () => this.pickSet(s.id), onRename: () => this.renameSet(s.id), onDel: () => this.delSet(s.id), rowStyle: { display: 'flex', alignItems: 'center', gap: '8px', width: '100%', background: (d && d.setId === s.id) ? this.accentAlpha(0.1) : 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', fontSize: '14px', color: '#251d49', padding: '7px 9px', borderRadius: '8px' } }; }), setManageEditMode: !!this.state.setManageEditMode, setManageEditText: this.state.setManageEditMode ? '✓ 完成' : '⚙ 管理', toggleSetManageEdit: this.toggleSetManageEdit,
      collectedCodesText: (d && d.setId) ? this.setCollectedCodes(d.setId, d.id).join('、') : '', hasCollectedCodes: !!(d && d.setId && this.setCollectedCodes(d.setId, d.id).length), feeShow: !!this.state.feeOpen, colInfoShow: !!this.state.colInfoOpen, setInfoShow: !!this.state.setInfoOpen, feeOpen: this.state.feeOpen, feeCaret: this.state.feeOpen ? '▲ 收起' : '▼ 展开', toggleFee: this.toggleFee, colInfoOpen: this.state.colInfoOpen, colInfoCaret: this.state.colInfoOpen ? '▲ 收起' : '▼ 展开', toggleColInfo: this.toggleColInfo, setInfoOpen: this.state.setInfoOpen, setInfoCaret: this.state.setInfoOpen ? '▲ 收起' : '▼ 展开', toggleSetInfo: this.toggleSetInfo,
      draftTradeTags: (this.state.tradeTags || this.TRADE_TAGS).map(t => { const on = ((d && d.tags) || []).includes(t); return { label: t, on, hasTip: !!this.GLOSSARY[t], onTip: () => this.showTip(t), style: { padding: '5px 11px', borderRadius: '999px', fontSize: '12.5px', cursor: 'pointer', fontFamily: 'inherit', border: '1px solid ' + (on ? 'var(--accent,#ff3355)' : '#ded7ee'), background: on ? 'var(--accent,#ff3355)' : 'rgba(50,38,90,.03)', color: on ? '#fff' : '#595287' }, onClick: () => this.toggleDraftTag('tags', t), onDel: (ev) => { ev.stopPropagation(); this.delTagOption('tradeTags', 'zzz_trade_tags', t); } }; }),
      draftRarityTags: (this.state.rarityTags || this.RARITY_TAGS).map(t => { const on = ((d && d.rarity) || []).includes(t); return { label: t, on, hasTip: !!this.GLOSSARY[t], onTip: () => this.showTip(t), style: { padding: '5px 11px', borderRadius: '999px', fontSize: '12.5px', cursor: 'pointer', fontFamily: 'inherit', border: '1px solid ' + (on ? '#c8860d' : '#ded7ee'), background: on ? '#c8860d' : 'rgba(50,38,90,.03)', color: on ? '#fff' : '#595287' }, onClick: () => this.toggleDraftTag('rarity', t), onDel: (ev) => { ev.stopPropagation(); this.delTagOption('rarityTags', 'zzz_rarity_tags', t); } }; }),
      addTradeTag: () => this.addTagOption('tradeTags', 'zzz_trade_tags'), addRarityTag: () => this.addTagOption('rarityTags', 'zzz_rarity_tags'), tagEditMode: !!this.state.tagEditMode, toggleTagEdit: this.toggleTagEdit, tagEditText: this.state.tagEditMode ? '完成' : '编辑',
      draftCostText, draftHasSell, draftProfitText, draftProfitStyle, draftThumbBg, draftHasImg, draftNoImg, draftThumbBg2, draftHasImg2, draftNoImg2, draftThumbBg3, draftHasImg3, draftNoImg3, draftImageTiles, draftNoImages, draftImageCountText, draftImageHelp, draftSwapThumbBg, draftSwapHasImg, draftSwapNoImg
    };
  }
}
