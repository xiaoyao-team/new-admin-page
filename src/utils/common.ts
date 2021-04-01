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

export const uploadImgToBase64 = (file: any) => {  //核心方法，将图片转成base64字符串形式
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function() { // 图片转base64完成后返回reader对象
      resolve(reader)
    }
    reader.onerror = reject
  })
}

