const familyTreeFilterChildrenByIndex = function (jsonData) {
    const result = []
    for (const parent of jsonData) {
       if (parent.children) {
        result.push({
          value:parent.id,
          label:parent.title,
          children: familyTreeFilterChildrenByIndex(parent.children),
        })
      } else {
        result.push({value:parent.id, label:parent.title, children:[]})
      }
    }
    setPermissions(result);
    return result;
  }

  useEffect(()=>{
   nodes.length && setPermissions(TreeViewData(nodes));
  },[nodes.length])