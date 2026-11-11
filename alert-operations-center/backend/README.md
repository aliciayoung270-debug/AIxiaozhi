# 预警规则字段接口

这里集中存放本需求的后端契约、字段目录和无依赖演示服务，避免与单文件原型混放。

## 接口设计结论

采用一个统一字段目录接口更合适：`GET /api/v1/alert-rule-fields?alertObjectType=...`。七类预警对象共用同一响应结构，由 `alertObjectType` 决定允许引用的统计对象，再由服务端返回该范围内的字段、类型、运算符、枚举、时间窗口及可比较字段。这样前端无需维护七套接口，也不会自行拼接跨对象字段关系。

跨指标比较单独使用 `GET /api/v1/alert-rule-fields/comparable`，它仍复用同一字段目录和对象权限规则，不建立第二套字段定义。

字段源来自《预警字段说明_2.1-2.6.xlsx》。生成时排除“不对客”和飞阅专属字段；保留通用、致一定制及待确认字段，并在返回值中保留标记。生产实现还需要在这一层叠加租户开通、父级指标权限和数据准备状态。

## 文件

- `field-catalog.json`：由 Excel 生成的七类字段目录。
- `field_catalog_service.mjs`：对象关系、搜索及可比较字段过滤逻辑。
- `server.mjs`：仅使用 Node.js 内置模块的演示服务。
- `openapi.yaml`：接口契约。
- `build_field_catalog.py`：从字段 Excel 重新生成目录。

## 本地验证

```bash
cd "/Users/alicia/AI xiaozhi/alert-operations-center/backend"
node server.mjs
```

启动后打开 `http://127.0.0.1:8787/`。这个地址由演示服务直接提供原型页面，页面会按当前预警对象调用字段目录接口；看到“接口已连接”即表示联调成功。原型只读取接口数据：若接口不可用，条件配置会禁用，可点击连接状态按钮重试。

仅当字段 Excel 有更新时，才需要执行 `python3 build_field_catalog.py` 重新生成 `field-catalog.json`。

示例：

```text
GET /api/v1/alert-rule-fields?alertObjectType=AD_CAMPAIGN&query=ACOS
GET /api/v1/alert-rule-fields/comparable?alertObjectType=AD_CAMPAIGN&fieldId=2.3-017
```
