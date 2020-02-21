const giveKeyValue = (search, q) => {
  const query = search.replace('?', '');
  const keyValue = [];
  if (query.includes(',')) {
    const kv = query.split(',');
    keyValue.push(kv);
  } else {
    keyValue.push(query);
  }
  if (keyValue.length < 1) {
    return;
  }
  let keyValueObject = keyValue.map((kvString) => {
    const obj = {};
    const kv = kvString.split('=');
    obj.key = kv[0];
    obj.value = kv[1];
    return obj;
  });
  if (q != null) {
    const value = keyValueObject.reduce((returnV, kvObject) => {
      if (kvObject.key === q) {
        return kvObject.value;
      }
      return returnV;
    }, '');
    return value;
  }
  return keyValueObject;
};

export default giveKeyValue;
