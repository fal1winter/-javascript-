(() => {
  // 1. 深层查找 Shadow DOM 和 iframe
  function deepQuery(root, selector) {
    const results = [];
    
    // 查找当前层级的元素
    results.push(...root.querySelectorAll(selector));
    
    // 查找 Shadow DOM
    root.querySelectorAll('*').forEach(el => {
      if (el.shadowRoot) {
        results.push(...deepQuery(el.shadowRoot, selector));
      }
    });
    
    // 查找 iframe（同域）
    root.querySelectorAll('iframe').forEach(iframe => {
      try {
        const innerDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (innerDoc) {
          results.push(...deepQuery(innerDoc, selector));
        }
      } catch (e) {
        console.warn('跨域 iframe，无法访问:', iframe.src);
      }
    });
    
    return results;
  }

  // 2. 查找所有 radio groups
  const radioGroups = deepQuery(document, '[class="bh-radio bh-radio-group-v"]');
  console.log('找到的 radio groups:', radioGroups);

  // 3. 点击每个 group 下的第一个 label
  radioGroups.forEach(group => {
    const firstLabel = group.querySelector('label');
    if (firstLabel) {
      firstLabel.click();
      console.log('已点击:', firstLabel);
    }
  });
})();
