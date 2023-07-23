import CheckboxTree from "react-checkbox-tree";
import React, { useEffect, useState } from 'react';
import Axios from "../../utils/axios";
import TreeViewData from "../../utils/TreeViewJsonData";
import Select2 from "../../components/elements/Select2";


export default function CustomizedMuiTreeView() {
  const {http} = Axios();
  const [nodes, setNodes] = useState([]);
  const [permissions, setPermissions] = useState([]); 
  // console.log(permissions);

  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);


  const [option,setOption] = useState([]);
  console.log(option);

  const treeFilterData = function (jsonData,level="") {

    for (const parent of jsonData) {
       if (parent.children) {
        setOption((prev)=>([...prev,{
          value:parent.id,
          label:level+parent.title
        }]));
        treeFilterData(parent.children,level+"--");
      } else {
        setOption((prev)=>([...prev,{value:parent.id, label:level+parent.title}]));
      }
    }

  }

  useEffect(()=>{
   nodes.length && setPermissions(TreeViewData(nodes));
   nodes.length && treeFilterData(nodes);
  },[nodes.length])



  useEffect(()=>{
    let isSubscribed = true;
    const fetchAllPermissions =async()=>{
      await http.post(`${process.env.NEXT_PUBLIC_DOMAIN}/app/permissions/permission`, {
        action:"getPermissionsTreeList"
      })
      .then((res)=>{
        if(isSubscribed){
          setNodes(res.data?.data);
        }
      })
      .catch((err)=> console.log(err))
    }
    fetchAllPermissions();
    return ()=>isSubscribed=false;
  },[]);


  return (
    <div className="container-fluid ">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
              <div className="border-bottom">
                <h4 className="card-title p-3">Permissions Tree</h4>
              </div>

                <div className="card-body  tree-view">
                  <div className="mb-2">
                    <Select2
                        options={option}
                    
                        name="module_id"
                      />
                  </div>
                  <CheckboxTree
                      iconsClass="fa5"
                      nodes={permissions}
                      checked={checked}
                      expanded={expanded}
                      onCheck={(checked) => setChecked(checked)}
                      onExpand={(expanded) => setExpanded(expanded)}
                  />
                </div>
              
              </div>
            </div>
          </div>
      </div>
  );
}
