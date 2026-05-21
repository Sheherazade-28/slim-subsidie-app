import { useState, useEffect } from "react";
import SlimDatabase from "./SlimDatabase";

const css = `
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
.logo{display:flex;flex-direction:column;line-height:1.05;margin-bottom:0;}
.logo-slim{font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:20px;color:#fff;letter-spacing:1px;}
.logo-sub{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:11px;color:var(--blue-light);letter-spacing:2px;}
.logo-adv{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:11px;color:var(--blue);letter-spacing:2px;}
.hdr-title{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:clamp(19px,3.5vw,26px);color:#fff;margin-bottom:5px;line-height:1.2;}
.hdr-title span{color:var(--blue-light);}
.hdr-sub{color:rgba(255,255,255,0.55);font-size:13px;font-weight:300;}
.prog-bar{background:rgba(255,255,255,0.1);height:3px;margin-top:18px;}
.prog-fill{background:var(--blue-light);height:100%;transition:width .5s ease;}
.steps-bar{display:flex;background:rgba(255,255,255,0.04);border-top:1px solid rgba(255,255,255,0.06);}
.step-tab{flex:1;padding:8px 2px;text-align:center;font-size:10px;font-weight:600;color:rgba(255,255,255,0.32);border-bottom:2px solid transparent;transition:all .3s;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0;}
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
.price-row{display:flex;align-items:baseline;gap:8px;margin-bottom:4px;}
.price-main{font-family:'Barlow Condensed',sans-serif;font-size:40px;font-weight:800;color:var(--navy);}
.price-strike{font-size:18px;color:var(--muted);text-decoration:line-through;}
.price-lbl{font-size:13px;color:var(--muted);}
.price-incl-note{font-size:13px;color:var(--navy);font-weight:600;margin-bottom:12px;padding:8px 12px;background:var(--blue-pale);border-radius:var(--rs);}
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
.hp{background:var(--white);}
.hp-nav{background:var(--navy);position:sticky;top:0;z-index:100;border-bottom:1px solid rgba(255,255,255,0.08);overflow:visible;}
.hp-nav-inner{max-width:1100px;margin:0 auto;padding:0 20px;display:flex;align-items:center;justify-content:space-between;height:64px;}
.hp-nav-links{display:flex;align-items:center;gap:22px;list-style:none;}
.hp-nav-links a{color:rgba(255,255,255,0.65);text-decoration:none;font-size:13px;font-weight:500;transition:color .2s;}
.hp-nav-links a:hover{color:#fff;}
.hp-nav-links button{background:none;border:none;cursor:pointer;color:rgba(255,255,255,0.65);font-size:13px;font-weight:500;font-family:'Barlow',sans-serif;transition:color .2s;padding:0;}
.hp-nav-links button:hover{color:#fff;}
.hp-nav-cta{background:var(--blue-light);color:#fff!important;padding:7px 16px;border-radius:6px;font-weight:700!important;cursor:pointer;border:none;font-family:'Barlow',sans-serif;font-size:13px;}
.hp-nav-cta:hover{background:#1a9fd4;}
.hp-hero{background:var(--navy);padding:72px 20px 0;position:relative;overflow:hidden;}
.hp-hero::before{content:'';position:absolute;right:-80px;top:-80px;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(42,170,226,0.12) 0%,transparent 70%);pointer-events:none;}
.hp-hero-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:end;position:relative;z-index:1;}
.hp-badge{display:inline-flex;align-items:center;gap:7px;background:rgba(42,170,226,0.15);border:1px solid rgba(42,170,226,0.3);color:var(--blue-light);font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:5px 13px;border-radius:20px;margin-bottom:18px;}
.hp-h1{font-family:'Barlow Condensed',sans-serif;font-weight:900;font-size:clamp(38px,5.5vw,64px);color:#fff;line-height:1.0;letter-spacing:-0.5px;margin-bottom:18px;}
.hp-h1 span{color:var(--blue-light);}
.hp-sub{color:rgba(255,255,255,0.6);font-size:17px;font-weight:300;margin-bottom:28px;line-height:1.65;max-width:480px;}
.hp-ctas{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:36px;}
.hp-btn-p{display:inline-flex;align-items:center;gap:7px;background:var(--blue-light);color:#fff;padding:13px 26px;border-radius:8px;font-size:15px;font-weight:700;text-decoration:none;border:none;cursor:pointer;font-family:'Barlow',sans-serif;transition:all .2s;}
.hp-btn-p:hover{background:#1a9fd4;transform:translateY(-1px);box-shadow:0 6px 20px rgba(42,170,226,0.3);}
.hp-btn-s{display:inline-flex;align-items:center;gap:7px;background:transparent;color:rgba(255,255,255,0.75);padding:13px 26px;border-radius:8px;font-size:15px;font-weight:600;text-decoration:none;border:1px solid rgba(255,255,255,0.2);transition:all .2s;cursor:pointer;font-family:'Barlow',sans-serif;}
.hp-btn-s:hover{border-color:rgba(255,255,255,0.5);color:#fff;}
.hp-stats{display:flex;gap:28px;border-top:1px solid rgba(255,255,255,0.1);padding-top:24px;}
.hp-stat-num{font-family:'Barlow Condensed',sans-serif;font-size:32px;font-weight:800;color:#fff;line-height:1;}
.hp-stat-num em{color:var(--blue-light);font-style:normal;}
.hp-stat-lbl{font-size:12px;color:rgba(255,255,255,0.45);margin-top:2px;}
.hp-card{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:16px;padding:26px;}
.hp-card-title{font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:700;color:rgba(255,255,255,0.35);letter-spacing:2px;text-transform:uppercase;margin-bottom:14px;}
.hp-tl{display:flex;flex-direction:column;gap:11px;}
.hp-tl-item{display:flex;align-items:center;gap:11px;}
.hp-tl-dot{width:9px;height:9px;border-radius:50%;flex-shrink:0;}
.hp-tl-dot.done{background:var(--green);}
.hp-tl-dot.active{background:var(--blue-light);box-shadow:0 0 0 3px rgba(42,170,226,0.2);}
.hp-tl-dot.future{background:rgba(255,255,255,0.18);}
.hp-tl-text{font-size:13px;color:rgba(255,255,255,0.8);}
.hp-tl-text strong{color:#fff;}
.hp-tl-badge{margin-left:auto;font-size:10px;font-weight:700;padding:2px 8px;border-radius:20px;white-space:nowrap;}
.hp-tl-badge.open{background:rgba(42,170,226,0.2);color:var(--blue-light);}
.hp-tl-badge.closed{background:rgba(255,255,255,0.08);color:rgba(255,255,255,0.5);}
.hp-eb{margin-top:18px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.08);}
.hp-eb-lbl{font-size:11px;color:rgba(255,255,255,0.55);margin-bottom:3px;}
.hp-eb-price{font-family:'Barlow Condensed',sans-serif;font-size:30px;font-weight:800;color:#fff;}
.hp-eb-sub{font-size:11px;color:rgba(255,255,255,0.55);}
.hp-section{padding:72px 20px;}
.hp-si{max-width:1100px;margin:0 auto;}
.hp-slbl{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--blue);margin-bottom:10px;}
.hp-stitle{font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:clamp(28px,4vw,44px);color:var(--navy);line-height:1.1;margin-bottom:14px;}
.hp-ssub{font-size:16px;color:var(--muted);line-height:1.7;max-width:580px;}
.hp-loting{background:var(--navy);padding:60px 20px;}
.hp-l-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin:28px 0;}
.hp-l-card{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:20px 16px;text-align:center;}
.hp-l-num{font-family:'Barlow Condensed',sans-serif;font-size:40px;font-weight:900;line-height:1;margin-bottom:5px;}
.hp-l-lbl{font-size:13px;color:rgba(255,255,255,0.65);line-height:1.4;}
.hp-l-num.w{color:#fff;}.hp-l-num.r{color:#ff8080;}.hp-l-num.b{color:var(--blue-light);}.hp-l-num.g{color:#60e0a0;}
.hp-l-insight{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:20px 24px;display:flex;gap:14px;}
.hp-l-insight p{font-size:14px;color:rgba(255,255,255,0.65);line-height:1.65;}
.hp-l-insight p strong{color:#fff;}
.hp-act-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:36px;}
.hp-act-card{background:var(--white);border-radius:10px;padding:24px;border:1px solid var(--border);transition:transform .2s,box-shadow .2s;}
.hp-act-card:hover{transform:translateY(-3px);box-shadow:0 10px 28px rgba(13,46,90,0.1);}
.hp-act-tag{display:inline-flex;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:2px 9px;border-radius:20px;margin-bottom:10px;}
.hp-act-tag.a{background:#e8f4fc;color:var(--blue);}.hp-act-tag.b{background:var(--green-l);color:var(--green);}.hp-act-tag.c{background:#fff3e8;color:#b06010;}
.hp-act-title{font-family:'Barlow Condensed',sans-serif;font-size:18px;font-weight:700;color:var(--navy);margin-bottom:6px;line-height:1.2;}
.hp-act-desc{font-size:13px;color:var(--muted);line-height:1.6;margin-bottom:10px;}
.hp-act-tags{display:flex;flex-wrap:wrap;gap:4px;}
.hp-act-tag-sm{font-size:11px;background:var(--off);border:1px solid var(--border-l);border-radius:20px;padding:2px 8px;color:var(--muted);}
.hp-why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:36px;}
.hp-why-card{padding:24px;border-radius:10px;background:var(--white);border:1px solid var(--border);}
.hp-why-icon{font-size:28px;margin-bottom:10px;display:block;}
.hp-why-title{font-family:'Barlow Condensed',sans-serif;font-size:18px;font-weight:700;color:var(--navy);margin-bottom:6px;}
.hp-why-text{font-size:13px;color:var(--muted);line-height:1.65;}
.hp-cases-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:36px;}
.hp-case-card{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:24px;}
.hp-case-sector{display:inline-flex;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:2px 9px;border-radius:20px;background:rgba(42,170,226,0.15);color:var(--blue-light);margin-bottom:12px;}
.hp-case-title{font-family:'Barlow Condensed',sans-serif;font-size:19px;font-weight:700;color:#fff;margin-bottom:8px;line-height:1.2;}
.hp-case-desc{font-size:13px;color:rgba(255,255,255,0.55);line-height:1.6;margin-bottom:12px;}
.hp-case-act{font-family:'Barlow Condensed',sans-serif;font-size:16px;font-weight:800;color:var(--blue-light);}
.hp-team-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:36px;}
.hp-team-card{background:var(--white);border-radius:10px;padding:24px;border:1px solid var(--border);text-align:center;}
.hp-avatar{width:72px;height:72px;border-radius:50%;margin:0 auto 14px;display:flex;align-items:center;justify-content:center;font-family:'Barlow Condensed',sans-serif;font-size:24px;font-weight:800;color:#fff;}
.hp-av-d{background:linear-gradient(135deg,var(--navy),var(--blue));}
.hp-av-e{background:linear-gradient(135deg,var(--blue),var(--blue-light));}
.hp-av-r{background:linear-gradient(135deg,#0a2040,var(--navy));}
.hp-t-name{font-family:'Barlow Condensed',sans-serif;font-size:20px;font-weight:700;color:var(--navy);margin-bottom:3px;}
.hp-t-role{font-size:12px;color:var(--blue);font-weight:600;margin-bottom:8px;text-transform:uppercase;letter-spacing:.5px;}
.hp-t-bio{font-size:13px;color:var(--muted);line-height:1.6;}
.hp-faq-list{margin-top:36px;display:flex;flex-direction:column;gap:10px;}
.hp-faq-item{background:var(--white);border:1px solid var(--border-l);border-radius:8px;overflow:hidden;}
.hp-faq-q{padding:16px 22px;font-size:14px;font-weight:600;color:var(--navy);cursor:pointer;display:flex;justify-content:space-between;align-items:center;user-select:none;}
.hp-faq-q:hover{background:var(--off);}
.hp-faq-arr{font-size:18px;color:var(--blue);transition:transform .25s;flex-shrink:0;}
.hp-faq-item.open .hp-faq-arr{transform:rotate(45deg);}
.hp-faq-a{padding:0 22px;max-height:0;overflow:hidden;transition:max-height .3s ease,padding .3s ease;}
.hp-faq-item.open .hp-faq-a{max-height:200px;padding:0 22px 16px;}
.hp-faq-a p{font-size:13px;color:var(--muted);line-height:1.7;}
.hp-cta-section{background:linear-gradient(135deg,var(--navy) 0%,#1a4a7a 100%);padding:88px 20px;text-align:center;}
.hp-cta-title{font-family:'Barlow Condensed',sans-serif;font-size:clamp(32px,5vw,52px);font-weight:900;color:#fff;margin-bottom:14px;line-height:1.05;}
.hp-cta-title span{color:var(--blue-light);}
.hp-cta-sub{font-size:16px;color:rgba(255,255,255,0.55);margin-bottom:32px;line-height:1.65;}
.hp-cta-note{margin-top:14px;font-size:12px;color:rgba(255,255,255,0.5);}
.hp-footer{background:#070d18;padding:48px 20px 22px;}
.hp-ft{max-width:1100px;margin:0 auto;}
.hp-ft-top{display:grid;grid-template-columns:1.5fr 1fr 1fr;gap:40px;margin-bottom:36px;}
.hp-ft-desc{font-size:13px;color:rgba(255,255,255,0.5);line-height:1.7;margin-top:10px;}
.hp-ft-h{font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,0.4);margin-bottom:12px;}
.hp-ft-links{list-style:none;display:flex;flex-direction:column;gap:7px;}
.hp-ft-links a,.hp-ft-links button{font-size:13px;color:rgba(255,255,255,0.4);text-decoration:none;transition:color .2s;background:none;border:none;cursor:pointer;font-family:'Barlow',sans-serif;text-align:left;padding:0;}
.hp-ft-links a:hover,.hp-ft-links button:hover{color:#fff;}
.hp-ft-bottom{border-top:1px solid rgba(255,255,255,0.05);padding-top:16px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;}
.hp-ft-copy{font-size:12px;color:rgba(255,255,255,0.18);}
.hp-ft-legal{display:flex;gap:16px;}
.hp-ft-legal a{font-size:12px;color:rgba(255,255,255,0.18);text-decoration:none;}
.hp-ft-legal a:hover{color:rgba(255,255,255,0.5);}
.lp-page{max-width:860px;margin:0 auto;padding:2rem 0 4rem;}
.lp-hero{padding-bottom:1.5rem;border-bottom:1px solid var(--border-l);margin-bottom:2rem;}
.lp-overline{font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--blue);margin-bottom:0.5rem;}
.lp-h1{font-family:'Barlow Condensed',sans-serif;font-size:28px;font-weight:700;color:var(--navy);margin-bottom:0.75rem;line-height:1.2;}
.lp-intro{font-size:15px;color:var(--muted);line-height:1.7;max-width:640px;}
.lp-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;margin-bottom:2rem;}
.lp-stat{background:var(--off);border-radius:var(--rs);padding:1rem;}
.lp-stat-label{font-size:12px;color:var(--muted);margin-bottom:4px;}
.lp-stat-value{font-family:'Barlow Condensed',sans-serif;font-size:22px;font-weight:700;color:var(--navy);}
.lp-stat-sub{font-size:12px;color:var(--muted);margin-top:2px;}
.lp-infobox{background:var(--blue-pale);border:1px solid var(--blue-pale2);border-radius:var(--rs);padding:0.875rem 1.1rem;margin-bottom:2rem;font-size:13px;color:var(--blue);line-height:1.6;display:flex;gap:10px;align-items:flex-start;}
.lp-section-title{font-size:16px;font-weight:600;color:var(--navy);margin-bottom:1rem;padding-bottom:0.5rem;border-bottom:1px solid var(--border-l);}
.lp-card{background:var(--white);border:1px solid var(--border-l);border-radius:var(--r);padding:1rem 1.25rem;margin-bottom:10px;}
.lp-card-top{display:flex;gap:12px;align-items:flex-start;flex-wrap:wrap;}
.lp-card-left{flex:1;min-width:200px;}
.lp-card-header{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px;}
.lp-card-title{font-family:'Barlow Condensed',sans-serif;font-size:16px;font-weight:700;color:var(--navy);}
.lp-badge-green{font-size:11px;padding:2px 8px;border-radius:99px;background:var(--green-l);color:var(--green);font-weight:600;}
.lp-badge-blue{font-size:11px;padding:2px 8px;border-radius:99px;background:var(--blue-pale);color:var(--blue);font-weight:600;}
.lp-card-meta{font-size:13px;color:var(--muted);}
.lp-card-notitie{font-size:12px;color:var(--muted);margin-top:6px;font-style:italic;}
.lp-card-right{text-align:right;min-width:120px;flex-shrink:0;}
.lp-budget{font-family:'Barlow Condensed',sans-serif;font-size:20px;font-weight:700;color:var(--navy);}
.lp-budget-label{font-size:11px;color:var(--muted);}
.lp-guaranteed{font-size:12px;color:var(--muted);margin-top:2px;}
.lp-kans-wrap{margin-top:0.875rem;padding-top:0.875rem;border-top:1px solid var(--border-l);}
.lp-kans-labels{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px;flex-wrap:wrap;gap:4px;}
.lp-kans-title{font-size:12px;color:var(--muted);}
.lp-kans-numbers{font-size:12px;color:var(--muted);}
.lp-bar-track{background:var(--off);border-radius:99px;height:8px;overflow:hidden;}
.lp-bar-fill{height:8px;border-radius:99px;}
.lp-kans-detail{display:flex;gap:1.5rem;margin-top:8px;flex-wrap:wrap;}
.lp-kans-item{font-size:12px;color:var(--muted);display:flex;align-items:center;gap:5px;}
.lp-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;display:inline-block;}
.lp-source{font-size:11px;color:var(--muted);margin-top:8px;}
.lp-source a{color:var(--muted);text-decoration:none;}
.lp-source a:hover{color:var(--navy);}
.lp-komend{border:1px dashed var(--border);border-radius:var(--r);padding:1rem 1.25rem;margin-bottom:10px;display:flex;align-items:flex-start;gap:10px;}
.lp-komend-text{font-size:14px;color:var(--muted);line-height:1.6;}
.lp-divider{border:none;border-top:1px solid var(--border-l);margin:1.5rem 0;}
.lp-cta{background:var(--blue-pale);border-radius:var(--r);padding:1.5rem;display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap;margin-top:2.5rem;}
.lp-cta-h{font-family:'Barlow Condensed',sans-serif;font-size:18px;font-weight:700;color:var(--navy);margin-bottom:4px;}
.lp-cta-p{font-size:13px;color:var(--muted);}
@media(max-width:900px){
  .hp-act-grid,.hp-why-grid,.hp-cases-grid,.hp-team-grid{grid-template-columns:repeat(2,1fr);}
  .hp-l-grid{grid-template-columns:repeat(2,1fr);}
  .hp-hero-inner{grid-template-columns:1fr;}
  .hp-card{display:none;}
}
@media(max-width:640px){
  .hp-nav-links{display:none;}
  .hp-nav-inner{justify-content:space-between;}
  .hp-h1{font-size:34px;}.hp-sub{font-size:15px;}
  .hp-ctas{flex-direction:column;align-items:flex-start;}
  .hp-btn-p,.hp-btn-s{width:100%;justify-content:center;padding:13px 20px;}
  .hp-stats{gap:12px;flex-wrap:wrap;}.hp-stat-num{font-size:26px;}
  .hp-hero{padding:48px 16px 0;}.hp-section{padding:48px 16px;}.hp-loting{padding:48px 16px;}.hp-cta-section{padding:56px 16px;}
  .hp-act-grid,.hp-why-grid,.hp-cases-grid,.hp-team-grid{grid-template-columns:1fr;gap:14px;}
  .hp-l-grid{grid-template-columns:repeat(2,1fr);gap:10px;}.hp-l-num{font-size:30px;}
  .hp-stitle{font-size:26px;}.hp-cta-title{font-size:28px;}
  .hp-ft-top{grid-template-columns:1fr;gap:28px;}
  .hp-ft-bottom{flex-direction:column;align-items:flex-start;gap:8px;}
  .hp-faq-q{font-size:13px;padding:14px 16px;}
  .hp-faq-a{padding:0 16px;}.hp-faq-item.open .hp-faq-a{padding:0 16px 14px;}
  .hp-l-insight{flex-direction:column;gap:8px;}
  .lp-page{padding:1.5rem 0 3rem;}.lp-cta{flex-direction:column;align-items:flex-start;}
}
@media(max-width:580px){
  .card{padding:16px;}.pricing-body{padding:14px 16px;}
  .price-main{font-size:30px;}.est-amount{font-size:26px;}
  .btn{padding:10px 14px;font-size:13px;}
  .hdr-inner{padding:14px 14px 0;}.main{padding:14px 12px 48px;}
  .step-tab{font-size:9px;padding:7px 1px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  .steps-bar{overflow:hidden;}
  .form-row{flex-direction:column;}.form-row .form-group{min-width:unset;}
  .loting-detail-grid{grid-template-columns:1fr 1fr;}
  .success-header{padding:18px 14px 16px;margin:-16px -16px 16px;}
  .loting-stats{flex-direction:column;}.est-grid{grid-template-columns:1fr 1fr;}
  .act-card{padding:14px;}.pay-methods{gap:6px;flex-wrap:wrap;}.pay-btn{padding:8px 10px;font-size:12px;gap:4px;}
  .nocure-note{font-size:11px;}.next-step{gap:10px;}.q-label{font-size:13px;}.opt{padding:9px 12px;font-size:13px;}.card-title{font-size:17px;}
}
.hp-btn-p,.hp-btn-s,.hp-nav-cta{-webkit-appearance:none;-moz-appearance:none;}
.hp-faq-a{-webkit-transition:max-height .3s ease,padding .3s ease;transition:max-height .3s ease,padding .3s ease;}
input,select,textarea{-webkit-appearance:none;-moz-appearance:none;}
*{-webkit-tap-highlight-color:transparent;}
a,button{touch-action:manipulation;}
.hp-how{background:#e8f4fc;padding:60px 20px;}
.hp-how-grid{display:grid;grid-template-columns:1fr 44px 1fr 44px 1fr;gap:0;margin-top:32px;align-items:start;}
.hp-how-card{background:#fff;border:1px solid #d0e8f7;border-radius:10px;padding:24px 22px;}
.hp-how-num{width:34px;height:34px;border-radius:50%;background:#0d2e5a;color:#fff;font-family:'Barlow Condensed',sans-serif;font-size:15px;font-weight:700;display:flex;align-items:center;justify-content:center;margin-bottom:12px;}
.hp-how-title{font-family:'Barlow Condensed',sans-serif;font-size:18px;font-weight:700;color:#0d2e5a;margin-bottom:6px;}
.hp-how-text{font-size:13px;color:#5a6e82;line-height:1.65;}
.hp-how-arrow{text-align:center;font-size:22px;color:#2aaae2;padding-top:28px;}
@media(max-width:900px){.hp-how-grid{grid-template-columns:1fr;gap:12px;}.hp-how-arrow{display:none;}}
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

const LOTING={tijdvak:"Tijdvak 1 2026",totaalIngediend:3360,afgekeurdVoorLoting:23,inLoting:3337,inBehandeling:474,budget:11000000,kansRuw:Math.round((474/3360)*100),kansInLoting:Math.round((474/3337)*100)};

const LOTING_TIJDVAKKEN=[
  {jaar:2026,tijdvakken:[{titel:"Tijdvak 1 — april / mei 2026",periode:"7 apr – 4 mei 2026",lotingsdatum:"8 mei 2026",budget:"€ 11 mln",gegarandeerd:474,totaal:3337,url:"https://www.uitvoeringvanbeleidszw.nl/actueel/nieuws/2026/05/08/uitkomst-loting-slim-mkb-tijdvak-1-in-2026"}],komend:[{titel:"Tijdvak 2 — aug / sep 2026",info:"Aanvragen van 10 aug t/m 7 sep 2026. Lotingsuitslag verwacht begin oktober 2026."},{titel:"Samenwerking — jun / jul 2026",info:"Aanvragen van 8 jun t/m 6 jul 2026. Vanaf 2026 ook via loting (nieuw beleid)."}]},
  {jaar:2025,tijdvakken:[{titel:"Tijdvak 2 — september 2025",periode:"1 sep – 30 sep 2025",lotingsdatum:"3 okt 2025",budget:"€ 17,5 mln",gegarandeerd:758,totaal:3270,url:"https://www.uitvoeringvanbeleidszw.nl/actueel/nieuws/2025/10/03/uitkomst-loting-slim-mkb-september-2025"},{titel:"Tijdvak 1 — maart 2025",periode:"3 mrt – 31 mrt 2025",lotingsdatum:"11 apr 2025",budget:"€ 12,5 mln",gegarandeerd:557,totaal:2711,url:"https://www.uitvoeringvanbeleidszw.nl/actueel/nieuws/2025/04/11/uitkomst-loting-slim-mkb-maart-2025"}],komend:[]},
  {jaar:2024,tijdvakken:[{titel:"Tijdvak 2 — september 2024",periode:"2 sep – 30 sep 2024",lotingsdatum:"10 okt 2024",budget:"€ 16,1 mln",gegarandeerd:689,totaal:3152,url:"https://www.uitvoeringvanbeleidszw.nl/actueel/nieuws/2024/10/10/uitkomst-loting-slim-mkb-september-2024",notitie:"Plafond verhoogd van € 13,5 mln naar € 16,1 mln op 26 juni 2024."},{titel:"Tijdvak 1 — maart 2024",periode:"1 mrt – 29 mrt 2024",lotingsdatum:"16 apr 2024",budget:"€ 15 mln",gegarandeerd:642,totaal:2838,url:"https://www.uitvoeringvanbeleidszw.nl/actueel/nieuws/2024/04/16/uitkomst-loting-aanvraagtijdvak-maart-2024-slim-regeling",notitie:"Door technische problemen zijn voor 8 aanvragers KvK-nummers (laatste 3 cijfers) gebruikt i.p.v. projectnummers."}],komend:[]},
];

function fmt(n){return new Intl.NumberFormat("nl-NL",{style:"currency",currency:"EUR",maximumFractionDigits:0}).format(n);}
function fmt2(n){return new Intl.NumberFormat("nl-NL",{style:"currency",currency:"EUR",minimumFractionDigits:2,maximumFractionDigits:2}).format(n);}
function calcSubsidy(inv,agri,medewerkers){
  // Vanaf 2025: klein MKB (<50 mw) = 60%, middelgroot (50-250 mw) = 50%
  const mwStr=medewerkers||"";
  const isKlein=mwStr===""||["1–5 medewerkers","6–10 medewerkers","11–25 medewerkers","26–50 medewerkers"].includes(mwStr);
  const pct=isKlein?0.60:0.50;
  return Math.min(inv*pct,agri?20000:24999);
}
function isEarlyBird(){const now=new Date();return(now>=new Date(2026,4,5)&&now<=new Date(2026,6,10))||(now>=new Date(2026,8,8)&&now<=new Date(2027,0,6));}
function nextDeadline(){
  const now=new Date();
  const opts=[{label:"Tijdvak 1 2026",open:new Date(2026,3,7),close:new Date(2026,4,4)},{label:"Tijdvak 2 2026",open:new Date(2026,7,10),close:new Date(2026,8,7)},{label:"Tijdvak 1 2027",open:new Date(2027,3,6),close:new Date(2027,4,4)}];
  return opts.find(d=>now<d.close)||opts[opts.length-1];
}

const STEP_LABELS=["Quickscan","Resultaat","Profiel","Betaling","Analyse"];
const PHASE_IDX={home:-1,loting:-1,scan:0,ko:0,result:1,profile:2,payment:3,success:4};

const PAGE_SCHEMA={
  projecten:{
    "@context":"https://schema.org",
    "@type":"Dataset",
    "name":"SLIM Subsidie Projecten Database",
    "description":"Doorzoekbare database van 6.208 gehonoreerde SLIM-subsidie projecten (2020–2024), gebaseerd op openbare publicatielijsten van het Ministerie van SZW.",
    "url":"https://www.slimsubsidieadvies.nl/projecten",
    "creator":{"@type":"Organization","name":"SLIM Subsidie Advies","url":"https://www.slimsubsidieadvies.nl"},
    "publisher":{"@type":"Organization","name":"Uitvoering van Beleid — Ministerie van SZW","url":"https://www.uitvoeringvanbeleidszw.nl"},
    "keywords":["SLIM subsidie","MKB subsidie","leren en ontwikkelen","scholing personeel","RVO subsidie"],
    "temporalCoverage":"2020/2024",
    "spatialCoverage":"NL",
    "license":"https://www.uitvoeringvanbeleidszw.nl/subsidies-en-regelingen/bedrijven/slim/verleende-aavragen",
  },
  loting:{
    "@context":"https://schema.org",
    "@type":"WebPage",
    "name":"SLIM Subsidie Lotingsuitslagen 2024–2026",
    "description":"Overzicht van alle SLIM-subsidie lotingsuitslagen van 2024 tot 2026. Per tijdvak: subsidieplafond, aantal aanvragen, lotingskansen en directe kans op subsidie.",
    "url":"https://www.slimsubsidieadvies.nl/lotingsuitslagen",
    "publisher":{"@type":"Organization","name":"SLIM Subsidie Advies","url":"https://www.slimsubsidieadvies.nl"},
    "mainEntity":{
      "@type":"ItemList",
      "name":"SLIM Subsidie Lotingsuitslagen per tijdvak",
      "numberOfItems":5,
      "itemListElement":[
        {"@type":"ListItem","position":1,"name":"Tijdvak 1 2026 — april/mei 2026","description":"3.337 aanvragen in loting, 474 in behandeling, budget €11 mln"},
        {"@type":"ListItem","position":2,"name":"Tijdvak 2 2025 — september 2025","description":"3.270 aanvragen in loting, 758 in behandeling, budget €17,5 mln"},
        {"@type":"ListItem","position":3,"name":"Tijdvak 1 2025 — maart 2025","description":"2.711 aanvragen in loting, 557 in behandeling, budget €12,5 mln"},
        {"@type":"ListItem","position":4,"name":"Tijdvak 2 2024 — september 2024","description":"3.152 aanvragen in loting, 689 in behandeling, budget €16,1 mln"},
        {"@type":"ListItem","position":5,"name":"Tijdvak 1 2024 — maart 2024","description":"2.838 aanvragen in loting, 642 in behandeling, budget €15 mln"},
      ],
    },
  },
};

const PAGE_META={
  home:{
    title:"SLIM Subsidie Aanvragen | Tot €24.999 voor MKB | SLIM Subsidie Advies",
    desc:"Kom jij in aanmerking voor SLIM-subsidie? Tot €24.999 subsidie voor leren en ontwikkelen in uw MKB-bedrijf. Gratis quickscan, no cure no pay. Doe de check in 2 minuten.",
    canonical:"https://www.slimsubsidieadvies.nl/",
    ogTitle:"SLIM Subsidie Aanvragen | Tot €24.999 voor MKB",
    ogDesc:"Kom jij in aanmerking voor SLIM-subsidie? Tot €24.999 subsidie voor leren en ontwikkelen. Gratis quickscan, no cure no pay.",
  },
  scan:{
    title:"Gratis SLIM Subsidie Quickscan | SLIM Subsidie Advies",
    desc:"Doe de gratis quickscan en weet in 2 minuten of uw bedrijf in aanmerking komt voor SLIM-subsidie. Tot €24.999 voor MKB-ondernemers met personeel in loondienst.",
    canonical:"https://www.slimsubsidieadvies.nl/scan",
    ogTitle:"Gratis SLIM Subsidie Quickscan",
    ogDesc:"Weet in 2 minuten of jouw bedrijf in aanmerking komt voor SLIM-subsidie. Tot €24.999 voor MKB met personeel.",
  },
  loting:{
    title:"SLIM Subsidie Lotingsuitslagen 2024–2026 | SLIM Subsidie Advies",
    desc:"Bekijk alle SLIM-subsidie lotingsuitslagen van 2024 tot 2026. Per tijdvak: subsidieplafond, aantal aanvragen, lotingskansen en directe kans op subsidie.",
    canonical:"https://www.slimsubsidieadvies.nl/lotingsuitslagen",
    ogTitle:"SLIM Subsidie Lotingsuitslagen 2024–2026",
    ogDesc:"Bekijk alle SLIM-subsidie lotingsuitslagen. Per tijdvak: budget, aantal aanvragen en lotingskansen.",
  },
  projecten:{
    title:"SLIM Subsidie Projecten Database | 6.208 Gehonoreerde Projecten",
    desc:"Doorzoek 6.208 gehonoreerde SLIM-subsidie projecten. Filter op categorie, tijdvak en locatie. Laat je inspireren door succesvolle MKB-aanvragen.",
    canonical:"https://www.slimsubsidieadvies.nl/projecten",
    ogTitle:"SLIM Subsidie Projecten Database | 6.208 Projecten",
    ogDesc:"Doorzoek 6.208 gehonoreerde SLIM-subsidie projecten. Filter op categorie en tijdvak. Laat je inspireren.",
  },
};

export default function App(){
  // ── FIX 1: detecteer Mollie redirect ──
  const [phase,setPhase]=useState(()=>{
    if(typeof window!=="undefined"){
      const params=new URLSearchParams(window.location.search);
      if(params.get("betaling")==="geslaagd") return "success";
      if(window.location.pathname==="/projecten") return "projecten";
      if(window.location.pathname==="/lotingsuitslagen") return "loting";
      if(window.location.pathname==="/scan") return "scan";
      if(window.location.pathname==="/resultaat") return "result";
      if(window.location.pathname==="/profiel") return "profile";
      if(window.location.pathname==="/betaling") return "payment";
      if(window.location.pathname==="/analyse") return "success";
    }
    return "home";
  });

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
  const [profile,setProfile]=useState({medewerkers:"",rechtsvorm:"",sector:"",provincie:""});
  const [selectedActs,setSelectedActs]=useState([]);

  const eb=isEarlyBird();
  const deadline=nextDeadline();
  const basePrice=250;
  const finalPrice=eb?basePrice*.8:basePrice;
  const finalPriceIncl=finalPrice*1.21;
  const isAgri=answers.agriculture==="yes";
  const invNum=parseFloat(investment.replace(",","."))||0;
  const subsidyEst=invNum>=8334?calcSubsidy(invNum,isAgri,profile.medewerkers):0;
  const allScanDone=QUESTIONS.every(q=>answers[q.id]!==undefined)&&invNum>=8334;
  const profileOk=profile.medewerkers&&profile.rechtsvorm&&profile.sector&&profile.provincie&&selectedActs.length>0&&contact.bedrijf;
  const progress=[10,25,45,68,100];
  const curStep=PHASE_IDX[phase]||0;
  const bedrijfsnaam=contact.bedrijf;

  // ── Herstel profiel na Mollie redirect ──
  useEffect(()=>{
    if(phase==="success"){
      const saved=sessionStorage.getItem("slimProfiel");
      if(saved){
        try{
          const p=JSON.parse(saved);
          if(p.contact)setContact(p.contact);
          if(p.profile)setProfile(p.profile);
          if(p.selectedActs)setSelectedActs(p.selectedActs);
          if(p.answers)setAnswers(p.answers);
          if(p.investment)setInvestment(p.investment);
          sessionStorage.removeItem("slimProfiel");
        }catch(e){console.error("Herstel profiel mislukt:",e);}
      }
    }
  },[]);

  useEffect(()=>{window.scrollTo({top:0,behavior:"smooth"});},[phase]);

  // ── Meta tags per pagina ──
  useEffect(()=>{
    const m=PAGE_META[phase]||PAGE_META.home;
    document.title=m.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content",m.desc);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href",m.canonical);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content",m.ogTitle||m.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content",m.ogDesc||m.desc);
    document.querySelector('meta[property="og:url"]')?.setAttribute("content",m.canonical);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute("content",m.ogTitle||m.title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute("content",m.ogDesc||m.desc);
    const schemaEl=document.getElementById("page-schema");
    if(schemaEl) schemaEl.textContent=PAGE_SCHEMA[phase]?JSON.stringify(PAGE_SCHEMA[phase]):"";
  },[phase]);

  // ── URL sync: /projecten ↔ phase, alles anders → / ──
  useEffect(()=>{
    const target=phase==="projecten"?"/projecten":phase==="loting"?"/lotingsuitslagen":phase==="scan"?"/scan":phase==="result"?"/resultaat":phase==="profile"?"/profiel":phase==="payment"?"/betaling":phase==="success"?"/analyse":"/";
    if(window.location.pathname!==target) window.history.pushState({},"",target);
  },[phase]);

  useEffect(()=>{
    function onPop(){const p=window.location.pathname;setPhase(p==="/projecten"?"projecten":p==="/lotingsuitslagen"?"loting":p==="/scan"?"scan":p==="/resultaat"?"result":p==="/profiel"?"profile":p==="/betaling"?"payment":p==="/analyse"?"success":"home");}
    window.addEventListener("popstate",onPop);
    return()=>window.removeEventListener("popstate",onPop);
  },[]);

  // ── FIX 2: start AI analyse automatisch na Mollie redirect ──
  // Wacht even zodat het sessionStorage-herstel (hierboven) eerst kan landen
  useEffect(()=>{
    if(phase==="success"&&!analysis&&!loadingAI){
      const timer=setTimeout(()=>generateAnalysis(),300);
      return()=>clearTimeout(timer);
    }
  },[phase]);

  function answer(id,v){
    const q=QUESTIONS.find(q=>q.id===id);
    setAnswers(p=>({...p,[id]:v}));
    if(q.ko&&v===q.ko){setKoMsg(q.koMsg);setTimeout(()=>setPhase("ko"),150);}
  }
  function toggleAct(id){setSelectedActs(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);}

  async function generateAnalysis(){
    setLoadingAI(true);setAnalysis("");
    const actNames=selectedActs.length>0?selectedActs.map(id=>ACTIVITEITEN.find(a=>a.id===id)?.title||id).join(" + "):"Nader te bepalen";
    try{
      const res=await fetch("/api/analyze",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-haiku-4-5-20251001",max_tokens:1400,
          messages:[{role:"user",content:`Je bent een expert SLIM-subsidieadviseur van SLIM Subsidie Advies. De ondernemer heeft zojuist betaald voor een persoonlijke diepteanalyse. Schrijf een waardevolle, professionele en bemoedigende analyse in het Nederlands (max 380 woorden, geen markdown, gebruik alinea's met witregel, spreek de ondernemer aan met "u"). Begin positief en bevestigend.

Bedrijfsprofiel:
- Bedrijf: ${bedrijfsnaam||"onbekend"}
- Bedrijfsgrootte: ${answers.size==="groot"?"Grootbedrijf landbouw/horeca/recreatie":"MKB"}
- Medewerkers: ${profile.medewerkers||"onbekend"}
- Rechtsvorm: ${profile.rechtsvorm||"onbekend"}
- Sector: ${profile.sector||"onbekend"}
- Provincie: ${profile.provincie||"onbekend"}
- Landbouwsector: ${isAgri?"Ja":"Nee"}
- Investering: ${fmt(invNum)}
- Indicatief subsidiebedrag: ${fmt(subsidyEst)}
- Gekozen activiteit(en): ${actNames}
- Tijdvak: ${deadline.label} (opening: ${deadline.open.toLocaleDateString("nl-NL")})

Actuele lotingscijfers tijdvak 1 2026 (bron: RVO, 8 mei 2026):
- 3.360 aanvragen ingediend in totaal
- 23 aanvragen afgekeurd VÓÓR de loting (fouten in aanvraag)
- 3.337 aanvragen meegenomen in de notariële loting
- 474 van de 3.337 aanvragen ingeloot (~14%)
- Budget: €11 miljoen

Bespreek in vier alinea's:
1. Positieve opening + kansrijkheid gelet op sector, omvang en activiteitenkeuze
2. Of de gekozen activiteit(en) goed passen — eventueel een betere of aanvullende suggestie
3. Lotingsrisico realistisch geduid met de actuele cijfers
4. Twee concrete tips voor een sterke aanvraag + motiverende afsluiting`}]
        })
      });
      const data=await res.json();
      setAnalysis(data.content?.map(b=>b.text||"").join("")||"Analyse kon niet worden geladen.");
    }catch(e){setAnalysis("Er is een fout opgetreden. Uw adviseur neemt spoedig contact op.");}
    setLoadingAI(false);
  }

  async function submitPayment(){
    if(!contact.naam||!contact.email){alert("Vul uw naam en e-mailadres in.");return;}
    setProcessing(true);
    try{
      // Sla profiel op zodat we het kunnen herstellen na Mollie redirect
      sessionStorage.setItem("slimProfiel",JSON.stringify({
        contact,profile,selectedActs,answers,investment,subsidyEst
      }));
      const res=await fetch("/api/create-payment",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({naam:contact.naam,bedrijf:contact.bedrijf,email:contact.email,telefoon:contact.telefoon,methode:payMethod,activiteiten:selectedActs,subsidyEst}),
      });
      const data=await res.json();
      if(data.checkoutUrl){window.location.href=data.checkoutUrl;}
      else{alert(data.error||"Er ging iets mis.");setProcessing(false);}
    }catch(err){alert("Er ging iets mis.");setProcessing(false);}
  }

  function LotingBox({compact=false}){
    const barPct=Math.round((LOTING.inBehandeling/LOTING.totaalIngediend)*100);
    if(compact){return(
      <div className="loting-box">
        <div className="loting-box-title">⚠️ Lotingscijfers {LOTING.tijdvak} — ken de realiteit</div>
        <div className="loting-stats">
          <div className="loting-stat"><div className="loting-stat-num orange">{LOTING.inLoting.toLocaleString("nl-NL")}</div><div className="loting-stat-label">in loting (van 3.360 ingediend)</div></div>
          <div className="loting-stat"><div className="loting-stat-num red">{LOTING.afgekeurdVoorLoting}</div><div className="loting-stat-label">afgekeurd vóór loting</div></div>
          <div className="loting-stat"><div className="loting-stat-num green">{LOTING.inBehandeling}</div><div className="loting-stat-label">in behandeling</div></div>
        </div>
        <div className="loting-kans">
          <div className="loting-kans-pct">~{LOTING.kansRuw}%</div>
          <div className="loting-kans-text"><strong>Effectieve slaagkans.</strong> Van de {LOTING.totaalIngediend.toLocaleString("nl-NL")} indieners werden slechts {LOTING.inBehandeling} meegenomen. Bovendien vielen al <strong>{LOTING.afgekeurdVoorLoting} aanvragen vóór de loting af</strong> door fouten — volledig vermijdbaar.</div>
        </div>
        <div className="loting-cta">💡 <strong>Conclusie:</strong> een correcte, complete aanvraag is de eerste stap. Wij zorgen voor stap één.</div>
      </div>
    );}
    return(
      <div className="loting-detail">
        <div className="loting-detail-title">📊 Lotingscijfers {LOTING.tijdvak} <span style={{fontSize:12,fontWeight:400,opacity:.6}}>(bron: RVO, 8 mei 2026)</span></div>
        <div className="loting-detail-grid">
          <div className="loting-detail-item"><div className="loting-detail-num">{LOTING.totaalIngediend.toLocaleString("nl-NL")}</div><div className="loting-detail-label">aanvragen ingediend</div></div>
          <div className="loting-detail-item"><div className="loting-detail-num">{LOTING.inLoting.toLocaleString("nl-NL")}</div><div className="loting-detail-label">in notariële loting</div></div>
          <div className="loting-detail-item"><div className="loting-detail-num bad">{LOTING.afgekeurdVoorLoting}</div><div className="loting-detail-label">afgekeurd vóór loting</div></div>
          <div className="loting-detail-item"><div className="loting-detail-num accent">{LOTING.inBehandeling}</div><div className="loting-detail-label">in behandeling genomen</div></div>
          <div className="loting-detail-item"><div className="loting-detail-num warn">~{LOTING.kansRuw}%</div><div className="loting-detail-label">effectieve slaagkans</div></div>
        </div>
        <div className="loting-bar-wrap">
          <div className="loting-bar-label"><span>In behandeling ({LOTING.inBehandeling})</span><span>Niet in behandeling ({LOTING.totaalIngediend-LOTING.inBehandeling})</span></div>
          <div className="loting-bar-track"><div className="loting-bar-fill" style={{width:`${barPct}%`}}/></div>
        </div>
        <div className="loting-insight" style={{marginTop:12}}><strong>Let op:</strong> {LOTING.afgekeurdVoorLoting} aanvragen werden vóór de loting afgekeurd door fouten. Dit is volledig vermijdbaar met SLIM Subsidie Advies.</div>
      </div>
    );
  }

  function LotingsuitslagenPage(){
    const allTv=LOTING_TIJDVAKKEN.flatMap(j=>j.tijdvakken);
    const gemAanvragen=Math.round(allTv.reduce((s,t)=>s+t.totaal,0)/allTv.length);
    return(
      <div className="lp-page">
        <button className="btn btn-ghost" onClick={()=>setPhase("home")} style={{marginBottom:"1.5rem"}}>← Terug naar home</button>
        <div className="lp-hero">
          <p className="lp-overline">Overzicht lotingsuitslagen</p>
          <h1 className="lp-h1">SLIM-subsidie lotingsuitslagen 2024 – 2026</h1>
          <p className="lp-intro">Per tijdvak vind je het subsidieplafond, het totale aantal aanvragen dat heeft meegeloot, hoeveel aanvragen gegarandeerd worden beoordeeld, en wat dat betekent voor je kans.</p>
        </div>
        <div className="lp-stats">
          {[{label:"Tijdvakken gedocumenteerd",value:"5",sub:"2024 t/m tv1 2026"},{label:"Gem. aanvragen per tijdvak",value:gemAanvragen.toLocaleString("nl-NL"),sub:"mkb individueel"},{label:"Gem. directe kans",value:"~20%",sub:"gegarandeerde beoordeling"},{label:"Regeling loopt tot",value:"2029",sub:"verlengd dec 2024"}].map(s=>(
            <div key={s.label} className="lp-stat"><div className="lp-stat-label">{s.label}</div><div className="lp-stat-value">{s.value}</div><div className="lp-stat-sub">{s.sub}</div></div>
          ))}
        </div>
        <div className="lp-infobox"><span style={{flexShrink:0}}>ℹ️</span><span>Elk tijdvak was zwaar overvraagd. Gemiddeld deden ruim 3.000 bedrijven mee, terwijl slechts 15–25% direct wordt beoordeeld.</span></div>
        {LOTING_TIJDVAKKEN.map((jaar,ji)=>(
          <div key={jaar.jaar} style={{marginBottom:"2rem"}}>
            <h2 className="lp-section-title">{jaar.jaar}</h2>
            {jaar.tijdvakken.map(tv=>{
              const pct=((tv.gegarandeerd/tv.totaal)*100).toFixed(1);
              const barColor=parseFloat(pct)>=22?"var(--green)":parseFloat(pct)>=18?"var(--orange)":"var(--red)";
              const rest=tv.totaal-tv.gegarandeerd;
              return(
                <div key={tv.titel} className="lp-card">
                  <div className="lp-card-top">
                    <div className="lp-card-left">
                      <div className="lp-card-header"><span className="lp-card-title">{tv.titel}</span><span className="lp-badge-green">Uitslag bekend</span><span className="lp-badge-blue">mkb individueel</span></div>
                      <div className="lp-card-meta"><span style={{marginRight:"1rem"}}>📅 {tv.periode}</span><span>⚖️ Loting: {tv.lotingsdatum}</span></div>
                      {tv.notitie&&<p className="lp-card-notitie">{tv.notitie}</p>}
                    </div>
                    <div className="lp-card-right"><div className="lp-budget">{tv.budget}</div><div className="lp-budget-label">subsidieplafond</div><div className="lp-guaranteed">{tv.gegarandeerd.toLocaleString("nl-NL")} gegarandeerd</div></div>
                  </div>
                  <div className="lp-kans-wrap">
                    <div className="lp-kans-labels"><span className="lp-kans-title">Lotingskansen</span><span className="lp-kans-numbers"><strong style={{color:"var(--navy)"}}>{tv.gegarandeerd.toLocaleString("nl-NL")}</strong> van <strong style={{color:"var(--navy)"}}>{tv.totaal.toLocaleString("nl-NL")}</strong> · <strong style={{color:"var(--navy)"}}>{pct}%</strong> directe kans</span></div>
                    <div className="lp-bar-track"><div className="lp-bar-fill" style={{width:`${pct}%`,background:barColor}}/></div>
                    <div className="lp-kans-detail"><span className="lp-kans-item"><span className="lp-dot" style={{background:"var(--green)"}}/>{tv.gegarandeerd.toLocaleString("nl-NL")} direct beoordeeld</span><span className="lp-kans-item"><span className="lp-dot" style={{background:"var(--border)"}}/>{rest.toLocaleString("nl-NL")} afhankelijk van restbudget</span></div>
                    <p className="lp-source">Bron: <a href={tv.url} target="_blank" rel="noopener noreferrer">uitvoeringvanbeleidszw.nl ↗</a></p>
                  </div>
                </div>
              );
            })}
            {jaar.komend.map(k=><div key={k.titel} className="lp-komend"><span style={{fontSize:16,flexShrink:0,color:"var(--muted)"}}>🕐</span><p className="lp-komend-text"><strong style={{color:"var(--navy)"}}>{k.titel}</strong> · {k.info}</p></div>)}
            {ji<LOTING_TIJDVAKKEN.length-1&&<hr className="lp-divider"/>}
          </div>
        ))}
        <div className="lp-cta">
          <div><h3 className="lp-cta-h">Wil je weten of jouw aanvraag kans maakt?</h3><p className="lp-cta-p">Doe de gratis quickscan — binnen 2 minuten weet je of jouw bedrijf in aanmerking komt.</p></div>
          <a href="/scan" className="btn btn-primary" onClick={e=>{e.preventDefault();setPhase("scan");}}>Doe de quickscan →</a>
        </div>
      </div>
    );
  }

  return(
    <>
      <style>{css}</style>
      {phase==="projecten"&&<SlimDatabase onBack={()=>setPhase("home")}/>}
      {phase!=="projecten"&&<div className="app">

        {phase!=="home"&&phase!=="loting"&&(
          <header className="hdr">
            <div className="hdr-inner">
              <div className="logo" style={{cursor:"pointer"}} onClick={()=>setPhase("home")}>
                <span className="logo-slim">SLIM</span><span className="logo-sub">SUBSIDIE</span><span className="logo-adv">ADVIES</span>
              </div>
              <p className="hdr-title">Komt uw bedrijf in aanmerking voor <span>SLIM-subsidie</span>?</p>
              <p className="hdr-sub">Gratis quickscan · Bedrijfsprofiel · Betaling · Persoonlijke AI-analyse</p>
              <div className="prog-bar"><div className="prog-fill" style={{width:`${progress[Math.max(0,curStep)]}%`}}/></div>
            </div>
            <div className="steps-bar">{STEP_LABELS.map((l,i)=><div key={i} className={`step-tab ${i<curStep?"done":i===curStep?"active":""}`}>{l}</div>)}</div>
          </header>
        )}

        <main className="main">
          {phase==="loting"&&<LotingsuitslagenPage/>}

          {phase==="home"&&(
            <div className="hp">
              <nav className="hp-nav">
                <div className="hp-nav-inner">
                  <div className="logo" style={{cursor:"pointer"}} onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}>
                    <span className="logo-slim">SLIM</span><span className="logo-sub">SUBSIDIE</span><span className="logo-adv">ADVIES</span>
                  </div>
                  <ul className="hp-nav-links">
                    <li><a href="#slim">Wat is SLIM?</a></li><li><a href="#waarom">Waarom wij?</a></li><li><a href="#cases">Cases</a></li><li><a href="#team">Team</a></li><li><a href="#faq">FAQ</a></li>
                    <li><a href="/lotingsuitslagen" onClick={e=>{e.preventDefault();setPhase("loting");}}>Lotingsuitslagen</a></li>
                    <li><a href="/projecten" onClick={e=>{e.preventDefault();setPhase("projecten");}}>Projecten</a></li>
                    <li><a href="/scan" className="hp-nav-cta" onClick={e=>{e.preventDefault();setPhase("scan");}}>Gratis quickscan →</a></li>
                  </ul>
                </div>
              </nav>
              <div className="hp-hero">
                <div className="hp-hero-inner">
                  <div>
                    <div className="hp-badge"><span className="phase-dot"/>&nbsp;Gratis quickscan · Start vanaf €200 excl. btw · Retour bij inloting</div>
                    <h1 className="hp-h1">Laat geen<br/><span>€ 24.999</span><br/>subsidie liggen</h1>
                    <p className="hp-sub">Wij verzorgen de volledige SLIM subsidieaanvraag voor MKB ondernemers. Start met een gratis online quickscan en weet binnen 2 minuten of uw bedrijf in aanmerking komt.</p>
                    <div className="hp-ctas">
                      <a href="/scan" className="hp-btn-p" onClick={e=>{e.preventDefault();setPhase("scan");}}>Doe de gratis quickscan →</a>
                      <a href="#slim" className="hp-btn-s">Meer over SLIM-subsidie</a>
                    </div>
                    <div className="hp-stats">
                      <div><div className="hp-stat-num">€<em>24.999</em></div><div className="hp-stat-lbl">Maximum subsidie</div></div>
                      <div><div className="hp-stat-num">tot <em>60</em>%</div><div className="hp-stat-lbl">Vergoeding investering</div></div>
                      <div><div className="hp-stat-num">€<em>200</em></div><div className="hp-stat-lbl">Instap early bird (excl. btw)</div></div>
                    </div>
                  </div>
                  <div>
                    <div className="hp-card">
                      <div className="hp-card-title">Subsidiepercentages</div>
                      <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:16}}>
                        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(255,255,255,0.06)",borderRadius:10,padding:"12px 16px"}}>
                          <div style={{display:"flex",alignItems:"center",gap:10}}>
                            <span style={{fontSize:20}}>👤</span>
                            <div>
                              <div style={{fontSize:13,fontWeight:600,color:"#fff"}}>Klein bedrijf</div>
                              <div style={{fontSize:11,color:"rgba(255,255,255,0.4)"}}>tot 50 medewerkers</div>
                            </div>
                          </div>
                          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:28,fontWeight:800,color:"var(--blue-light)"}}>60%</div>
                        </div>
                        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(255,255,255,0.06)",borderRadius:10,padding:"12px 16px"}}>
                          <div style={{display:"flex",alignItems:"center",gap:10}}>
                            <span style={{fontSize:20}}>👥</span>
                            <div>
                              <div style={{fontSize:13,fontWeight:600,color:"#fff"}}>Middelgroot bedrijf</div>
                              <div style={{fontSize:11,color:"rgba(255,255,255,0.4)"}}>51 t/m 250 medewerkers</div>
                            </div>
                          </div>
                          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:28,fontWeight:800,color:"var(--blue-light)"}}>50%</div>
                        </div>
                        <div style={{fontSize:11,color:"rgba(255,255,255,0.55)",textAlign:"center",paddingTop:2}}>Maximaal subsidiebedrag: € 24.999 per aanvraag.</div>
                      </div>
                      <div className="hp-card-title" style={{marginTop:4}}>Aanvraagtijdvakken 2026</div>
                      <div className="hp-tl">
                        <div className="hp-tl-item"><div className="hp-tl-dot done"/><div className="hp-tl-text"><strong>Tijdvak 1</strong> — 7 april t/m 4 mei 2026</div><span className="hp-tl-badge closed">Gesloten</span></div>
                        <div className="hp-tl-item"><div className="hp-tl-dot active"/><div className="hp-tl-text"><strong>Tijdvak 2</strong> — 10 aug t/m 7 sep 2026</div><span className="hp-tl-badge open">Opent binnenkort</span></div>
                        <div className="hp-tl-item"><div className="hp-tl-dot future"/><div className="hp-tl-text"><strong>Tijdvak 1 2027</strong> — april 2027</div><span className="hp-tl-badge closed">Volgt</span></div>
                      </div>
                      <div className="hp-eb">
                        <div className="hp-eb-lbl">EARLY BIRD TIJDVAK 2 — t/m 10 juli 2026</div>
                        <div className="hp-eb-price">€ 200 <span style={{fontSize:14,fontWeight:400,color:"rgba(255,255,255,0.3)",textDecoration:"line-through"}}>€ 250</span></div>
                        <div className="hp-eb-sub">dieptecheck excl. btw · bespaar € 50</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hp-how">
                <div className="hp-si">
                  <div className="hp-slbl">In 3 stappen</div>
                  <h2 className="hp-stitle">Zo werkt het</h2>
                  <div className="hp-how-grid">
                    <div className="hp-how-card">
                      <div className="hp-how-num">1</div>
                      <div className="hp-how-title">Gratis quickscan</div>
                      <div className="hp-how-text">Controleer vrijblijvend in 2 minuten of uw onderneming in aanmerking komt. Geen verplichtingen.</div>
                    </div>
                    <div className="hp-how-arrow">→</div>
                    <div className="hp-how-card">
                      <div className="hp-how-num">2</div>
                      <div className="hp-how-title">Diepteanalyse & aanvraag</div>
                      <div className="hp-how-text">Voor €200 excl. btw in de early bird periode verzorgen wij de diepteanalyse en stellen wij de volledige aanvraag op. Na de early bird periode is dit €250 excl. btw. Niet ingeloot? Dan actualiseren wij uw aanvraag ieder nieuw tijdvak opnieuw binnen hetzelfde traject, totdat u wordt ingeloot.</div>
                    </div>
                    <div className="hp-how-arrow">→</div>
                    <div className="hp-how-card">
                      <div className="hp-how-num">3</div>
                      <div className="hp-how-title">Ingeloot? Volledige begeleiding</div>
                      <div className="hp-how-text">U ontvangt de kosten voor de dieptecheck retour. Voor een vaste fee van €2.500 excl. btw begeleiden wij u volledig, van inhoudelijke beoordeling en vragenbeantwoording tot review van het eindproduct.</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hp-loting">
                <div className="hp-si">
                  <div className="hp-slbl" style={{color:"var(--blue-light)"}}>Tijdvak 1 2026 — bron: RVO, 8 mei 2026</div>
                  <h2 className="hp-stitle" style={{color:"#fff"}}>Ken de realiteit van de loting</h2>
                  <p className="hp-ssub" style={{color:"rgba(255,255,255,0.5)"}}>De SLIM-subsidie is populair. Een foutloze aanvraag is uw eerste vereiste.</p>
                  <div className="hp-l-grid">
                    <div className="hp-l-card"><div className="hp-l-num w">3.360</div><div className="hp-l-lbl">aanvragen ingediend</div></div>
                    <div className="hp-l-card"><div className="hp-l-num r">23</div><div className="hp-l-lbl">vóór loting afgekeurd door fouten</div></div>
                    <div className="hp-l-card"><div className="hp-l-num b">474</div><div className="hp-l-lbl">aanvragen ingeloot en in behandeling</div></div>
                    <div className="hp-l-card"><div className="hp-l-num g">~14%</div><div className="hp-l-lbl">effectieve kans per aanvraag</div></div>
                  </div>
                  <div className="hp-l-insight"><span style={{fontSize:22,flexShrink:0}}>💡</span><p><strong>Wat betekent inloting?</strong> Inloting betekent dat uw aanvraag in behandeling wordt genomen — niet dat subsidie is toegekend. Na inloting volgt een inhoudelijke beoordeling door RVO. Wij begeleiden dit screeningstraject voor dezelfde vaste succesfee van <strong>€ 2.500 (excl. btw)</strong>.</p></div>
                  <div style={{marginTop:20,textAlign:"center"}}><a href="/lotingsuitslagen" className="hp-btn-s" onClick={e=>{e.preventDefault();setPhase("loting");}}>Bekijk alle lotingsuitslagen 2024–2026 →</a></div>
                </div>
              </div>
              <div id="slim" className="hp-section" style={{background:"var(--off)"}}>
                <div className="hp-si">
                  <div className="hp-slbl">De SLIM-regeling</div>
                  <h2 className="hp-stitle">Wat is SLIM-subsidie?</h2>
                  <p className="hp-ssub">De SLIM-subsidie vergoedt tot 60% van uw investering in leren, opleiden en ontwikkelen van uw medewerkers. Klein MKB (tot 50 medewerkers) ontvangt 60%, middelgroot MKB (51–250 medewerkers) 50%. Beschikbaar voor alle MKB-ondernemingen met personeel in loondienst. De regeling loopt tot eind 2029.</p>
                  <div className="hp-act-grid">
                    <div className="hp-act-card"><div className="hp-act-tag a">Activiteit A</div><div className="hp-act-title">Doorlichting → Opleidings- of ontwikkelplan</div><div className="hp-act-desc">Een externe adviseur brengt de scholingsbehoefte in kaart en stelt een concreet plan op.</div><div className="hp-act-tags"><span className="hp-act-tag-sm">Leercultuurscan</span><span className="hp-act-tag-sm">Opleidingsplan</span><span className="hp-act-tag-sm">HR-strategie</span></div></div>
                    <div className="hp-act-card"><div className="hp-act-tag b">Activiteit B</div><div className="hp-act-title">Loopbaan- of ontwikkeladviezen voor werknemers</div><div className="hp-act-desc">Individuele adviezen via een gecertificeerde loopbaanadviseur voor uw medewerkers.</div><div className="hp-act-tags"><span className="hp-act-tag-sm">Loopbaangesprekken</span><span className="hp-act-tag-sm">POP-traject</span><span className="hp-act-tag-sm">Talentassessment</span></div></div>
                    <div className="hp-act-card"><div className="hp-act-tag c">Activiteit C</div><div className="hp-act-title">Ontwikkelen of invoeren van een L&O-methode</div><div className="hp-act-desc">Structurele methode die medewerkers stimuleert kennis te blijven ontwikkelen op de werkvloer.</div><div className="hp-act-tags"><span className="hp-act-tag-sm">Online leerportal</span><span className="hp-act-tag-sm">Bedrijfsschool</span><span className="hp-act-tag-sm">Videoserie</span></div></div>
                  </div>
                </div>
              </div>
              <div id="waarom" className="hp-section" style={{background:"var(--white)"}}>
                <div className="hp-si">
                  <div className="hp-slbl">Onze aanpak</div>
                  <h2 className="hp-stitle">Waarom via SLIM Subsidie Advies?</h2>
                  <p className="hp-ssub">De specialist in SLIM-subsidie aanvragen voor MKB-ondernemers. Van gratis quickscan tot toekenning — én het volledige screeningstraject bij RVO.</p>
                  <div className="hp-why-grid">
                    <div className="hp-why-card"><span className="hp-why-icon">🔄</span><div className="hp-why-title">Herindienen tot inloting</div><div className="hp-why-text">Niet ingeloot? Wij actualiseren ieder tijdvak uw aanvraag en dienen opnieuw in — totdat u ingeloot wordt. Inclusief documentactualisatie, zonder extra kosten.</div></div>
                    <div className="hp-why-card"><span className="hp-why-icon">🎯</span><div className="hp-why-title">100% SLIM-specialist</div><div className="hp-why-text">Wij doen niets anders dan SLIM-subsidie. Diepgaande kennis van de wet- en regelgeving, de valkuilen én de kansen voor uw situatie.</div></div>
                    <div className="hp-why-card"><span className="hp-why-icon">🛡️</span><div className="hp-why-title">Succesfee: no cure, no pay</div><div className="hp-why-text">De dieptecheck kost €200 (early bird t/m 10 juli) of €250 excl. btw. De succesfee van € 2.500 (excl. btw) betaalt u uitsluitend bij toekenning — en de dieptecheck wordt dan terugbetaald.</div></div>
                    <div className="hp-why-card"><span className="hp-why-icon">✅</span><div className="hp-why-title">Foutloze indiening</div><div className="hp-why-text">23 aanvragen vielen vóór de loting af door fouten in tijdvak 1 2026. Wij zorgen voor een correcte aanvraag — zodat u überhaupt meedoet.</div></div>
                    <div className="hp-why-card"><span className="hp-why-icon">📋</span><div className="hp-why-title">Van A tot Z begeleiding</div><div className="hp-why-text">Quickscan, activiteitenplan, begroting, documentenverzameling, indiening én screeningstraject bij RVO. Alles inbegrepen.</div></div>
                    <div className="hp-why-card"><span className="hp-why-icon">💰</span><div className="hp-why-title">Scherpste fee-garantie</div><div className="hp-why-text">Vindt u een subsidieadviseur met een lagere fee? Wij duiken eronder.</div></div>
                    <div className="hp-why-card"><span className="hp-why-icon">⚡</span><div className="hp-why-title">Direct starten</div><div className="hp-why-text">Via onze gratis online quickscan weet u binnen 2 minuten of uw bedrijf in aanmerking komt.</div></div>
                  </div>
                </div>
              </div>
              <div id="cases" className="hp-loting" style={{padding:"72px 20px"}}>
                <div className="hp-si">
                  <div className="hp-slbl" style={{color:"var(--blue-light)"}}>Praktijkvoorbeelden</div>
                  <h2 className="hp-stitle" style={{color:"#fff"}}>Wat wij voor ondernemers realiseerden</h2>
                  <p className="hp-ssub" style={{color:"rgba(255,255,255,0.5)"}}>Drie voorbeelden van succesvolle SLIM-subsidie aanvragen die wij van begin tot eind begeleid hebben.</p>
                  <div className="hp-cases-grid">
                    <div className="hp-case-card"><div className="hp-case-sector">Zorgvervoer</div><div className="hp-case-title">Ingebedde leermethodiek voor taxibedrijf in zorgvervoer</div><div className="hp-case-desc">Kritische operationele kennis structureel borgen bij alle chauffeurs.</div><div className="hp-case-act">Activiteit C — L&O-methode</div></div>
                    <div className="hp-case-card"><div className="hp-case-sector">Interieurverzorging</div><div className="hp-case-title">Leerwerkplek methodiek voor luxe interieurverzorgingsbedrijf</div><div className="hp-case-desc">Vakkennis van ervaren medewerkers overdragen aan nieuwe collega's.</div><div className="hp-case-act">Activiteit C — Leerwerkplek</div></div>
                    <div className="hp-case-card"><div className="hp-case-sector">AI & Robotisering</div><div className="hp-case-title">Leermethodiek voor AI-app- en robotiseringsontwikkelaar</div><div className="hp-case-desc">Snel veranderende AI-kennis continu beschikbaar houden voor het team.</div><div className="hp-case-act">Activiteit A + C — Scan & methode</div></div>
                  </div>
                </div>
              </div>
              <div id="team" className="hp-section" style={{background:"var(--off)"}}>
                <div className="hp-si">
                  <div className="hp-slbl">Ons team</div>
                  <h2 className="hp-stitle">Uw SLIM-subsidieadviseurs</h2>
                  <p className="hp-ssub">Drie specialisten met diepgaande kennis van de SLIM-regeling en het beoordelingsproces van RVO.</p>
                  <div className="hp-team-grid">
                    <div className="hp-team-card"><div className="hp-avatar hp-av-d">DS</div><div className="hp-t-name">Daniel Sharif</div><div className="hp-t-role">SLIM Subsidieadviseur</div><div className="hp-t-bio">Specialist in het begeleiden van MKB-aanvragen van quickscan tot succesvolle toekenning.</div></div>
                    <div className="hp-team-card"><div className="hp-avatar hp-av-e">EV</div><div className="hp-t-name">Esther Valerius</div><div className="hp-t-role">SLIM Subsidieadviseur</div><div className="hp-t-bio">Expert in compliance en documentenverzameling. Zorgt dat elke aanvraag volledig en correct is vóór indiening.</div></div>
                    <div className="hp-team-card"><div className="hp-avatar hp-av-r">RF</div><div className="hp-t-name">Rudolf Favier</div><div className="hp-t-role">SLIM Subsidieadviseur</div><div className="hp-t-bio">Gespecialiseerd in het screeningstraject na inloting. Begeleidt de inhoudelijke beoordeling bij RVO.</div></div>
                  </div>
                </div>
              </div>
              <div id="faq" className="hp-section" style={{background:"var(--white)"}}>
                <div className="hp-si">
                  <div className="hp-slbl">Veelgestelde vragen</div>
                  <h2 className="hp-stitle">Vragen over SLIM-subsidie</h2>
                  <div className="hp-faq-list">
                    {[
                      ["Ik ben ZZP-er. Kom ik in aanmerking?","Nee. Alleen mkb-bedrijven mét personeel in loondienst kunnen SLIM-subsidie aanvragen."],
                      ["Mijn bedrijf heeft 5 medewerkers. Kom ik in aanmerking?","Ja! Tot 50 medewerkers valt u onder het klein MKB en ontvangt u 60% subsidie op uw investering, tot een maximum van € 24.999. Bedrijven met 51–250 medewerkers ontvangen 50%."],
                      ["Ik heb geen opleidingsbudget. Kan ik dan toch SLIM-subsidie aanvragen?","Ja! De SLIM-subsidie dekt 50–60% van uw investering in opleiding en scholing van medewerkers, afhankelijk van uw bedrijfsgrootte."],
                      ["Wat betekent inloting precies?","Inloting betekent dat uw aanvraag in behandeling wordt genomen — niet dat subsidie is toegekend. Na inloting beoordeelt RVO uw aanvraag inhoudelijk."],
                      ["Wat kost SLIM-subsidie aanvragen via SLIM Subsidie Advies?","De quickscan is gratis. Dieptecheck kost € 200 excl. btw (early bird) of € 250 excl. btw (€ 242 resp. € 302,50 incl. btw). Bij toekenning betaalt u € 2.500 succesfee excl. btw. Geen toekenning = geen succesfee."],
                    ].map(([q,a],i)=>(
                      <div key={i} className="hp-faq-item" onClick={e=>e.currentTarget.classList.toggle("open")}>
                        <div className="hp-faq-q">{q}<span className="hp-faq-arr">+</span></div>
                        <div className="hp-faq-a"><p>{a}</p></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hp-cta-section">
                <div className="hp-si">
                  <div className="hp-slbl" style={{color:"var(--blue-light)",textAlign:"center"}}>Tijdvak 2 2026 — opening 10 augustus</div>
                  <h2 className="hp-cta-title">Komt uw bedrijf in aanmerking<br/>voor <span>SLIM-subsidie</span>?</h2>
                  <p className="hp-cta-sub">Doe de gratis quickscan en weet het binnen 2 minuten. Positief resultaat? Start direct met de dieptecheck voor € 200 excl. btw (€ 242 incl. btw).</p>
                  <div style={{display:"flex",justifyContent:"center"}}>
                    <a href="/scan" className="hp-btn-p" onClick={e=>{e.preventDefault();setPhase("scan");}} style={{fontSize:16,padding:"15px 34px"}}>Doe de gratis quickscan →</a>
                  </div>
                  <p className="hp-cta-note">Gratis quickscan · Dieptecheck €200 (early bird) of €250 excl. btw · Succesfee €2.500 excl. btw — no cure, no pay</p>
                </div>
              </div>
              <div className="hp-footer">
                <div className="hp-ft">
                  <div className="hp-ft-top">
                    <div>
                      <div className="logo-slim">SLIM</div><div className="logo-sub">SUBSIDIE</div><div className="logo-adv">ADVIES</div>
                      <p className="hp-ft-desc">De specialist in SLIM-subsidie voor MKB-ondernemers. Van quickscan tot toekenning — inclusief het volledige screeningstraject bij RVO.</p>
                    </div>
                    <div>
                      <div className="hp-ft-h">Navigatie</div>
                      <ul className="hp-ft-links">
                        <li><a href="#slim">Wat is SLIM-subsidie?</a></li><li><a href="#waarom">Waarom via ons?</a></li><li><a href="#cases">Praktijkvoorbeelden</a></li><li><a href="#team">Ons team</a></li><li><a href="#faq">Veelgestelde vragen</a></li>
                        <li><a href="/lotingsuitslagen" onClick={e=>{e.preventDefault();setPhase("loting");}}>Lotingsuitslagen</a></li>
                        <li><a href="/projecten" onClick={e=>{e.preventDefault();setPhase("projecten");}}>Projecten</a></li>
                        <li><a href="/scan" onClick={e=>{e.preventDefault();setPhase("scan");}}>Gratis quickscan</a></li>
                      </ul>
                    </div>
                    <div>
                      <div className="hp-ft-h">Contact</div>
                      <ul className="hp-ft-links">
                        <li><a href="mailto:info@slimsubsidieadvies.nl">info@slimsubsidieadvies.nl</a></li>
                        <li><a href="https://www.instagram.com/slimsubsidieadvies" target="_blank" rel="noreferrer">@slimsubsidieadvies</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="hp-ft-bottom">
                    <div className="hp-ft-copy">© 2026 SLIM Subsidie Advies · www.slimsubsidieadvies.nl</div>
                    <div className="hp-ft-legal"><a href="#privacy">Privacyverklaring</a><a href="#av">Algemene voorwaarden</a></div>
                  </div>
                </div>
              </div>
            </div>
          )}

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
                    <div className="options">{q.options.map(o=><label key={o.v} className={`opt ${answers[q.id]===o.v?"sel":""}`} onClick={()=>answer(q.id,o.v)}><span className="opt-radio"><span className="opt-dot"/></span>{o.l}</label>)}</div>
                  </div>
                ))}
                <div className="q-block">
                  <div className="q-label"><span className="q-num">8</span>Wat is de verwachte totale investering in leer- en ontwikkelactiviteiten?</div>
                  <p className="q-hint">Uren medewerkers + externe kosten. Minimaal {fmt(8334)} voor een minimale subsidie van €5.000.</p>
                  <div className="input-wrap"><span className="input-pfx">€</span><input className="num-input" type="number" min="0" placeholder="bijv. 30000" value={investment} onChange={e=>setInvestment(e.target.value)}/></div>
                  {subsidyEst>0&&<p className="input-hint">✓ Indicatief subsidiebedrag: {fmt(subsidyEst)}</p>}
                </div>
                <div className="btn-row"><button className="btn btn-primary" onClick={()=>setPhase("result")} disabled={!allScanDone}>Bekijk resultaat →</button></div>
              </div>
              <div className="alert-info">🔒 Uw gegevens worden veilig verwerkt en niet gedeeld met derden.</div>
            </>
          )}

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
                <div className="btn-row"><button className="btn btn-ghost" onClick={()=>{setPhase("scan");setAnswers({});setKoMsg(null);}}>← Opnieuw beginnen</button></div>
              </div>
            </>
          )}

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
                  <div className="est-sub">{["51–100 medewerkers","101–249 medewerkers","250+ medewerkers"].includes(profile.medewerkers)?"50%":"60%"} van {fmt(invNum)}{isAgri?" (max. €20.000 voor landbouw)":" (max. €24.999)"}</div>
                  <div className="est-grid">
                    <div className="est-item"><div className="est-item-label">Tijdvak</div><div className="est-item-val">{deadline.label}</div></div>
                    <div className="est-item"><div className="est-item-label">Opening aanvraag</div><div className="est-item-val">{deadline.open.toLocaleDateString("nl-NL")}</div></div>
                    <div className="est-item"><div className="est-item-label">Subsidie %</div><div className="est-item-val">{["51–100 medewerkers","101–249 medewerkers","250+ medewerkers"].includes(profile.medewerkers)?"50%":"60%"}</div></div>
                  </div>
                </div>
              </div>
              <LotingBox compact={true}/>
              <div className="card">
                <div className="card-title">Uw kans is reëel — maar alleen met een sterke aanvraag</div>
                <p className="card-sub">Van de {LOTING.totaalIngediend.toLocaleString("nl-NL")} ingediende aanvragen in tijdvak 1 2026 werd slechts 14% ingeloot — en vielen er al 23 uit vóór de loting door vermijdbare fouten.</p>
                <div className="pricing">
                  <div className="pricing-head">
                    <div className="pricing-head-title">SLIM DIEPTECHECK + AANVRAAGBEGELEIDING</div>
                    <div className="pricing-head-sub">Van analyse tot foutloze indiening — én herindienen totdat u ingeloot wordt</div>
                  </div>
                  <div className="pricing-body">
                    {eb&&<div className="eb-badge">⏰ Early Bird — 20% korting</div>}
                    <div className="price-row">
                      <span className="price-main">{fmt(finalPrice)}</span>
                      {eb&&<span className="price-strike">{fmt(basePrice)}</span>}
                      <span className="price-lbl">excl. btw</span>
                    </div>
                    <p className="price-incl-note">📌 Totaal af te schrijven: <strong>{fmt2(finalPriceIncl)} incl. btw</strong> ({fmt(finalPrice)} + 21% btw)</p>
                    <ul className="features">
                      <li><span className="feat-check">✓</span><strong>Direct na betaling:</strong> Persoonlijke AI-diepteanalyse van uw situatie en lotingskansen</li>
                      <li><span className="feat-check">✓</span>Terugbelafspraak met uw adviseur binnen 5 werkdagen</li>
                      <li><span className="feat-check">✓</span>Foutloze aanvraag — nooit afgekeurd vóór de loting</li>
                      <li><span className="feat-check">✓</span>Activiteitenplan, begroting en documentenverzameling</li>
                      <li><span className="feat-check">✓</span>Compliance-check en indiening via RVO e-portaal</li>
                      <li><span className="feat-check">✓</span><strong>Niet ingeloot?</strong> Wij actualiseren ieder tijdvak uw aanvraag en dienen opnieuw in — totdat u ingeloot wordt</li>
                    </ul>
                    <div className="nocure-note"><strong>No cure, no pay:</strong> Bij toekenning betaalt u een succesfee van <strong>€ 2.500</strong> (excl. btw). De kosten van de dieptecheck worden u bij toekenning terugbetaald. Geen subsidie = geen succesfee.</div>
                    <div className="btn-row">
                      <button className="btn btn-primary" onClick={()=>setPhase("profile")}>Vul bedrijfsprofiel in →</button>
                      <button className="btn btn-ghost" onClick={()=>{setPhase("scan");setAnswers({});}}>← Terug</button>
                    </div>
                  </div>
                </div>
                {eb&&<div className="alert-warn" style={{marginTop:12}}>⏰ <strong>Early Bird actief t/m 10 juli 2026:</strong> U profiteert van {fmt(basePrice*.2)} korting op de reguliere prijs.</div>}
              </div>
            </>
          )}

          {phase==="profile"&&(
            <>
              <div className="phase-lbl"><span className="phase-dot"/>Stap 3 — Bedrijfsprofiel</div>
              <div className="card">
                <div className="card-title">Bedrijfsidentificatie</div>
                <p className="card-sub">Vul uw KvK-nummer en bedrijfsnaam in.</p>
                <div className="form-row">
                  <div className="form-group"><label className="form-label">KvK-nummer</label><input className="form-input" placeholder="12345678" maxLength={8} value={kvkInput} onChange={e=>setKvkInput(e.target.value.replace(/\D/g,""))}/><p className="form-hint">8-cijferig nummer</p></div>
                  <div className="form-group"><label className="form-label">Bedrijfsnaam *</label><input className="form-input" placeholder="Uw Bedrijf" value={contact.bedrijf} onChange={e=>setContact(p=>({...p,bedrijf:e.target.value}))}/></div>
                </div>
              </div>
              <div className="card">
                <div className="card-title">Bedrijfsgegevens</div>
                <div className="form-row">
                  <div className="form-group"><label className="form-label">Aantal medewerkers *</label><select className="form-select" value={profile.medewerkers} onChange={e=>setProfile(p=>({...p,medewerkers:e.target.value}))}><option value="">Selecteer...</option><option>1–5 medewerkers</option><option>6–10 medewerkers</option><option>11–25 medewerkers</option><option>26–50 medewerkers</option><option>51–100 medewerkers</option><option>101–249 medewerkers</option><option>250+ medewerkers</option></select></div>
                  <div className="form-group"><label className="form-label">Rechtsvorm *</label><select className="form-select" value={profile.rechtsvorm} onChange={e=>setProfile(p=>({...p,rechtsvorm:e.target.value}))}><option value="">Selecteer...</option>{RECHTSVORMEN.map(r=><option key={r}>{r}</option>)}</select></div>
                </div>
                <div className="form-row">
                  <div className="form-group"><label className="form-label">Sector *</label><select className="form-select" value={profile.sector} onChange={e=>setProfile(p=>({...p,sector:e.target.value}))}><option value="">Selecteer...</option>{SECTOREN.map(s=><option key={s}>{s}</option>)}</select></div>
                  <div className="form-group"><label className="form-label">Provincie *</label><select className="form-select" value={profile.provincie} onChange={e=>setProfile(p=>({...p,provincie:e.target.value}))}><option value="">Selecteer...</option>{PROVINCIES.map(p=><option key={p}>{p}</option>)}</select></div>
                </div>
              </div>
              <div className="card">
                <div className="card-title">Welke activiteit(en) passen bij uw situatie?</div>
                <p className="card-sub">Selecteer één of meerdere subsidiabele activiteiten (Art. 2.4 SLIM-regeling).</p>
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
                {!profileOk&&<p style={{fontSize:12,color:"var(--muted)",marginTop:10}}>Vul alle verplichte velden in en selecteer minimaal 1 activiteit.</p>}
              </div>
            </>
          )}

          {phase==="payment"&&(
            <>
              <div className="phase-lbl"><span className="phase-dot"/>Stap 4 — Betaling</div>
              <div className="card" style={{borderLeft:"3px solid var(--blue-light)"}}>
                <div className="card-title">Wat u direct na betaling ontvangt</div>
                <ul className="features" style={{marginBottom:0}}>
                  <li><span className="feat-check">✓</span><strong>Uw persoonlijke AI-diepteanalyse</strong> — direct zichtbaar na terugkeer van de betaalpagina</li>
                  <li><span className="feat-check">✓</span>Bevestigingsmail met factuur</li>
                  <li><span className="feat-check">✓</span>Terugbelafspraak met uw adviseur binnen 5 werkdagen</li>
                  <li><span className="feat-check">✓</span>Start volledige aanvraagbegeleiding richting {deadline.label}</li>
                  <li><span className="feat-check">✓</span><strong>Herindienen inbegrepen:</strong> niet ingeloot? Wij actualiseren uw aanvraag ieder tijdvak en dienen opnieuw in — totdat u ingeloot wordt</li>
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
                  <p style={{fontSize:14,color:"var(--muted)",marginBottom:4}}>Te betalen (incl. btw)</p>
                  <p style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:38,fontWeight:800,color:"var(--navy)",lineHeight:1}}>
                    {fmt2(finalPriceIncl)}{eb&&<span style={{fontSize:14,color:"var(--blue-light)",marginLeft:10,fontFamily:"'Barlow',sans-serif",fontWeight:500}}>early bird</span>}
                  </p>
                  <p style={{fontSize:12,color:"var(--muted)",margin:"6px 0 14px"}}>
                    {fmt(finalPrice)} excl. btw + {fmt2(finalPrice*0.21)} btw (21%)
                  </p>
                  <p style={{fontSize:12,color:"var(--muted)",marginBottom:8}}>Kies uw betaalmethode:</p>
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
                  <span className="ccheck-text">Ik begrijp het no cure, no pay model: bij toekenning betaal ik een succesfee van € 2.500 (excl. btw). De kosten van de dieptecheck worden mij bij toekenning terugbetaald. Geen subsidie = geen succesfee.</span>
                </label>
                <div className="btn-row">
                  <button className="btn btn-primary" onClick={submitPayment} disabled={!confirmed.terms||!confirmed.nocure||!contact.naam||!contact.email||processing}>
                    {processing?"Doorsturen naar Mollie…":`Betaal ${fmt2(finalPriceIncl)} incl. btw via Mollie →`}
                  </button>
                  <button className="btn btn-ghost" onClick={()=>setPhase("profile")}>← Terug</button>
                </div>
              </div>
            </>
          )}

          {phase==="success"&&(
            <>
              <div className="phase-lbl"><span className="phase-dot"/>Uw persoonlijke SLIM-analyse</div>
              <div className="card">
                <div className="success-header">
                  <span className="success-header-icon">🎉</span>
                  <div className="success-header-title">Betaling geslaagd — uw analyse wordt gegenereerd</div>
                  <p className="success-header-sub">
                    {contact.naam
                      ?<>Bedankt, <strong>{contact.naam}</strong>. Een bevestiging met factuur is verstuurd naar <strong>{contact.email}</strong>.</>
                      :<>Uw betaling is ontvangen. Een bevestiging met factuur is naar uw e-mailadres verstuurd.</>
                    }
                  </p>
                  <div className="paid-badge">✓ Betaling ontvangen via Mollie</div>
                </div>
                <div className="ai-box">
                  <div className="ai-label">Uw Persoonlijke AI Diepteanalyse — SLIM Subsidie Advies</div>
                  {loadingAI?(
                    <div style={{textAlign:"center",padding:"20px 0"}}>
                      <div className="spinner"/>
                      <p style={{fontSize:13,color:"var(--muted)"}}>Uw analyse wordt samengesteld op basis van uw bedrijfsprofiel en de actuele lotingscijfers…</p>
                    </div>
                  ):(
                    <div className="ai-text">{analysis||"Uw analyse wordt geladen…"}</div>
                  )}
                </div>
                {!loadingAI&&subsidyEst>0&&(
                  <div className="est-box" style={{marginBottom:0}}>
                    <div className="est-label">Uw subsidie-indicatie</div>
                    <div className="est-grid" style={{marginTop:8}}>
                      <div className="est-item"><div className="est-item-label">Subsidiebedrag</div><div className="est-item-val" style={{fontSize:20,color:"var(--green)"}}>{fmt(subsidyEst)}</div></div>
                      <div className="est-item"><div className="est-item-label">Activiteit(en)</div><div className="est-item-val">{selectedActs.join(" + ")||"—"}</div></div>
                      <div className="est-item"><div className="est-item-label">Tijdvak</div><div className="est-item-val">{deadline.label}</div></div>
                      <div className="est-item"><div className="est-item-label">Opening</div><div className="est-item-val">{deadline.open.toLocaleDateString("nl-NL")}</div></div>
                    </div>
                  </div>
                )}
              </div>
              {!loadingAI&&<LotingBox compact={false}/>}
              {!loadingAI&&(
                <div className="next-steps">
                  <div className="next-steps-title">Wat gebeurt er nu?</div>
                  <div className="next-step"><div className="next-step-num">1</div><div className="next-step-body"><div className="next-step-title">Terugbelafspraak binnen 5 werkdagen</div><div className="next-step-sub">Uw adviseur neemt contact op om de analyse door te nemen en de aanvraagstrategie te bespreken.</div></div></div>
                  <div className="next-step"><div className="next-step-num">2</div><div className="next-step-body"><div className="next-step-title">Complete en correcte aanvraagvoorbereiding</div><div className="next-step-sub">Met uw input bereiden wij de documentatie, het activiteitenplan en de begroting op maat voor.</div></div></div>
                  <div className="next-step"><div className="next-step-num">3</div><div className="next-step-body"><div className="next-step-title">Foutloze indiening & begeleid screeningstraject</div><div className="next-step-sub">Wij zorgen voor een correcte aanvraag vóór indiening. Na inloting begeleiden wij ook het screeningstraject bij RVO. Alles voor dezelfde vaste fee.</div></div></div>
                  <div className="next-step"><div className="next-step-num">4</div><div className="next-step-body"><div className="next-step-title">Lotingsresultaat & succesfee</div><div className="next-step-sub">Bij toekenning is een succesfee van € 2.500 (excl. btw) verschuldigd. De dieptecheck wordt terugbetaald. Geen toekenning = geen succesfee.</div></div></div>
                  <div className="next-step"><div className="next-step-num">5</div><div className="next-step-body"><div className="next-step-title">Niet ingeloot? Wij dienen opnieuw in — ieder tijdvak</div><div className="next-step-sub">Wordt uw aanvraag niet ingeloot, dan actualiseren wij alle benodigde documenten en dienen uw aanvraag in het volgende tijdvak opnieuw in. Wij blijven dit doen totdat u ingeloot wordt. Geen extra kosten — inbegrepen in uw pakket.</div></div></div>
                </div>
              )}
              <div className="summary">
                <div className="sum-lbl">Betalingsoverzicht</div>
                {[["Bedrijf",bedrijfsnaam||"—"],["Sector",profile.sector||"—"],["Activiteit(en)",selectedActs.join(" + ")||"—"],["Indicatief subsidiebedrag",subsidyEst>0?fmt(subsidyEst):"—"],["Aanvraagtijdvak",deadline.label],["Succesfee bij toekenning","€ 2.500 (excl. btw)"]].map(([k,v])=>(
                  <div key={k} className="sum-row"><span>{k}</span><span>{v}</span></div>
                ))}
              </div>
            </>
          )}

        </main>
      </div>}
    </>
  );
}
