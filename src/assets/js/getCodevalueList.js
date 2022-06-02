import util from "./utils.js";
import store from "../../store";

const getCodeList = function(name, tablename, bean) {
  return new Promise((resolve, reject) => {
    let codeValue = store.getters.getCodeValue;
    let list = codeValue[tablename];
    if (list) {
      resolve(list);
    } else {
      util.requestapi(name, bean, res => {
        if (res.code == 0) {
          list = res.data;
          store.commit("setCodeValue", { key: tablename, value: list });
          resolve(list);
        } else {
          reject([]);
        }
      });
    }
  });
};

export { getCodeList };
