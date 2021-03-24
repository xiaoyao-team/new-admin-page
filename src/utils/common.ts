import { MessageBox } from "element-ui";

/**
 * @author 封装 element-ui 弹框
 * @param text
 * @param type
 * @returns {Promise}
 */
export function handleConfirm(
  text = "确定执行此操作吗？",
  type: any = "danger"
) {
  return MessageBox.confirm(text, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: type
  });
}



