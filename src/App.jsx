import { useState, useEffect } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Barlow:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --navy:#0d2e5a;--blue:#1a6bbf;--blue-light:#2aaae2;
  --blue-pale:#e8f4fc;--blue-pale2:#d0e8f7;
  --white:#fff;--off:#f7f9fc;--cream:#f2f5f9;
  --border:#d4dde8;--border-l:#e8edf3;
  --text:#1a2a3a;--muted:#5a6e82;
  --green:#1a7a4a;--green-l:#e6f5ee;--green-b:#a8d8bc;
  --red:#b52a1a;--red-l:#fdf0ee;--red-b:#f0b8b0;
  --orange:#c85a00;--orange-l:#fff3e8;--orange-b:#f5c490;
  --shadow:0 1px 4px rgba(13,46,90,0.08);--r:10px;--rs:6px;
}
body{font-family:'Barlow',sans-serif;background:var(--cream);color:var(--text);font-size:15px;line-height:1.6;}
.app{min-height:100vh;}
.hdr{background:var(--navy);position:relative;overflow:hidden;}
.hdr::after{content:'';position:absolute;right:-80px;top:-80px;width:280px;height:280px;border-radius:50%;background:rgba(26,107,191,0.15);pointer-events:none;}
.hdr-inner{max-width:820px;margin:0 auto;padding:24px 24px 0;position:relative;z-index:1;}
.logo{display:flex;flex-direction:column;line-height:1.05;margin-bottom:18px;}
.logo-slim{font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:26px;color:#fff;letter-spacing:1px;}
.logo-sub{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:15px;color:var(--blue-light);letter-spacing:2px;}
.logo-adv{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:15px;color:var(--blue);letter-spacing:2px;}
.hdr-title{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:clamp(19px,3.5vw,26px);color:#fff;margin-bottom:5px;line-height:1.2;}
.hdr-title span{color:var(--blue-light);}
.hdr-sub{color:rgba(255,255,255,0.55);font-size:13px;font-weight:300;}
.prog-bar{background:rgba(255,255,255,0.1);height:3px;margin-top:18px;}
.prog-fill{background:var(--blue-light);height:100%;transition:width .5s ease;}
.steps-bar{display:flex;background:rgba(255,255,255,0.04);border-top:1px solid rgba(255,255,255,0.06);}
.step-tab{flex:1;padding:8px 2px;text-align:center;font-size:10px;font-weight:600;letter-spacing:0;color:rgba(255,255,255,0.32);border-top:none;border-bottom:2px solid transparent;transition:all .3s;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0;}
.step-tab.active{color:var(--blue-light);border-bottom-color:var(--blue-light);background:rgba(42,170,226,0.07);}
.step-tab.done{color:rgba(255,255,255,0.55);border-bottom-color:rgba(255,255,255,0.25);}
.main{max-width:820px;margin:0 auto;padding:24px 20px 60px;}
.phase-lbl{display:inline-flex;align-items:center;gap:7px;font-size:11px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;color:var(--blue);margin-bottom:14px;}
.phase-dot{width:6px;height:6px;border-radius:50%;background:var(--blue-light);animation:pulse 2s infinite;}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.4)}}
.card{background:var(--white);border-radius:var(--r);border:1px solid var(--border-l);box-shadow:var(--shadow);padding:24px;margin-bottom:14px;animation:up .35s ease;}
@keyframes up{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
.card-title{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:20px;color:var(--navy);margin-bottom:6px;letter-spacing:.3px;}
.card-sub{font-size:14px;color:var(--muted);line-height:1.65;margin-bottom:20px;}
.q-block{margin-bottom:18px;padding-bottom:18px;border-bottom:1px solid var(--border-l);}
.q-block:last-of-type{border-bottom:none;margin-bottom:0;}
.q-label{font-size:14px;font-weight:600;color:var(--navy);margin-bottom:4px;display:flex;align-items:flex-start;gap:9px;}
.q-num{background:var(--navy);color:#fff;width:21px;height:21px;border-radius:50%;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;}
.q-hint{font-size:12px;color:var(--muted);margin-bottom:11px;margin-left:30px;line-height:1.5;}
.options{display:flex;flex-direction:column;gap:7px;margin-left:30px;}
.opt{display:flex;align-items:center;gap:10px;padding:10px 14px;border:1px solid var(--border);border-radius:var(--rs);cursor:pointer;transition:all .18s;font-size:13px;color:var(--muted);background:var(--white);}
.opt:hover{border-color:var(--blue);background:var(--blue-pale);color:var(--navy);}
.opt.sel{border-color:var(--blue);border-width:1.5px;background:var(--blue-pale);color:var(--navy);font-weight:500;}
.opt-radio{width:16px;height:16px;border-radius:50%;border:1.5px solid var(--border);flex-shrink:0;display:flex;align-items:center;justify-content:center;transition:all .18s;}
.opt.sel .opt-radio{border-color:var(--blue);background:var(--blue);}
.opt-dot{width:5px;height:5px;border-radius:50%;background:#fff;display:none;}
.opt.sel .opt-dot{display:block;}
.input-wrap{position:relative;display:inline-flex;align-items:center;margin-left:30px;}
.input-pfx{position:absolute;left:12px;font-weight:600;color:var(--muted);font-size:14px;pointer-events:none;}
.num-input{padding:10px 14px 10px 26px;border:1px solid var(--border);border-radius:var(--rs);font-size:14px;font-family:'Barlow',sans-serif;color:var(--text);outline:none;transition:border-color .2s;width:280px;background:var(--white);}
.num-input:focus{border-color:var(--blue);}
.input-hint{font-size:12px;color:var(--green);font-weight:500;margin-top:6px;margin-left:30px;}
.btn{display:inline-flex;align-items:center;gap:7px;padding:11px 22px;border-radius:var(--rs);font-size:14px;font-weight:600;font-family:'Barlow',sans-serif;cursor:pointer;transition:all .18s;border:none;}
.btn-primary{background:var(--navy);color:#fff;}
.btn-primary:hover{background:var(--blue);transform:translateY(-1px);box-shadow:0 4px 14px rgba(13,46,90,0.2);}
.btn-primary:disabled{background:var(--border);color:var(--muted);cursor:not-allowed;transform:none;box-shadow:none;}
.btn-ghost{background:transparent;color:var(--muted);border:1px solid var(--border);}
.btn-ghost:hover{border-color:var(--navy);color:var(--navy);background:var(--off);}
.btn-row{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-top:22px;}
.result{border-radius:var(--r);padding:20px 24px;margin-bottom:14px;animation:up .4s ease;}
.result.ok{background:var(--green-l);border:1px solid var(--green-b);}
.result.fail{background:var(--red-l);border:1px solid var(--red-b);}
.result-icon{font-size:28px;margin-bottom:8px;display:block;}
.result-title{font-family:'Barlow Condensed',sans-serif;font-size:20px;font-weight:700;margin-bottom:6px;}
.result.ok .result-title{color:var(--green);}
.result.fail .result-title{color:var(--red);}
.result-body{font-size:13px;color:var(--muted);line-height:1.6;}
.ko-box{background:var(--red-l);border-left:3px solid var(--red);border-radius:0 var(--rs) var(--rs) 0;padding:12px 16px;font-size:13px;color:#8a1a0a;margin-top:14px;line-height:1.6;}
.est-box{background:var(--off);border:1px solid var(--border-l);border-radius:var(--rs);padding:16px 20px;margin-top:16px;}
.est-label{font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:var(--muted);margin-bottom:4px;}
.est-amount{font-family:'Barlow Condensed',sans-serif;font-size:34px;font-weight:800;color:var(--navy);line-height:1;margin-bottom:3px;}
.est-sub{font-size:12px;color:var(--muted);}
.est-grid{display:flex;gap:10px;margin-top:12px;flex-wrap:wrap;}
.est-item{flex:1;min-width:110px;background:var(--white);border:1px solid var(--border-l);border-radius:var(--rs);padding:10px 12px;}
.est-item-label{font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.8px;color:var(--muted);margin-bottom:3px;}
.est-item-val{font-size:14px;font-weight:600;color:var(--navy);}

/* LOTING STATS BOX */
.loting-box{background:var(--orange-l);border:1px solid var(--orange-b);border-radius:var(--r);padding:18px 20px;margin-bottom:14px;animation:up .4s ease;}
.loting-box-title{font-family:'Barlow Condensed',sans-serif;font-size:16px;font-weight:700;color:var(--orange);margin-bottom:12px;display:flex;align-items:center;gap:8px;}
.loting-stats{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:14px;}
.loting-stat{flex:1;min-width:100px;background:var(--white);border-radius:var(--rs);padding:12px 14px;border:1px solid var(--orange-b);text-align:center;}
.loting-stat-num{font-family:'Barlow Condensed',sans-serif;font-size:28px;font-weight:800;line-height:1;margin-bottom:3px;}
.loting-stat-num.red{color:var(--red);}
.loting-stat-num.orange{color:var(--orange);}
.loting-stat-num.green{color:var(--green);}
.loting-stat-label{font-size:11px;color:var(--muted);line-height:1.3;}
.loting-kans{display:flex;align-items:center;gap:10px;background:var(--white);border-radius:var(--rs);padding:12px 16px;border:1px solid var(--orange-b);margin-bottom:12px;}
.loting-kans-pct{font-family:'Barlow Condensed',sans-serif;font-size:36px;font-weight:800;color:var(--orange);flex-shrink:0;line-height:1;}
.loting-kans-text{font-size:13px;color:var(--text);line-height:1.55;}
.loting-kans-text strong{color:var(--navy);}
.loting-cta{font-size:13px;color:var(--orange);font-weight:500;line-height:1.5;}
.loting-cta strong{color:var(--navy);}

/* LOTING DETAIL (na betaling) */
.loting-detail{background:var(--navy);border-radius:var(--r);padding:20px 22px;margin-bottom:14px;}
.loting-detail-title{font-family:'Barlow Condensed',sans-serif;font-size:17px;font-weight:700;color:#fff;margin-bottom:14px;display:flex;align-items:center;gap:8px;}
.loting-detail-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:14px;}
.loting-detail-item{background:rgba(255,255,255,0.08);border-radius:var(--rs);padding:12px 14px;}
.loting-detail-num{font-family:'Barlow Condensed',sans-serif;font-size:26px;font-weight:800;color:#fff;line-height:1;margin-bottom:3px;}
.loting-detail-num.accent{color:var(--blue-light);}
.loting-detail-num.warn{color:#ffd080;}
.loting-detail-num.bad{color:#ff9090;}
.loting-detail-label{font-size:11px;color:rgba(255,255,255,0.55);line-height:1.3;}
.loting-bar-wrap{margin-top:4px;}
.loting-bar-label{font-size:11px;color:rgba(255,255,255,0.55);margin-bottom:6px;display:flex;justify-content:space-between;}
.loting-bar-track{height:8px;background:rgba(255,255,255,0.12);border-radius:4px;overflow:hidden;}
.loting-bar-fill{height:100%;border-radius:4px;background:linear-gradient(90deg,#2aaae2,#1a6bbf);}
.loting-insight{background:rgba(255,255,255,0.06);border-radius:var(--rs);padding:12px 14px;font-size:13px;color:rgba(255,255,255,0.75);line-height:1.6;}
.loting-insight strong{color:#fff;}

.pricing{border:1px solid var(--border);border-radius:var(--r);overflow:hidden;margin-top:4px;}
.pricing-head{background:var(--navy);padding:16px 22px;}
.pricing-head-title{font-family:'Barlow Condensed',sans-serif;font-size:18px;font-weight:700;color:#fff;letter-spacing:.5px;}
.pricing-head-sub{font-size:12px;color:rgba(255,255,255,0.5);margin-top:2px;}
.pricing-body{padding:20px 22px;background:var(--white);}
.eb-badge{display:inline-flex;align-items:center;gap:5px;background:var(--blue);color:#fff;font-size:11px;font-weight:700;letter-spacing:.5px;padding:3px 10px;border-radius:20px;margin-bottom:12px;text-transform:uppercase;}
.price-row{display:flex;align-items:baseline;gap:8px;margin-bottom:12px;}
.price-main{font-family:'Barlow Condensed',sans-serif;font-size:40px;font-weight:800;color:var(--navy);}
.price-strike{font-size:18px;color:var(--muted);text-decoration:line-through;}
.price-lbl{font-size:13px;color:var(--muted);}
.features{list-style:none;margin-bottom:14px;}
.features li{display:flex;align-items:flex-start;gap:8px;font-size:13px;padding:5px 0;border-bottom:1px solid var(--border-l);color:var(--muted);line-height:1.45;}
.features li:last-child{border-bottom:none;}
.feat-check{color:var(--blue-light);font-size:15px;flex-shrink:0;margin-top:1px;}
.nocure-note{background:var(--off);border:1px solid var(--border-l);border-radius:var(--rs);padding:11px 14px;font-size:12px;color:var(--muted);line-height:1.6;margin-bottom:16px;}
.nocure-note strong{color:var(--navy);}
.form-group{margin-bottom:14px;}
.form-label{display:block;font-size:13px;font-weight:600;color:var(--navy);margin-bottom:5px;}
.form-input{width:100%;padding:10px 14px;border:1px solid var(--border);border-radius:var(--rs);font-size:14px;font-family:'Barlow',sans-serif;color:var(--text);outline:none;transition:border-color .2s;background:var(--white);}
.form-input:focus{border-color:var(--blue);}
.form-select{width:100%;padding:10px 14px;border:1px solid var(--border);border-radius:var(--rs);font-size:14px;font-family:'Barlow',sans-serif;color:var(--text);outline:none;background:var(--white);cursor:pointer;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%235a6e82' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center;}
.form-select:focus{border-color:var(--blue);}
.form-row{display:flex;gap:12px;flex-wrap:wrap;}
.form-row .form-group{flex:1;min-width:180px;}
.form-hint{font-size:11px;color:var(--muted);margin-top:4px;}
.kvk-row{display:flex;gap:8px;align-items:flex-end;}
.kvk-row .form-group{flex:1;margin-bottom:0;}
.kvk-btn{padding:10px 16px;border-radius:var(--rs);background:var(--blue-pale);border:1px solid var(--blue-pale2);color:var(--blue);font-size:13px;font-weight:600;cursor:pointer;font-family:'Barlow',sans-serif;white-space:nowrap;transition:all .18s;}
.kvk-btn:hover{background:var(--blue);color:#fff;border-color:var(--blue);}
.kvk-btn:disabled{background:var(--border);color:var(--muted);cursor:not-allowed;border-color:var(--border);}
.kvk-result{margin-top:10px;padding:12px 14px;background:var(--green-l);border:1px solid var(--green-b);border-radius:var(--rs);font-size:13px;color:var(--green);display:flex;align-items:center;gap:8px;}
.act-grid{display:flex;flex-direction:column;gap:10px;margin-top:4px;}
.act-card{border:1.5px solid var(--border);border-radius:var(--r);padding:16px 18px;cursor:pointer;transition:all .2s;background:var(--white);}
.act-card:hover{border-color:var(--blue-light);background:var(--blue-pale);}
.act-card.selected{border-color:var(--blue);background:var(--blue-pale);}
.act-card-header{display:flex;align-items:flex-start;gap:12px;}
.act-checkbox{width:20px;height:20px;border:1.5px solid var(--border);border-radius:4px;flex-shrink:0;display:flex;align-items:center;justify-content:center;transition:all .18s;margin-top:2px;font-size:12px;color:#fff;}
.act-card.selected .act-checkbox{background:var(--navy);border-color:var(--navy);}
.act-card-body{flex:1;}
.act-tag{display:inline-flex;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:2px 8px;border-radius:20px;margin-bottom:6px;}
.act-tag.a{background:#e8f4fc;color:var(--blue);}
.act-tag.b{background:var(--green-l);color:var(--green);}
.act-tag.c{background:#fff3e8;color:#b06010;}
.act-title{font-size:14px;font-weight:600;color:var(--navy);margin-bottom:4px;line-height:1.3;}
.act-desc{font-size:12px;color:var(--muted);line-height:1.55;margin-bottom:8px;}
.act-examples{display:flex;flex-wrap:wrap;gap:5px;margin-top:6px;}
.act-example{font-size:11px;background:var(--off);border:1px solid var(--border-l);border-radius:20px;padding:2px 9px;color:var(--muted);}
.act-card.selected .act-example{background:var(--white);}
.act-min{font-size:11px;color:var(--muted);margin-top:8px;padding-top:8px;border-top:1px solid var(--border-l);}
.pay-box{background:var(--off);border:1px solid var(--border-l);border-radius:var(--r);padding:22px;text-align:center;}
.pay-methods{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin:14px 0;}
.pay-btn{display:flex;align-items:center;gap:7px;padding:9px 16px;border:1px solid var(--border);border-radius:var(--rs);cursor:pointer;font-size:13px;font-weight:500;background:var(--white);color:var(--muted);transition:all .18s;font-family:'Barlow',sans-serif;}
.pay-btn:hover{border-color:var(--navy);color:var(--navy);background:var(--blue-pale);}
.pay-btn.active{border-color:var(--blue);border-width:1.5px;background:var(--blue-pale);color:var(--navy);font-weight:600;}
.ideal{font-weight:800;color:#cc0066;}
.pay-secure{font-size:11px;color:var(--muted);margin-top:12px;display:flex;align-items:center;justify-content:center;gap:5px;}
.divider{height:1px;background:var(--border-l);margin:18px 0;}
.ccheck{display:flex;align-items:flex-start;gap:10px;padding:12px;border:1px solid var(--border);border-radius:var(--rs);cursor:pointer;margin-bottom:10px;transition:border-color .2s;}
.ccheck:hover{border-color:var(--blue-light);}
.ccheck.on{border-color:var(--blue);background:var(--blue-pale);}
.cbox{width:18px;height:18px;border:1.5px solid var(--border);border-radius:4px;flex-shrink:0;display:flex;align-items:center;justify-content:center;transition:all .18s;margin-top:1px;font-size:11px;}
.ccheck.on .cbox{background:var(--navy);border-color:var(--navy);color:#fff;}
.ccheck-text{font-size:13px;line-height:1.55;color:var(--muted);}
.success-header{background:var(--navy);border-radius:var(--r) var(--r) 0 0;padding:28px 28px 24px;margin:-24px -24px 24px;text-align:center;}
.success-header-icon{font-size:48px;display:block;margin-bottom:12px;}
.success-header-title{font-family:'Barlow Condensed',sans-serif;font-size:26px;font-weight:700;color:#fff;margin-bottom:6px;}
.success-header-sub{color:rgba(255,255,255,0.65);font-size:13px;line-height:1.6;}
.paid-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(42,170,226,0.2);border:1px solid rgba(42,170,226,0.4);color:var(--blue-light);font-size:12px;font-weight:600;padding:4px 12px;border-radius:20px;margin-top:10px;}
.ai-box{background:var(--blue-pale);border:1px solid var(--blue-pale2);border-radius:var(--r);padding:22px;margin-bottom:14px;}
.ai-label{font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--blue);margin-bottom:12px;display:flex;align-items:center;gap:6px;}
.ai-label::before{content:'✦';color:var(--blue-light);}
.ai-text{font-size:14px;line-height:1.85;color:var(--text);white-space:pre-line;}
.spinner{width:32px;height:32px;border:2.5px solid var(--border);border-top-color:var(--navy);border-radius:50%;animation:spin .8s linear infinite;margin:0 auto 12px;}
@keyframes spin{to{transform:rotate(360deg)}}
.next-steps{background:var(--off);border:1px solid var(--border-l);border-radius:var(--r);padding:20px 22px;margin-bottom:14px;}
.next-steps-title{font-family:'Barlow Condensed',sans-serif;font-size:16px;font-weight:700;color:var(--navy);margin-bottom:14px;letter-spacing:.3px;}
.next-step{display:flex;align-items:flex-start;gap:14px;padding:10px 0;border-bottom:1px solid var(--border-l);}
.next-step:last-child{border-bottom:none;}
.next-step-num{width:28px;height:28px;border-radius:50%;background:var(--navy);color:#fff;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;}
.next-step-body{flex:1;}
.next-step-title{font-size:14px;font-weight:600;color:var(--navy);margin-bottom:2px;}
.next-step-sub{font-size:12px;color:var(--muted);line-height:1.5;}
.summary{padding:16px 20px;background:var(--off);border-radius:var(--rs);border:1px solid var(--border-l);}
.sum-lbl{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--muted);margin-bottom:10px;}
.sum-row{display:flex;justify-content:space-between;font-size:13px;padding:4px 0;}
.sum-row span:first-child{color:var(--muted);}
.sum-row span:last-child{font-weight:600;color:var(--navy);}
.info-list{list-style:none;}
.info-list li{display:flex;align-items:flex-start;gap:9px;padding:9px 0;font-size:13px;color:var(--muted);border-bottom:1px solid var(--border-l);line-height:1.5;}
.info-list li:last-child{border-bottom:none;}
.alert-info{background:var(--blue-pale);border:1px solid var(--blue-pale2);border-radius:var(--rs);padding:11px 15px;font-size:12px;color:var(--blue);margin-bottom:12px;}
.alert-warn{background:#fffbec;border:1px solid #f5e090;border-radius:var(--rs);padding:11px 15px;font-size:12px;color:#7a5800;margin-bottom:12px;}
@media(max-width:580px){
  .card{padding:18px;}.pricing-body{padding:16px 18px;}
  .price-main{font-size:34px;}.est-amount{font-size:28px;}
  .btn{padding:10px 16px;font-size:13px;}
  .hdr-inner{padding:18px 16px 0;}.main{padding:18px 14px 50px;}
  .step-tab{font-size:10px;padding:9px 3px;}
  .form-row{flex-direction:column;}.form-row .form-group{min-width:unset;}
  .loting-detail-grid{grid-template-columns:1fr 1fr 1fr;}
  .success-header{padding:22px 18px 20px;margin:-18px -18px 20px;}
}
`;

const QUESTIONS=[
  {id:"employees",label:"Heeft uw bedrijf personeel in dienst?",hint:"Minimaal één werknemer met arbeidscontract (geen aandeelhouders-DGA of zzp'ers).",options:[{v:"yes",l:"Ja, wij hebben minimaal 1 werknemer in dienst"},{v:"no",l:"Nee, ik werk alleen / uitsluitend met zzp'ers"}],ko:"no",koMsg:"De SLIM-subsidie is niet beschikbaar voor bedrijven zonder personeel in loondienst."},
  {id:"size",label:"Valt uw bedrijf binnen het midden- en kleinbedrijf (mkb)?",hint:"Minder dan 250 medewerkers én jaaromzet ≤ €50 mln of balanstotaal ≤ €43 mln. Uitzondering: grootbedrijf in landbouw, horeca of recreatie mag ook aanvragen.",options:[{v:"yes",l:"Ja, wij zijn een mkb-onderneming"},{v:"groot",l:"Nee, maar wij zijn grootbedrijf in landbouw, horeca of recreatie"},{v:"no",l:"Nee, wij vallen buiten het mkb"}],ko:"no",koMsg:"SLIM-subsidie is uitsluitend voor mkb-ondernemingen of grootbedrijven in de landbouw-, horeca- of recreatiesector."},
  {id:"netherlands",label:"Is uw bedrijf in Nederland gevestigd en vinden de activiteiten in Nederland plaats?",hint:"Zowel vestiging als activiteiten moeten in Nederland zijn.",options:[{v:"yes",l:"Ja, wij zijn in Nederland gevestigd en actief"},{v:"no",l:"Nee, wij zijn (deels) buiten Nederland gevestigd"}],ko:"no",koMsg:"SLIM-subsidie geldt uitsluitend voor in Nederland gevestigde ondernemingen."},
  {id:"financial",label:"Verkeert uw bedrijf in financiële moeilijkheden?",hint:"Faillissement, surseance van betaling of schuldsanering (WSNP) zijn uitsluitingsgronden.",options:[{v:"no",l:"Nee, ons bedrijf is financieel gezond"},{v:"yes",l:"Ja, er spelen betalingsproblemen of faillissement"}],ko:"yes",koMsg:"Bedrijven in faillissement, surseance van betaling of WSNP komen niet in aanmerking."},
  {id:"started",label:"Zijn de geplande activiteiten al gestart?",hint:"Activiteiten mogen nog niet begonnen zijn vóór de subsidieverlening.",options:[{v:"no",l:"Nee, de activiteiten zijn nog niet gestart"},{v:"yes",l:"Ja, we zijn al begonnen"}],ko:"yes",koMsg:"Activiteiten die al zijn gestart vóór subsidieverlening komen niet in aanmerking."},
  {id:"deminimis",label:"Heeft uw bedrijf de afgelopen 3 jaar meer dan €300.000 staatssteun ontvangen?",hint:"Alle de-minimissteun bij elkaar opgeteld.",options:[{v:"no",l:"Nee, wij zijn ruim onder het plafond"},{v:"unsure",l:"Ik weet het niet zeker"},{v:"yes",l:"Ja, meer dan €300.000 ontvangen"}],ko:"yes",koMsg:"Het Europese de-minimisplafond is overschreden."},
  {id:"agriculture",label:"Is uw bedrijf actief in de landbouwsector?",hint:"Bepaalt het maximale subsidiebedrag (€20.000 i.p.v. €24.999) — geen uitsluitingsgrond.",options:[{v:"no",l:"Nee, wij zijn niet actief in de landbouw"},{v:"yes",l:"Ja, wij zijn een landbouwbedrijf"}],ko:null},
];

const RECHTSVORMEN=["Eenmanszaak","VOF (Vennootschap onder firma)","Maatschap","BV (Besloten vennootschap)","NV (Naamloze vennootschap)","Coöperatie","Stichting","Vereniging","Anders"];
const SECTOREN=["Bouw & installatie","Detailhandel","Gezondheidszorg & welzijn","Groothandel","Horeca","ICT & technologie","Industrie & productie","Landbouw & agri","Logistiek & transport","Onderwijs","Overige dienstverlening","Recreatie & toerisme","Zakelijke dienstverlening","Anders"];
const PROVINCIES=["Drenthe","Flevoland","Friesland","Gelderland","Groningen","Limburg","Noord-Brabant","Noord-Holland","Overijssel","Utrecht","Zeeland","Zuid-Holland"];

const ACTIVITEITEN=[
  {id:"A",tag:"Activiteit A",tagClass:"a",title:"Doorlichting onderneming → Opleidings- of ontwikkelplan",desc:"Een externe adviseur analyseert uw organisatie en brengt de scholingsbehoefte in kaart. Resultaat: een concreet opleidings- of ontwikkelplan. (Art. 2.4 lid 1a SLIM-regeling)",examples:["Leercultuurscan","Opleidingsbehoefteanalyse","Strategisch HR-plan","Competentiescan"],min:"Minimale investering: €8.334 · Minimale subsidie: €5.000"},
  {id:"B",tag:"Activiteit B",tagClass:"b",title:"Loopbaan- of ontwikkeladviezen voor werknemers",desc:"Individuele loopbaan- of ontwikkeladviezen via een gecertificeerde loopbaanadviseur (Noloc of gelijkwaardig). (Art. 2.4 lid 1b + Art. 2.5 SLIM-regeling)",examples:["Loopbaangesprekken","Persoonlijk ontwikkelplan (POP)","Talentassessment","Vaardighedenanalyse"],min:"Max. subsidie per advies: €700 · Adviseur moet Noloc-gecertificeerd zijn"},
  {id:"C",tag:"Activiteit C",tagClass:"c",title:"Ontwikkelen of invoeren van een L&O-methode",desc:"Ontwikkel of implementeer een structurele methode die werknemers stimuleert kennis en vaardigheden te blijven ontwikkelen op de werkvloer. (Art. 2.4 lid 1c SLIM-regeling)",examples:["Online leerportal / e-learning","Bedrijfsschool opzetten","Videoserie intern leren","Systeem van ontwikkelgesprekken","Workshops en kennissessies","Cursusmateriaal en -modules"],min:"Minimale investering: €8.334 · Minimale subsidie: €5.000"},
];

// Officiële lotingscijfers tijdvak 1 2026 (bron: RVO, 8 mei 2026)
const LOTING={
  tijdvak:"Tijdvak 1 2026",
  totaalIngediend:3360,       // 3.337 in loting + 23 vóór loting afgekeurd
  afgekeurdVoorLoting:23,     // afgekeurd vóór loting (fouten in aanvraag)
  inLoting:3337,              // meegenomen in notariële loting
  inBehandeling:474,          // in behandeling genomen (bron: RVO 8 mei 2026)
  budget:11000000,
  kansRuw:Math.round((474/3360)*100),     // kans o.b.v. totaal ingediend
  kansInLoting:Math.round((474/3337)*100), // kans o.b.v. gelote aanvragen
};

function fmt(n){return new Intl.NumberFormat("nl-NL",{style:"currency",currency:"EUR",maximumFractionDigits:0}).format(n);}
function calcSubsidy(inv,agri){return Math.min(inv*.6,agri?20000:24999);}
function isEarlyBird(){
  const now=new Date();
  return (now>=new Date(2026,4,5)&&now<=new Date(2026,5,9))||(now>=new Date(2026,8,8)&&now<=new Date(2027,1,7));
}
function nextDeadline(){
  const now=new Date();
  const opts=[
    {label:"Tijdvak 1 2026",open:new Date(2026,3,7),close:new Date(2026,4,4)},
    {label:"Tijdvak 2 2026",open:new Date(2026,7,10),close:new Date(2026,8,7)},
    {label:"Tijdvak 1 2027",open:new Date(2027,3,6),close:new Date(2027,4,4)},
  ];
  return opts.find(d=>now<d.close)||opts[opts.length-1];
}

const STEP_LABELS=["Quickscan","Resultaat","Profiel","Betaling","Analyse"];
const PHASE_IDX={scan:0,ko:0,result:1,profile:2,payment:3,success:4};

export default function App(){
  const [phase,setPhase]=useState("scan");
  const [answers,setAnswers]=useState({});
  const [investment,setInvestment]=useState("");
  const [koMsg,setKoMsg]=useState(null);
  const [analysis,setAnalysis]=useState("");
  const [loadingAI,setLoadingAI]=useState(false);
  const [contact,setContact]=useState({naam:"",bedrijf:"",email:"",telefoon:""});
  const [payMethod,setPayMethod]=useState("ideal");
  const [confirmed,setConfirmed]=useState({terms:false,nocure:false});
  const [processing,setProcessing]=useState(false);
  const [kvkInput,setKvkInput]=useState("");
  const [kvkDone,setKvkDone]=useState(false);
  const [kvkBedrijf,setKvkBedrijf]=useState("");
  const [profile,setProfile]=useState({medewerkers:"",rechtsvorm:"",sector:"",provincie:""});
  const [selectedActs,setSelectedActs]=useState([]);

  // Scroll naar boven bij elke fase-overgang
  useEffect(()=>{ window.scrollTo({top:0,behavior:"smooth"}); },[phase]);

  const eb=isEarlyBird();
  const deadline=nextDeadline();
  const basePrice=250;
  const finalPrice=eb?basePrice*.8:basePrice;
  const successFee=2500; // Succesfee altijd €2.500 excl. btw
  const isAgri=answers.agriculture==="yes";
  const invNum=parseFloat(investment.replace(",","."))||0;
  const subsidyEst=invNum>=8334?calcSubsidy(invNum,isAgri):0;
  const allScanDone=QUESTIONS.every(q=>answers[q.id]!==undefined)&&invNum>=8334;
  const profileOk=profile.medewerkers&&profile.rechtsvorm&&profile.sector&&profile.provincie&&selectedActs.length>0&&contact.bedrijf;
  const progress=[10,25,45,68,100];
  const curStep=PHASE_IDX[phase]||0;
  const bedrijfsnaam=contact.bedrijf;

  function answer(id,v){
    const q=QUESTIONS.find(q=>q.id===id);
    setAnswers(p=>({...p,[id]:v}));
    if(q.ko&&v===q.ko){setKoMsg(q.koMsg);setTimeout(()=>setPhase("ko"),150);}
  }
  function toggleAct(id){setSelectedActs(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);}
  function doKvk(){
    if(kvkInput.length<8)return;
    // Zet kvkDone op true zodat de klant de naam zelf kan invullen
    setKvkDone(true);
    setKvkBedrijf("");
    setContact(p=>({...p,bedrijf:""}));
  }

  async function generateAnalysis(){
    setLoadingAI(true);setAnalysis("");
    const actNames=selectedActs.map(id=>ACTIVITEITEN.find(a=>a.id===id)?.title||id).join(" + ");
    try{
      const res=await fetch("/api/analyze",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-3-5-sonnet-20241022",max_tokens:1400,
          messages:[{role:"user",content:`Je bent een expert SLIM-subsidieadviseur van SLIM Subsidie Advies. De ondernemer heeft zojuist betaald voor een persoonlijke diepteanalyse. Schrijf een waardevolle, professionele en bemoedigende analyse in het Nederlands (max 380 woorden, geen markdown, gebruik alinea's met witregel, spreek de ondernemer aan met "u"). Begin positief en bevestigend.

Bedrijfsprofiel:
- Bedrijf: ${bedrijfsnaam}
- Bedrijfsgrootte: ${answers.size==="groot"?"Grootbedrijf landbouw/horeca/recreatie":"MKB"}
- Medewerkers: ${profile.medewerkers}
- Rechtsvorm: ${profile.rechtsvorm}
- Sector: ${profile.sector}
- Provincie: ${profile.provincie}
- Landbouwsector: ${isAgri?"Ja":"Nee"}
- Investering: ${fmt(invNum)}
- Indicatief subsidiebedrag: ${fmt(subsidyEst)}
- Gekozen activiteit(en): ${actNames}
- Tijdvak: ${deadline.label} (opening: ${deadline.open.toLocaleDateString("nl-NL")})

Actuele lotingscijfers tijdvak 1 2026 (bron: RVO, 8 mei 2026):
- 3.360 aanvragen ingediend in totaal
- 23 aanvragen afgekeurd VÓÓR de loting (fouten in aanvraag)
- 3.337 aanvragen meegenomen in de notariële loting
- 474 van de 3.337 aanvragen ingeloot (~14%) — inloting betekent dat de aanvraag in behandeling wordt genomen, niet dat subsidie is toegekend
- Budget: €11 miljoen

Bespreek in vier alinea's:
1. Positieve opening + kansrijkheid gelet op sector, omvang en activiteitenkeuze
2. Of de gekozen activiteit(en) goed passen — eventueel een betere of aanvullende suggestie
3. Lotingsrisico realistisch geduid met de actuele cijfers — benadruk dat de 23 voortijdige afwijzingen aantoont hoe belangrijk een correcte, complete aanvraag is
4. Twee concrete tips voor een sterke aanvraag + motiverende afsluiting richting de samenwerking met SLIM Subsidie Advies`}]
        })
      });
      const data=await res.json();
      setAnalysis(data.content?.map(b=>b.text||"").join("")||"Analyse kon niet worden geladen.");
    }catch(e){setAnalysis("Er is een fout opgetreden. Uw adviseur neemt spoedig contact op.");}
    setLoadingAI(false);
  }

  function submitPayment(){
    if(!contact.naam||!contact.email){alert("Vul uw naam en e-mailadres in.");return;}
    setProcessing(true);
    setTimeout(()=>{
      setProcessing(false);
      setPhase("success");
      generateAnalysis();
    },2000);
  }

  // ── LOTING STATS COMPONENT (gebruikt op 2 plekken) ──
  function LotingBox({compact=false}){
    const barPct=Math.round((LOTING.inBehandeling/LOTING.totaalIngediend)*100);
    if(compact){
      return(
        <div className="loting-box">
          <div className="loting-box-title">⚠️ Lotingscijfers {LOTING.tijdvak} — ken de realiteit</div>
          <div className="loting-stats">
            <div className="loting-stat">
              <div className="loting-stat-num orange">{LOTING.inLoting.toLocaleString("nl-NL")}</div>
              <div className="loting-stat-label">in loting (van 3.360 ingediend)</div>
            </div>
            <div className="loting-stat">
              <div className="loting-stat-num red">{LOTING.afgekeurdVoorLoting}</div>
              <div className="loting-stat-label">afgekeurd vóór loting</div>
            </div>
            <div className="loting-stat">
              <div className="loting-stat-num green">{LOTING.inBehandeling}</div>
              <div className="loting-stat-label">in behandeling</div>
            </div>
          </div>
          <div className="loting-kans">
            <div className="loting-kans-pct">~{LOTING.kansRuw}%</div>
            <div className="loting-kans-text">
              <strong>Effectieve slaagkans zonder begeleiding.</strong> Van de {LOTING.totaalIngediend.toLocaleString("nl-NL")} indieners werden slechts {LOTING.inBehandeling} meegenomen. Bovendien vielen al <strong>{LOTING.afgekeurdVoorLoting} aanvragen vóór de loting af</strong> door fouten — volledig vermijdbaar met professionele begeleiding.
            </div>
          </div>
          <div className="loting-cta">💡 <strong>Conclusie:</strong> een correcte, complete aanvraag is de eerste stap. Daarna bepaalt de loting uw kans. Wij zorgen voor stap één.</div>
        </div>
      );
    }
    return(
      <div className="loting-detail">
        <div className="loting-detail-title">📊 Lotingscijfers {LOTING.tijdvak} <span style={{fontSize:12,fontWeight:400,opacity:.6}}>(bron: RVO, 8 mei 2026)</span></div>
        <div className="loting-detail-grid">
          <div className="loting-detail-item">
            <div className="loting-detail-num">{LOTING.totaalIngediend.toLocaleString("nl-NL")}</div>
            <div className="loting-detail-label">aanvragen ingediend in totaal</div>
          </div>
          <div className="loting-detail-item">
            <div className="loting-detail-num">{LOTING.inLoting.toLocaleString("nl-NL")}</div>
            <div className="loting-detail-label">meegenomen in notariële loting</div>
          </div>
          <div className="loting-detail-item">
            <div className="loting-detail-num bad">{LOTING.afgekeurdVoorLoting}</div>
            <div className="loting-detail-label">afgekeurd vóór loting — fouten in aanvraag</div>
          </div>
          <div className="loting-detail-item">
            <div className="loting-detail-num accent">{LOTING.inBehandeling}</div>
            <div className="loting-detail-label">in behandeling genomen</div>
          </div>
          <div className="loting-detail-item">
            <div className="loting-detail-num warn">~{LOTING.kansRuw}%</div>
            <div className="loting-detail-label">effectieve slaagkans per aanvraag</div>
          </div>
        </div>
        <div className="loting-bar-wrap">
          <div className="loting-bar-label">
            <span>In behandeling ({LOTING.inBehandeling})</span>
            <span>Niet in behandeling ({LOTING.totaalIngediend - LOTING.inBehandeling})</span>
          </div>
          <div className="loting-bar-track">
            <div className="loting-bar-fill" style={{width:`${barPct}%`}}/>
          </div>
        </div>
        <div className="loting-insight" style={{marginTop:12}}>
          <strong>Let op:</strong> {LOTING.afgekeurdVoorLoting} aanvragen werden al vóór de loting afgekeurd door fouten of onvolledige documenten. Dit is volledig vermijdbaar. Met SLIM Subsidie Advies valt uw aanvraag nooit af vóór de loting.
        </div>
      </div>
    );
  }

  return(
    <>
      <style>{css}</style>
      <div className="app">
        <header className="hdr">
          <div className="hdr-inner">
            <div className="logo">
              <span className="logo-slim">SLIM</span>
              <span className="logo-sub">SUBSIDIE</span>
              <span className="logo-adv">ADVIES</span>
            </div>
            <p className="hdr-title">Komt uw bedrijf in aanmerking voor <span>SLIM-subsidie</span>?</p>
            <p className="hdr-sub">Gratis quickscan · Bedrijfsprofiel · Betaling · Persoonlijke AI-analyse</p>
            <div className="prog-bar"><div className="prog-fill" style={{width:`${progress[curStep]}%`}}/></div>
          </div>
          <div className="steps-bar">
            {STEP_LABELS.map((l,i)=>(
              <div key={i} className={`step-tab ${i<curStep?"done":i===curStep?"active":""}`}>{l}</div>
            ))}
          </div>
        </header>

        <main className="main">

          {/* SCAN */}
          {phase==="scan"&&(
            <>
              <div className="phase-lbl"><span className="phase-dot"/>Stap 1 — Gratis Quickscan</div>
              <div className="card">
                <div className="card-title">Basischeck subsidievoorwaarden</div>
                <p className="card-sub">Beantwoord 8 korte vragen om te controleren of uw bedrijf in aanmerking komt voor SLIM-subsidie (tot €24.999). Duurt minder dan 2 minuten.</p>
                {QUESTIONS.map((q,i)=>(
                  <div key={q.id} className="q-block">
                    <div className="q-label"><span className="q-num">{i+1}</span>{q.label}</div>
                    {q.hint&&<p className="q-hint">{q.hint}</p>}
                    <div className="options">
                      {q.options.map(o=>(
                        <label key={o.v} className={`opt ${answers[q.id]===o.v?"sel":""}`} onClick={()=>answer(q.id,o.v)}>
                          <span className="opt-radio"><span className="opt-dot"/></span>{o.l}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="q-block">
                  <div className="q-label"><span className="q-num">8</span>Wat is de verwachte totale investering in leer- en ontwikkelactiviteiten?</div>
                  <p className="q-hint">Uren medewerkers + externe kosten. Minimaal {fmt(8334)} voor een minimale subsidie van €5.000.</p>
                  <div className="input-wrap">
                    <span className="input-pfx">€</span>
                    <input className="num-input" type="number" min="0" placeholder="bijv. 30000" value={investment} onChange={e=>setInvestment(e.target.value)}/>
                  </div>
                  {subsidyEst>0&&<p className="input-hint">✓ Indicatief subsidiebedrag: {fmt(subsidyEst)}</p>}
                </div>
                <div className="btn-row">
                  <button className="btn btn-primary" onClick={()=>setPhase("result")} disabled={!allScanDone}>Bekijk resultaat →</button>
                </div>
              </div>
              <div className="alert-info">🔒 Uw gegevens worden veilig verwerkt en niet gedeeld met derden.</div>
            </>
          )}

          {/* KO */}
          {phase==="ko"&&(
            <>
              <div className="phase-lbl"><span className="phase-dot" style={{background:"var(--red)"}}/>Resultaat Quickscan</div>
              <div className="result fail">
                <span className="result-icon">✗</span>
                <div className="result-title">Helaas — uw bedrijf komt (nog) niet in aanmerking</div>
                <p className="result-body">Op basis van uw antwoorden is een harde uitsluitingsgrond van toepassing.</p>
                <div className="ko-box">{koMsg}</div>
              </div>
              <div className="card">
                <div className="card-title">Wat kunt u nu doen?</div>
                <ul className="info-list">
                  <li><span>📞</span>Neem contact met ons op — er zijn mogelijk alternatieve subsidiemogelijkheden.</li>
                  <li><span>🔄</span>Is de situatie binnenkort anders? Kom terug voor een nieuwe check.</li>
                  <li><span>🤝</span>U kunt mogelijk deelnemen als partner in een samenwerkingsverband.</li>
                </ul>
                <div className="btn-row">
                  <button className="btn btn-ghost" onClick={()=>{setPhase("scan");setAnswers({});setKoMsg(null);}}>← Opnieuw beginnen</button>
                </div>
              </div>
            </>
          )}

          {/* RESULT */}
          {phase==="result"&&(
            <>
              <div className="phase-lbl"><span className="phase-dot"/>Stap 2 — Resultaat Quickscan</div>
              <div className="result ok">
                <span className="result-icon">✓</span>
                <div className="result-title">Goed nieuws — geen uitsluitingsgronden gevonden</div>
                <p className="result-body">Op basis van uw antwoorden lijkt uw bedrijf in aanmerking te komen voor de SLIM-subsidie.</p>
                <div className="est-box">
                  <div className="est-label">Indicatief subsidiebedrag</div>
                  <div className="est-amount">{fmt(subsidyEst)}</div>
                  <div className="est-sub">60% van {fmt(invNum)}{isAgri?" (max. €20.000 voor landbouw)":" (max. €24.999)"}</div>
                  <div className="est-grid">
                    <div className="est-item"><div className="est-item-label">Tijdvak</div><div className="est-item-val">{deadline.label}</div></div>
                    <div className="est-item"><div className="est-item-label">Opening aanvraag</div><div className="est-item-val">{deadline.open.toLocaleDateString("nl-NL")}</div></div>
                    <div className="est-item"><div className="est-item-label">Subsidie %</div><div className="est-item-val">60%</div></div>
                  </div>
                </div>
              </div>

              {/* LOTING STATS — compact, urgentie toon */}
              <LotingBox compact={true}/>

              <div className="card">
                <div className="card-title">Uw kans is reëel — maar alleen met een sterke aanvraag</div>
                <p className="card-sub">U heeft zojuist gezien dat uw bedrijf in aanmerking lijkt te komen voor tot <strong>{fmt(subsidyEst)}</strong> subsidie. Dat is veelbelovend. Maar van de {LOTING.totaalIngediend.toLocaleString("nl-NL")} ingediende aanvragen in tijdvak 1 2026 werd slechts 14% ingeloot — en vielen er al 23 uit vóór de loting door vermijdbare fouten. Een sterke, foutloze aanvraag is uw eerste en belangrijkste stap. Onze AI-dieptecheck analyseert uw specifieke situatie en onze adviseurs begeleiden u van aanvraag tot en met het volledige screeningstraject bij RVO.</p>
                <div className="pricing">
                  <div className="pricing-head">
                    <div className="pricing-head-title">SLIM DIEPTECHECK + AANVRAAGBEGELEIDING</div>
                    <div className="pricing-head-sub">Van analyse tot foutloze indiening — alles inbegrepen</div>
                  </div>
                  <div className="pricing-body">
                    {eb&&<div className="eb-badge">⏰ Early Bird — 20% korting</div>}
                    <div className="price-row">
                      <span className="price-main">{fmt(finalPrice)}</span>
                      {eb&&<span className="price-strike">{fmt(basePrice)}</span>}
                      <span className="price-lbl">eenmalig</span>
                    </div>
                    <ul className="features">
                      <li><span className="feat-check">✓</span><strong>Direct na betaling:</strong> Persoonlijke AI-diepteanalyse van uw situatie en lotingskansen</li>
                      <li><span className="feat-check">✓</span>Terugbelafspraak met uw adviseur binnen 5 werkdagen</li>
                      <li><span className="feat-check">✓</span>Foutloze aanvraag — nooit afgekeurd vóór de loting</li>
                      <li><span className="feat-check">✓</span>Activiteitenplan, begroting en documentenverzameling</li>
                      <li><span className="feat-check">✓</span>Compliance-check en indiening via RVO e-portaal</li>
                    </ul>
                    <div className="nocure-note">
                      <strong>No cure, no pay:</strong> Bij toekenning betaalt u een succesfee van <strong>€ 2.500</strong> (excl. btw). De kosten van de dieptecheck ({eb?"€ 200":"€ 250"}, excl. btw) worden u bij toekenning terugbetaald. Geen subsidie = geen succesfee.
                    </div>
                    <div className="btn-row">
                      <button className="btn btn-primary" onClick={()=>setPhase("profile")}>Vul bedrijfsprofiel in →</button>
                      <button className="btn btn-ghost" onClick={()=>{setPhase("scan");setAnswers({});}}>← Terug</button>
                    </div>
                  </div>
                </div>
                {eb&&<div className="alert-warn" style={{marginTop:12}}>⏰ <strong>Early Bird actief:</strong> U profiteert van {fmt(basePrice*.2)} korting op de reguliere prijs.</div>}
              </div>
            </>
          )}

          {/* PROFIEL */}
          {phase==="profile"&&(
            <>
              <div className="phase-lbl"><span className="phase-dot"/>Stap 3 — Bedrijfsprofiel</div>
              <div className="card">
                <div className="card-title">Bedrijfsidentificatie</div>
                <p className="card-sub">Vul uw KvK-nummer en bedrijfsnaam in. Deze gegevens worden gebruikt voor de subsidieaanvraag.</p>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">KvK-nummer</label>
                    <input className="form-input" placeholder="12345678" maxLength={8} value={kvkInput} onChange={e=>setKvkInput(e.target.value.replace(/\D/g,""))}/>
                    <p className="form-hint">8-cijferig nummer</p>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Bedrijfsnaam *</label>
                    <input className="form-input" placeholder="Uw Bedrijf" value={contact.bedrijf} onChange={e=>setContact(p=>({...p,bedrijf:e.target.value}))}/>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-title">Bedrijfsgegevens</div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Aantal medewerkers *</label>
                    <select className="form-select" value={profile.medewerkers} onChange={e=>setProfile(p=>({...p,medewerkers:e.target.value}))}>
                      <option value="">Selecteer...</option>
                      <option>1–5 medewerkers</option><option>6–10 medewerkers</option>
                      <option>11–25 medewerkers</option><option>26–50 medewerkers</option>
                      <option>51–100 medewerkers</option><option>101–249 medewerkers</option>
                      <option>250+ medewerkers</option>
                    </select>
                    <p className="form-hint">Klein: &lt;50 · Middelgroot: 50–249</p>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Rechtsvorm *</label>
                    <select className="form-select" value={profile.rechtsvorm} onChange={e=>setProfile(p=>({...p,rechtsvorm:e.target.value}))}>
                      <option value="">Selecteer...</option>
                      {RECHTSVORMEN.map(r=><option key={r}>{r}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Sector *</label>
                    <select className="form-select" value={profile.sector} onChange={e=>setProfile(p=>({...p,sector:e.target.value}))}>
                      <option value="">Selecteer...</option>
                      {SECTOREN.map(s=><option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Provincie *</label>
                    <select className="form-select" value={profile.provincie} onChange={e=>setProfile(p=>({...p,provincie:e.target.value}))}>
                      <option value="">Selecteer...</option>
                      {PROVINCIES.map(p=><option key={p}>{p}</option>)}
                    </select>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-title">Welke activiteit(en) passen bij uw situatie?</div>
                <p className="card-sub">Selecteer één of meerdere subsidiabele activiteiten (Art. 2.4 SLIM-regeling). Na betaling analyseert onze AI of uw keuze optimaal is.</p>
                <div className="act-grid">
                  {ACTIVITEITEN.map(act=>(
                    <div key={act.id} className={`act-card ${selectedActs.includes(act.id)?"selected":""}`} onClick={()=>toggleAct(act.id)}>
                      <div className="act-card-header">
                        <div className="act-checkbox">{selectedActs.includes(act.id)&&"✓"}</div>
                        <div className="act-card-body">
                          <div className={`act-tag ${act.tagClass}`}>{act.tag}</div>
                          <div className="act-title">{act.title}</div>
                          <div className="act-desc">{act.desc}</div>
                          <div className="act-examples">{act.examples.map(ex=><span key={ex} className="act-example">{ex}</span>)}</div>
                          <div className="act-min">{act.min}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="btn-row">
                  <button className="btn btn-primary" onClick={()=>setPhase("payment")} disabled={!profileOk}>Verder naar betaling →</button>
                  <button className="btn btn-ghost" onClick={()=>setPhase("result")}>← Terug</button>
                </div>
                {!profileOk&&<p style={{fontSize:12,color:"var(--muted)",marginTop:10}}>Vul alle verplichte velden in, voer uw bedrijfsnaam in en selecteer minimaal 1 activiteit.</p>}
              </div>
            </>
          )}

          {/* PAYMENT */}
          {phase==="payment"&&(
            <>
              <div className="phase-lbl"><span className="phase-dot"/>Stap 4 — Betaling</div>
              <div className="card" style={{borderLeft:"3px solid var(--blue-light)"}}>
                <div className="card-title">Wat u direct na betaling ontvangt</div>
                <ul className="features" style={{marginBottom:0}}>
                  <li><span className="feat-check">✓</span><strong>Uw persoonlijke AI-diepteanalyse</strong> — direct zichtbaar, inclusief lotingsrisico gebaseerd op officiële RVO-cijfers</li>
                  <li><span className="feat-check">✓</span>Bevestiging per e-mail met samenvatting</li>
                  <li><span className="feat-check">✓</span>Terugbelafspraak met uw adviseur binnen 5 werkdagen</li>
                  <li><span className="feat-check">✓</span>Start volledige aanvraagbegeleiding richting {deadline.label}</li>
                </ul>
              </div>
              <div className="card">
                <div className="card-title">Uw contactgegevens</div>
                <div className="form-row">
                  <div className="form-group"><label className="form-label">Uw naam *</label><input className="form-input" placeholder="Jan de Vries" value={contact.naam} onChange={e=>setContact(p=>({...p,naam:e.target.value}))}/></div>
                  <div className="form-group"><label className="form-label">Bedrijfsnaam</label><input className="form-input" placeholder="De Vries BV" value={contact.bedrijf} onChange={e=>setContact(p=>({...p,bedrijf:e.target.value}))}/></div>
                </div>
                <div className="form-row">
                  <div className="form-group"><label className="form-label">E-mailadres *</label><input className="form-input" type="email" placeholder="jan@devries.nl" value={contact.email} onChange={e=>setContact(p=>({...p,email:e.target.value}))}/></div>
                  <div className="form-group"><label className="form-label">Telefoonnummer</label><input className="form-input" placeholder="06-12345678" value={contact.telefoon} onChange={e=>setContact(p=>({...p,telefoon:e.target.value}))}/></div>
                </div>
              </div>
              <div className="card">
                <div className="card-title">Betaling via Mollie</div>
                <div className="pay-box">
                  <p style={{fontSize:14,color:"var(--muted)",marginBottom:4}}>Te betalen</p>
                  <p style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:38,fontWeight:800,color:"var(--navy)",lineHeight:1}}>
                    {fmt(finalPrice)}{eb&&<span style={{fontSize:14,color:"var(--blue-light)",marginLeft:10,fontFamily:"'Barlow',sans-serif",fontWeight:500}}>early bird</span>}
                  </p>
                  <p style={{fontSize:12,color:"var(--muted)",margin:"8px 0 0"}}>Kies uw betaalmethode:</p>
                  <div className="pay-methods">
                    <button className={`pay-btn ${payMethod==="ideal"?"active":""}`} onClick={()=>setPayMethod("ideal")}><span className="ideal">iD</span>iDEAL</button>
                    <button className={`pay-btn ${payMethod==="creditcard"?"active":""}`} onClick={()=>setPayMethod("creditcard")}>💳 Creditcard</button>
                    <button className={`pay-btn ${payMethod==="bancontact"?"active":""}`} onClick={()=>setPayMethod("bancontact")}>🏦 Bancontact</button>
                  </div>
                  <div className="pay-secure">🔒 Veilig betalen via Mollie — SSL-versleuteld</div>
                </div>
                <div className="divider"/>
                <div className="card-title" style={{marginBottom:14}}>Bevestiging</div>
                <label className={`ccheck ${confirmed.terms?"on":""}`} onClick={()=>setConfirmed(p=>({...p,terms:!p.terms}))}>
                  <span className="cbox">{confirmed.terms&&"✓"}</span>
                  <span className="ccheck-text">Ik ga akkoord met de algemene voorwaarden en de privacyverklaring van SLIM Subsidie Advies.</span>
                </label>
                <label className={`ccheck ${confirmed.nocure?"on":""}`} onClick={()=>setConfirmed(p=>({...p,nocure:!p.nocure}))}>
                  <span className="cbox">{confirmed.nocure&&"✓"}</span>
                  <span className="ccheck-text">Ik begrijp het no cure, no pay model: bij toekenning betaal ik een succesfee van € 2.500 (excl. btw). De kosten van de dieptecheck ({eb?"€ 200":"€ 250"}, excl. btw) worden mij bij toekenning terugbetaald. Geen subsidie = geen succesfee.</span>
                </label>
                <div className="btn-row">
                  <button className="btn btn-primary" onClick={submitPayment} disabled={!confirmed.terms||!confirmed.nocure||!contact.naam||!contact.email||processing}>
                    {processing?"Betaling verwerken…":`Betaal ${fmt(finalPrice)} (excl. btw) en ontvang uw analyse →`}
                  </button>
                  <button className="btn btn-ghost" onClick={()=>setPhase("profile")}>← Terug</button>
                </div>
              </div>
            </>
          )}

          {/* SUCCESS + ANALYSE */}
          {phase==="success"&&(
            <>
              <div className="phase-lbl"><span className="phase-dot"/>Uw persoonlijke SLIM-analyse</div>
              <div className="card">
                <div className="success-header">
                  <span className="success-header-icon">🎉</span>
                  <div className="success-header-title">Betaling geslaagd — uw analyse wordt gegenereerd</div>
                  <p className="success-header-sub">Bedankt, <strong>{contact.naam}</strong>. Een bevestiging is verstuurd naar <strong>{contact.email}</strong>.</p>
                  <div className="paid-badge">✓ {fmt(finalPrice)} betaald via {payMethod==="ideal"?"iDEAL":payMethod==="creditcard"?"Creditcard":"Bancontact"}</div>
                </div>

                {/* AI Analyse */}
                <div className="ai-box">
                  <div className="ai-label">Uw Persoonlijke AI Diepteanalyse — SLIM Subsidie Advies</div>
                  {loadingAI?(
                    <div style={{textAlign:"center",padding:"20px 0"}}>
                      <div className="spinner"/>
                      <p style={{fontSize:13,color:"var(--muted)"}}>Uw analyse wordt samengesteld op basis van uw bedrijfsprofiel en de actuele lotingscijfers…</p>
                    </div>
                  ):(
                    <div className="ai-text">{analysis}</div>
                  )}
                </div>

                {!loadingAI&&(
                  <div className="est-box" style={{marginBottom:0}}>
                    <div className="est-label">Uw subsidie-indicatie</div>
                    <div className="est-grid" style={{marginTop:8}}>
                      <div className="est-item"><div className="est-item-label">Subsidiebedrag</div><div className="est-item-val" style={{fontSize:20,color:"var(--green)"}}>{fmt(subsidyEst)}</div></div>
                      <div className="est-item"><div className="est-item-label">Activiteit(en)</div><div className="est-item-val">{selectedActs.join(" + ")}</div></div>
                      <div className="est-item"><div className="est-item-label">Tijdvak</div><div className="est-item-val">{deadline.label}</div></div>
                      <div className="est-item"><div className="est-item-label">Opening</div><div className="est-item-val">{deadline.open.toLocaleDateString("nl-NL")}</div></div>
                    </div>
                  </div>
                )}
              </div>

              {/* LOTING DETAIL — uitgebreid, informatief toon */}
              {!loadingAI&&<LotingBox compact={false}/>}

              {/* Volgende stappen */}
              {!loadingAI&&(
                <div className="next-steps">
                  <div className="next-steps-title">Wat gebeurt er nu?</div>
                  <div className="next-step">
                    <div className="next-step-num">1</div>
                    <div className="next-step-body">
                      <div className="next-step-title">Terugbelafspraak binnen 5 werkdagen</div>
                      <div className="next-step-sub">Uw adviseur van SLIM Subsidie Advies neemt contact met u op om de analyse door te nemen en de aanvraagstrategie te bespreken.</div>
                    </div>
                  </div>
                  <div className="next-step">
                    <div className="next-step-num">2</div>
                    <div className="next-step-body">
                      <div className="next-step-title">Complete en correcte aanvraagvoorbereiding</div>
                      <div className="next-step-sub">Met uw input bereiden wij de documentatie, het activiteitenplan en de begroting op maat voor.</div>
                    </div>
                  </div>
                  <div className="next-step">
                    <div className="next-step-num">3</div>
                    <div className="next-step-body">
                      <div className="next-step-title">Foutloze indiening & begeleid screeningstraject</div>
                      <div className="next-step-sub">Wij zorgen voor een correcte en complete aanvraag vóór indiening, zodat uw aanvraag niet uitvalt vóór de loting. Na inloting wordt uw aanvraag inhoudelijk beoordeeld door RVO. Wij begeleiden ook dit screeningstraject — inclusief eventuele toelichting- en inhoudelijke vragen van de subsidiebeoordelaars. Dit alles voor dezelfde vaste fee.</div>
                    </div>
                  </div>
                  <div className="next-step">
                    <div className="next-step-num">4</div>
                    <div className="next-step-body">
                      <div className="next-step-title">Lotingsresultaat & succesfee</div>
                      <div className="next-step-sub">Bij toekenning is een succesfee van € 2.500 (excl. btw) verschuldigd. De kosten van de dieptecheck worden terugbetaald. Geen toekenning = geen succesfee.</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="summary">
                <div className="sum-lbl">Uw betalingsoverzicht</div>
                {[["Bedrijf",bedrijfsnaam],["Sector",profile.sector],["Activiteit(en)",selectedActs.join(" + ")],["Indicatief subsidiebedrag",fmt(subsidyEst)],["Aanvraagtijdvak",deadline.label],["Betaald",fmt(finalPrice)],["Succesfee bij toekenning","€ 2.500 (excl. btw)"]].map(([k,v])=>(
                  <div key={k} className="sum-row"><span>{k}</span><span>{v}</span></div>
                ))}
              </div>
            </>
          )}

        </main>
      </div>
    </>
  );
}
