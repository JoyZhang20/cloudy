// {
//   title:"STO市场",    //菜单名称
//   routepath:{name:"FundBaseInfo"},  //菜单路由对象
//   code:"101",   //菜单编码
//   rolegrp:",1,", // 用户角色对应权限，每一类角色用"，，"包围，如:,1,2,3,  前端采用,usertype,方式检查
//   isshow:true,   //是够显示
//   isgrpName:false,  //是否是组名称
//   isChildren： false // 是否显示二级菜单
//   icon:"el-icon-menu", //icon
//   children:[]  //子菜单
// }

const permission = [{
        title: "用户菜单1",
        routepath: { path: "base1" },
        code: "104",
        rolegrp: "1,2,",
        isshow: true,
        isgrpName: true,
        icon: "el-icon-menu",
        isChildren: true,
        children: [{
            title: "用户菜单1-1",
            routepath: { path: "base1" },
            code: "10401",
            rolegrp: "1,2,",
            isshow: true,
            isgrpName: false,
            children: [],
        }],
    },
    {
        title: "用户菜单2",
        routepath: { path: "base3" },
        code: "106",
        rolegrp: "1,2,",
        isshow: true,
        isgrpName: true,
        icon: "el-icon-menu",
        isChildren: false,
        children: [{
            title: "用户菜单2-1",
            routepath: { path: "base3" },
            code: "10601",
            rolegrp: "1,2,",
            isshow: true,
            isgrpName: false,
            children: [],
        }, ],
    }
];

export default permission;