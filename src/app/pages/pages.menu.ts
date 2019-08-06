// export const PAGES_MENU = [
//   {
//     path: 'pages',
//     children: [
//       {
//         path: 'index',
//         data: {
//           menu: {
//             title: 'index',
//             icon: 'ion-android-home',
//             selected: false,
//             expanded: false,
//             order: 0
//           }
//         },
//         children: [
//           {
//             path: 'boss',
//             data: {
//               menu: {
//                 title: 'boss',
//               }
//             }
//           },
//           {
//             path: 'finance',
//             data: {
//               menu: {
//                 title: 'finance',
//               }
//             }
//           },
//           {
//             path: 'groupLeader',
//             data: {
//               menu: {
//                 title: 'groupLeader',
//               }
//             }
//           },
//           {
//             path: 'employee',
//             data: {
//               menu: {
//                 title: 'employee',
//               }
//             }
//           },
//           {
//             path: 'storage-leader',
//             data: {
//               menu: {
//                 title: 'storage-leader',
//               }
//             }
//           },
//           {
//             path: 'storage-employee',
//             data: {
//               menu: {
//                 title: 'storage-employee',
//               }
//             }
//           },
//         ]
//       },
//       {
//         path: 'order',
//         data: {
//           menu: {
//             title: '订单',
//             icon: 'ion-clipboard',
//             selected: false,
//             expanded: false,
//             order: 0
//           }
//         },
//         children: [
//           {
//             path: 'pending-allocation',
//             data: {
//               menu: {
//                 title: '待配货',
//                 icon: 'ion-star',
//               }
//             }
//           },
//           {
//             path: 'manualhanding',
//             data: {
//               menu: {
//                 title: '需人工处理',
//                 icon: '',
//                 expanded: false,
//                 order: 0
//               }
//             },
//             children: [
//               // {
//               //   path: 'alreadyPay',
//               //   data: {
//               //     menu: {
//               //       title: '已付款',
//               //       icon: 'ion-funnel',
//               //     }
//               //   }
//               // },
//               {
//                 path: 'needmanual',
//                 data: {
//                   menu: {
//                     title: '需人工审核',
//                     icon: 'ion-ios-arrow-right',
//                   }
//                 }
//               },
//               {
//                 path: 'outtimerisk',
//                 data: {
//                   menu: {
//                     title: '有超期风险',
//                     icon: 'ion-ios-arrow-right',
//                   }
//                 }
//               },
//               {
//                 path: 'lossinfo',
//                 data: {
//                   menu: {
//                     title: '收货信息不全',
//                     icon: 'ion-ios-arrow-right',
//                   }
//                 }
//               },
//               {
//                 path: 'needtracenum',
//                 data: {
//                   menu: {
//                     title: '需跟踪号',
//                     icon: 'ion-ios-arrow-right',
//                   }
//                 }
//               },
//               {
//                 path: 'nosku',
//                 data: {
//                   menu: {
//                     title: '商品关联失败',
//                     icon: 'ion-ios-arrow-right',
//                   }
//                 }
//               }, {
//                 path: 'lossedcustoms',
//                 data: {
//                   menu: {
//                     title: '报关信息缺失',
//                     icon: 'ion-ios-arrow-right',
//                   }
//                 }
//               },
//               // {
//               //   path: 'alreadyaudit',
//               //   data: {
//               //     menu: {
//               //       title: '已审核',
//               //       icon: 'ion-ios-arrow-right',
//               //     }
//               //   }
//               // },
//               {
//                 path: 'failedallocate',
//                 data: {
//                   menu: {
//                     title: '分配失败',
//                     icon: 'ion-ios-arrow-right',
//                   }
//                 }
//               }, {
//                 path: 'failedfreight',
//                 data: {
//                   menu: {
//                     title: '运费计算失败',
//                     icon: 'ion-ios-arrow-right',
//                   }
//                 }
//               }, {
//                 path: 'lowprofit',
//                 data: {
//                   menu: {
//                     title: '订单利润过低',
//                     icon: 'ion-ios-arrow-right',
//                   }
//                 }
//               },
//               {
//                 path: 'nostorage',
//                 data: {
//                   menu: {
//                     title: '缺货',
//                     icon: 'ion-ios-arrow-right',
//                   }
//                 }
//               },
//               // {
//               //   path: 'alreadyallocate',
//               //   data: {
//               //     menu: {
//               //       title: '已分配',
//               //       icon: 'ion-ios-arrow-right',
//               //     }
//               //   }
//               // },
//               // {
//               //   path: 'alreadygoods',
//               //   data: {
//               //     menu: {
//               //       title: '已配货',
//               //       icon: 'ion-ios-arrow-right',
//               //     }
//               //   }
//               // },
//               {
//                 path: 'errorlogistics',
//                 data: {
//                   menu: {
//                     title: '物流异常',
//                     icon: 'ion-ios-arrow-right',
//                   }
//                 }
//               },
//               // {
//               //   path: 'alreadyprint',
//               //   data: {
//               //     menu: {
//               //       title: '已打印',
//               //       icon: 'ion-ios-arrow-right',
//               //     }
//               //   }
//               // },
//               // {
//               //   path: 'alreadydeliver',
//               //   data: {
//               //     menu: {
//               //       title: '已发货',
//               //       icon: 'ion-ios-arrow-right',
//               //     }
//               //   }
//               // },
//               {
//                 path: 'failedback',
//                 data: {
//                   menu: {
//                     title: '回传失败',
//                     icon: 'ion-ios-arrow-right',
//                   }
//                 }
//               },
//               {
//                 path: 'mergeorder',
//                 data: {
//                   menu: {
//                     title: '合并订单',
//                     icon: 'ion-ios-arrow-right',
//                   }
//                 }
//               },
//               {
//                 path: 'canceldeliver',
//                 data: {
//                   menu: {
//                     title: '仓库取消发货',
//                     icon: 'ion-ios-arrow-right',
//                   }
//                 }
//               },
//               // {
//               //   path: 'alreadycancel',
//               //   data: {
//               //     menu: {
//               //       title: '已作废',
//               //       icon: 'ion-ios-arrow-right',
//               //     }
//               //   }
//               // },
//             ],
//           },
//           {
//             path: 'orderSearch',
//             data: {
//               menu: {
//                 title: '订单列表',
//               }
//             }
//           },
//           {
//             path: 'packageSearch',
//             data: {
//               menu: {
//                 title: '包裹列表',
//               }
//             }
//           },
//           {
//             path: 'shippingTrack',
//             data: {
//               menu: {
//                 title: '物流跟踪',
//               }
//             }
//           },
//           /* {
//             path: 'postbacking',
//             data: {
//               menu: {
//                 title: '订单回传',
//               }
//             }
//           }, */
//           {
//             path: 'salesReturn',
//             data: {
//               menu: {
//                 title: '退货列表',
//               }
//             }
//           },
//
//
//         ]
//       },
//       {
//         path: 'skuinfos',
//         data: {
//           menu: {
//             title: '商品',
//             icon: 'ion-cube',
//             selected: false,
//             expanded: false,
//             order: 0
//           }
//         },
//         children: [
//           {
//             path: 'skuinfos',
//             data: {
//               menu: {
//                 title: '商品信息',
//               }
//             }
//           }
//         ]
//       },
//       {
//         path: 'purchase',
//         data: {
//           menu: {
//             title: '采购',
//             icon: 'ion-ios-cart',
//             expanded: false,
//           }
//         },
//         children: [
//           {
//             path: 'purchasePond',
//             data: {
//               menu: {
//                 title: '采购建议',
//               }
//             }
//           },
//           {
//             path: 'purchasePondDetail',
//             data: {
//               menu: {
//                 title: '采购单',
//               }
//             }
//           },
//           {
//             path: '1688purchaseOrder',
//             data: {
//               menu: {
//                 title: '网络采购订单',
//               }
//             }
//           },
//           // {
//           //   path: 'supplierlist',
//           //   data: {
//           //     menu: {
//           //       title: '供应商列表',
//           //     }
//           //   }
//           // },
//           // {
//           //   path: 'supplyInfo',
//           //   data: {
//           //     menu: {
//           //       title: '供货信息',
//           //     }
//           //   }
//           // },
//
//         ]
//       },
//       {
//         path: 'storage',
//         data: {
//           menu: {
//             title: '仓库',
//             icon: 'ion-ios-home-outline',
//             selected: false,
//             expanded: false,
//             order: 0
//           }
//         }, children: [
//           {
//             path: 'quantity',
//             data: {
//               menu: {
//                 title: '库存数量',
//                 icon:'ion-ios-keypad'
//               }
//             }
//           },
//           {
//             path: 'storageFlow',
//             data: {
//               menu: {
//                 title: '库存流水',
//                 icon:'ion-waterdrop'
//               }
//             }
//           },
//           {
//             path: 'setting',
//             data: {
//               menu: {
//                 title: '仓库设置',
//                 icon:'ion-ios-settings'
//               }
//             }
//           },
//           {
//             path: 'receiverecord',
//             data: {
//               menu: {
//                 title: '收货记录',
//                 icon:'ion-ios-recording'
//               }
//             }
//           },
//           {
//             path: 'package-return-list',
//             data: {
//               menu: {
//                 title: '退件记录',
//                 icon:'ion-ios-redo'
//               }
//             }
//           },
//           {
//             path: 'unpacking',
//             data: {
//               menu: {
//                 title: '货品拆包',
//                 icon:'ion-ios-color-filter-outline'
//               }
//             }
//           },
//           {
//             path: 'packingTask',
//             data: {
//               menu: {
//                 title: '拣货任务',
//                 icon:'ion-android-bicycle'
//               }
//             }
//           },
//           {
//             path: 'packageScan',
//             data: {
//               menu: {
//                 title: '打印面单（单品）',
//                 icon:'ion-ios-browsers-outline'
//               }
//             }
//           },
//           {
//             path: 'shipments',
//             data: {
//               menu: {
//                 title: '核重发货',
//                 icon:'ion-android-plane'
//               }
//             }
//           },
//           {
//             path: 'SecondTimes',
//             data: {
//               menu: {
//                 title: '二次分拣',
//                 icon:'ion-ios-shuffle'
//               }
//             }
//           },
//           {
//             path: 'ThirdTimes',
//             data: {
//               menu: {
//                 title: '多品复核',
//                 icon:'ion-android-search'
//               }
//             }
//           },
//           {
//             path: 'checkPackage',
//             data: {
//               menu: {
//                 title: '包裹检验',
//                 icon:'ion-cube'
//               }
//             }
//           },
//           {
//             path: 'abnormal-package',
//             data: {
//               menu: {
//                 title: '异常件处理',
//                 icon:'ion-help'
//               }
//             }
//           },
//           {
//             path: 'handDevice',
//             data: {
//               menu: {
//                 title: '手持终端',
//                 icon:'ion-android-hand'
//               }
//             }
//           },
//         ]
//       },
//       {
//         path: 'logistics',
//         data: {
//           menu: {
//             title: '物流',
//             icon: 'ion-plane',
//             selected: false,
//             expanded: false,
//             order: 0
//           }
//         },
//         children: [
//           {
//             path: 'sp-auth-list',
//             data: {
//               menu: {
//                 title: 'API授权',
//               }
//             }
//           },
//           {
//             path: 'shipping-service-list',
//             data: {
//               menu: {
//                 title: '物流方式列表',
//               }
//             }
//           },
//           {
//             path: 'max-declartion-list',
//             data: {
//               menu: {
//                 title: '最大报关金额设置',
//               }
//             }
//           }
//         ]
//       },
//       {
//         path: 'rules',
//         data: {
//           menu: {
//             title: '规则',
//             icon: 'ion-ios-shuffle-strong',
//             selected: false,
//             expanded: false,
//             order: 20
//           }
//         }, children: [
//           {
//             path: 'orderRules',
//             data: {
//               menu: {
//                 title: '订单规则',
//               }
//             }
//           },
//           {
//             path: 'storageRules',
//             data: {
//               menu: {
//                 title: '仓库规则',
//               }
//             }
//           },
//           {
//             path: 'logisticsRules',
//             data: {
//               menu: {
//                 title: '物流分配规则',
//               }
//             }
//           },
//         {
//           path: 'selectPlateform',
//           data: {
//             menu: {
//               title: '标记发货规则',
//             }
//           },
//         }
//
//         ]
//       },
//       {
//         path: 'settings',
//         data: {
//           menu: {
//             title: '设置',
//             icon: 'ion-gear-b',
//             selected: false,
//             expanded: false,
//             order: 100,
//           }
//         },
//         children: [
//           {
//             path: 'members',
//             data: {
//               menu: {
//                 title: '成员管理',
//               }
//             }
//           },
//           {
//             path: 'roles',
//             data: {
//               menu: {
//                 title: '角色管理',
//               }
//             }
//           },
//           {
//             path: 'departments',
//             data: {
//               menu: {
//                 title: '部门管理',
//               }
//             }
//           },
//           {
//             path: 'account-bind',
//             data: {
//               menu: {
//                 title: '账号授权',
//               }
//             }
//           },
//           {
//             path: 'notice',
//             data: {
//               menu: {
//                 title: '公告列表',
//               }
//             }
//           },
//           {
//             path: 'settingKpi',
//             data: {
//               menu: {
//                 title: '员工KPI',
//               }
//             }
//           },
//           {
//             path: 'userInfo',
//             data: {
//               menu: {
//                 title: '个人设置',
//               }
//             }
//           },
//           {
//             path: 'blacklist',
//             data: {
//               menu: {
//                 title: '黑名单用户',
//               }
//             }
//           }
//         ]
//       },
//       {
//         path: 'customer-services',
//         data: {
//           menu: {
//             title: '客服',
//             icon: 'ion-person-stalker',
//             expanded: false,
//           }
//         },
//         children: [
//           {
//             path: 'amazon-services',
//             data: {
//               menu: {
//                 title: '待办邮件',
//               }
//             }
//           }
//         ]
//       },
//       {
//         path: 'statistics',
//         data: {
//           menu: {
//             title: '统计',
//             icon: 'ion-stats-bars',
//             selected: false,
//             expanded: false,
//             order: 0
//           }
//         },
//         children: [
//           {
//             path: 'orderstatistics',
//             data: {
//               menu: {
//                 title: '订单统计',
//                 expanded: false,
//                 icon: '',
//                 order:0
//               }
//             },
//             children: [
//               {
//                 path: 'order-money',
//                 data: {
//                   menu: {
//                     title: '订单金额统计',
//                     icon: 'ion-ios-arrow-right',
//                     order: 0
//                   }
//                 }
//               },
//               {
//                 path: 'order-back-money',
//                 data: {
//                   menu: {
//                     title: '退款金额统计',
//                     icon: 'ion-ios-arrow-right',
//                     order: 0
//                   }
//                 }
//               },
//               {
//                 path: 'order-country-money',
//                 data: {
//                   menu: {
//                     title: '国家金额分布',
//                     icon: 'ion-ios-arrow-right',
//                     order: 0
//                   }
//                 }
//               },
//               {
//                 path: 'order-account-money',
//                 data: {
//                   menu: {
//                     title: '帐号金额分布',
//                     icon: 'ion-ios-arrow-right',
//                     order: 9999,
//                   }
//                 }
//               },
//               {
//                 path: 'order-num',
//                 data: {
//                   menu: {
//                     title: '订单数量统计',
//                     icon: 'ion-ios-arrow-right',
//                     order: 0
//                   }
//                 }
//               },
//
//               {
//                 path: 'order-back-num',
//                 data: {
//                   menu: {
//                     title: '退款单量统计',
//                     icon: 'ion-ios-arrow-right',
//                     order: 0
//                   }
//                 }
//               },
//               {
//                 path: 'order-country',
//                 data: {
//                   menu: {
//                     title: '国家单量分布',
//                     icon: 'ion-ios-arrow-right',
//                     order: 0
//                   }
//                 }
//               },
//
//               {
//                 path: 'order-account',
//                 data: {
//                   menu: {
//                     title: '帐号单量分布',
//                     icon: 'ion-ios-arrow-right',
//                     order: 9999,
//                   }
//                 }
//               },
//               {
//                 path: 'groupsale',
//                 data: {
//                   menu: {
//                     title: '小组销售统计',
//                     icon: 'ion-ios-arrow-right',
//                     order: 0
//                   }
//                 }
//               },
//               {
//                 path: 'order-tracenum',
//                 data: {
//                   menu: {
//                     title: '跟踪号上网时间',
//                     icon: 'ion-ios-arrow-right',
//                     order: 0
//                   }
//                 }
//               },
//               {
//                 path: 'order-transport',
//                 data: {
//                   menu: {
//                     title: '跟踪号运输时间',
//                     icon: 'ion-ios-arrow-right',
//                     order: 0
//                   }
//                 }
//               },
//               {
//                 path: 'order-freight',
//                 data: {
//                   menu: {
//                     title: '订单运费统计',
//                     icon: 'ion-ios-arrow-right',
//                     order: 0
//                   }
//                 }
//               },
//             ]
//           },
//           {
//             path: 'purchase-statistics',
//             data: {
//               menu: {
//                 title: '采购统计',
//                 icon: '',
//                 expanded: false,
//                 order: 0
//               }
//             },
//             children: [
//               {
//                 path: 'purchase-money',
//                 data: {
//                   menu: {
//                     title: '采购金额统计',
//                     icon: 'ion-stats-bars',
//                     order: 0
//                   }
//                 }
//               },
//               {
//                 path: 'purchase-detail',
//                 data: {
//                   menu: {
//                     title: '采购订单明细',
//                     icon: 'ion-stats-bars',
//                     order: 0
//                   }
//                 }
//               },
//             ]
//           },
//           {
//             path: 'warehouse-statistics',
//             data: {
//               menu: {
//                 title: '仓库统计',
//                 icon: '',
//                 expanded: false,
//                 order: 0
//               }
//             },
//             children:[
//               {
//                 path: 'logisticsDistribution',
//                 data: {
//                   menu: {
//                     title: '渠道分布统计',
//                     icon: 'ion-ios-arrow-right',
//                     order: 9999
//                   }
//                 },
//               },
//               {
//                 path: 'packagestatistics',
//                 data: {
//                   menu: {
//                     title: '包装绩效统计',
//                     icon: 'ion-ios-arrow-right',
//                     order: 0
//                   }
//                 },
//               },
//               {
//                 path: 'pickupstatistics',
//                 data: {
//                   menu: {
//                     title: '捡货绩效统计',
//                     icon: 'ion-ios-arrow-right',
//                     order: 0
//                   }
//                 },
//               },
//               {
//                 path: 'unpackagestatistics',
//                 data: {
//                   menu: {
//                     title: '拆包绩效统计',
//                     icon: 'ion-ios-arrow-right',
//                     order:0
//                   }
//                 },
//               },
//               {
//                 path: 'weightstatistics',
//                 data: {
//                   menu: {
//                     title: '称重绩效统计',
//                     icon: 'ion-ios-arrow-right',
//                     order: 9999
//                   }
//                 },
//               },
//               {
//                 path: 'packageDeliver',
//                 data: {
//                   menu: {
//                     title: '包裹发货统计',
//                     icon: 'ion-ios-arrow-right',
//                     order: 0
//                   }
//                 },
//               },
//             ]
//           }
//         ]
//       },
//       {
//         path: 'rate',
//         data: {
//           menu: {
//             title: '汇率',
//             icon: 'ion-clipboard',
//             selected: false,
//             expanded: false,
//             order: 0
//           }
//         },
//       },
//       {
//         path: 'systemsetting',
//         data: {
//           menu: {
//             title: '系统设置',
//             icon: 'ion-android-settings',
//             selected: false,
//             expanded: false,
//             order: 0
//           }
//         },
//       },
//       // {
//       //   path: 'components',
//       //   data: {
//       //     menu: {
//       //       title: 'general.menu.components',
//       //       icon: 'ion-gear-a',
//       //       selected: false,
//       //       expanded: false,
//       //       order: 250,
//       //     }
//       //   },
//       //   children: [
//       //     {
//       //       path: 'treeview',
//       //       data: {
//       //         menu: {
//       //           title: 'general.menu.tree_view',
//       //         }
//       //       }
//       //     }
//       //   ]
//       // },
//       // {
//       //   path: 'charts',
//       //   data: {
//       //     menu: {
//       //       title: 'general.menu.charts',
//       //       icon: 'ion-stats-bars',
//       //       selected: false,
//       //       expanded: false,
//       //       order: 200,
//       //     }
//       //   },
//       //   children: [
//       //     {
//       //       path: 'chartist-js',
//       //       data: {
//       //         menu: {
//       //           title: 'general.menu.chartist_js',
//       //         }
//       //       }
//       //     }
//       //   ]
//       // },
//       /* {
//         path: 'ui',
//         data: {
//           menu: {
//             title: 'general.menu.ui_features',
//             icon: 'ion-android-laptop',
//             selected: false,
//             expanded: false,
//             order: 300,
//           }
//         },
//         children: [
//           {
//             path: 'typography',
//             data: {
//               menu: {
//                 title: 'general.menu.typography',
//               }
//             }
//           },
//           {
//             path: 'buttons',
//             data: {
//               menu: {
//                 title: 'general.menu.buttons',
//               }
//             }
//           },
//           {
//             path: 'icons',
//             data: {
//               menu: {
//                 title: 'general.menu.icons',
//               }
//             }
//           },
//           {
//             path: 'modals',
//             data: {
//               menu: {
//                 title: 'general.menu.modals',
//               }
//             }
//           },
//           {
//             path: 'slim',
//             data: {
//               menu: {
//                 title: 'Slim loading bar',
//               }
//             }
//           },
//           {
//             path: 'grid',
//             data: {
//               menu: {
//                 title: 'general.menu.grid',
//               }
//             }
//           },
//         ]
//       },
//       {
//         path: 'forms',
//         data: {
//           menu: {
//             title: 'general.menu.form_elements',
//             icon: 'ion-compose',
//             selected: false,
//             expanded: false,
//             order: 400,
//           }
//         },
//         children: [
//           {
//             path: 'inputs',
//             data: {
//               menu: {
//                 title: 'general.menu.form_inputs',
//               }
//             }
//           },
//           {
//             path: 'layouts',
//             data: {
//               menu: {
//                 title: 'general.menu.form_layouts',
//               }
//             }
//           }
//         ]
//       }, */
//       // {
//       //   path: 'tables',
//       //   data: {
//       //     menu: {
//       //       title: 'general.menu.tables',
//       //       icon: 'ion-grid',
//       //       selected: false,
//       //       expanded: false,
//       //       order: 500,
//       //     }
//       //   },
//       //   children: [
//       //     {
//       //       path: 'basictables',
//       //       data: {
//       //         menu: {
//       //           title: 'general.menu.basic_tables',
//       //         }
//       //       }
//       //     },
//       //     {
//       //       path: 'smarttables',
//       //       data: {
//       //         menu: {
//       //           title: 'general.menu.smart_tables',
//       //         }
//       //       }
//       //     },
//       //     {
//       //       path: 'datatables',
//       //       data: {
//       //         menu: {
//       //           title: 'Data Tables',
//       //         }
//       //       }
//       //     },
//       //      {
//       //        path: 'hottables',
//       //        data: {
//       //          menu: {
//       //            title: 'Hot Tables',
//       //          }
//       //        }
//       //      }
//       //   ]
//       // },
//       // {
//       //   path: 'maps',
//       //   data: {
//       //     menu: {
//       //       title: 'general.menu.maps',
//       //       icon: 'ion-ios-location-outline',
//       //       selected: false,
//       //       expanded: false,
//       //       order: 600,
//       //     }
//       //   },
//       //   children: [
//       //     {
//       //       path: 'googlemaps',
//       //       data: {
//       //         menu: {
//       //           title: 'general.menu.google_maps',
//       //         }
//       //       }
//       //     },
//       //     {
//       //       path: 'leafletmaps',
//       //       data: {
//       //         menu: {
//       //           title: 'general.menu.leaflet_maps',
//       //         }
//       //       }
//       //     },
//       //     {
//       //       path: 'bubblemaps',
//       //       data: {
//       //         menu: {
//       //           title: 'general.menu.bubble_maps',
//       //         }
//       //       }
//       //     },
//       //     {
//       //       path: 'linemaps',
//       //       data: {
//       //         menu: {
//       //           title: 'general.menu.line_maps',
//       //         }
//       //       }
//       //     }
//       //   ]
//       // },
//       // {
//       //   path: '',
//       //   data: {
//       //     menu: {
//       //       title: 'general.menu.pages',
//       //       icon: 'ion-document',
//       //       selected: false,
//       //       expanded: false,
//       //       order: 650,
//       //     }
//       //   },
//       //   children: [
//       //     {
//       //       path: ['/login'],
//       //       data: {
//       //         menu: {
//       //           title: 'general.menu.login'
//       //         }
//       //       }
//       //     },
//       //     {
//       //       path: ['/register'],
//       //       data: {
//       //         menu: {
//       //           title: 'general.menu.register'
//       //         }
//       //       }
//       //     }
//       //   ]
//       // },
//       // {
//       //   path: '',
//       //   data: {
//       //     menu: {
//       //       title: 'general.menu.menu_level_1',
//       //       icon: 'ion-ios-more',
//       //       selected: false,
//       //       expanded: false,
//       //       order: 700,
//       //     }
//       //   },
//       //   children: [
//       //     {
//       //       path: '',
//       //       data: {
//       //         menu: {
//       //           title: 'general.menu.menu_level_1_1',
//       //           url: '#'
//       //         }
//       //       }
//       //     },
//       //     {
//       //       path: '',
//       //       data: {
//       //         menu: {
//       //           title: 'general.menu.menu_level_1_2',
//       //           url: '#'
//       //         }
//       //       },
//       //       children: [
//       //         {
//       //           path: '',
//       //           data: {
//       //             menu: {
//       //               title: 'general.menu.menu_level_1_2_1',
//       //               url: '#'
//       //             }
//       //           }
//       //         }
//       //       ]
//       //     }
//       //   ]
//       // },
//       // {
//       //   path: '',
//       //   data: {
//       //     menu: {
//       //       title: 'general.menu.external_link',
//       //       url: 'http://akveo.com',
//       //       icon: 'ion-android-exit',
//       //       order: 800,
//       //       target: '_blank'
//       //     }
//       //   }
//       // }
//     ]
//   }
// ];
// export let  PAGES_MENU = [];
