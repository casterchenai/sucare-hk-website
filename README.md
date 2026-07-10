# 家怡康 Supreme Care 网站重构

香港家居护理品牌「家怡康」的新网站首个高保真实现，目标是让家属在30秒内理解：谁能帮忙、适合哪项服务、收费范围，以及下一步怎样开始。

## 首批页面

- `/`：需求分流、服务推荐器、六项核心服务、收费预览、FAQ及站内查询表单
- `/escort`：香港陪诊与海外医疗护送的流程、服务范围和公开价目
- `/ccsv`：社署认可服务单位C0278、共同付款估算、核准服务收费及申请流程

## 视觉系统

- 保留家怡康原Logo及橙色识别
- 以深青绿、奶油白及橙色建立专业但温暖的医疗信任感
- `public/images/character-bible.webp` 是全站唯一3D角色母版
- 首页、陪诊及社区券场景均由角色母版延展，网页使用WebP版本以缩短载入时间

## 转化与分析

网站沿用现站Google Tag Manager容器 `GTM-MBP8RHG`，并推送：

- `whatsapp_click`
- `phone_click`
- `lead_form_start`
- `lead_form_submit`
- `service_finder_complete`
- `pricing_view`
- `ccsv_calculator_complete`

表单目前为高保真前端流程，会触发事件并显示站内完成状态；正式上线前需接入CRM或线索储存端点，并配置感谢页及有效线索回传。

## 数据说明

社区券的2026—27年度券值、共同付款级别及家怡康核准收费，依据香港社会福利署公开资料整理。自费价目来自家怡康现站公开价目表。上线前应再次核对所有时效性资料。

## 开发

需要 Node.js `>=22.13.0`。

```bash
npm run dev
npm run lint
```

应用基于 Vinext / React / TypeScript，生产构建输出由 Sites 工作流验证。
