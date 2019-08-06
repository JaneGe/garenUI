import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import {ApiService} from "../../../../../shared/services/api.service";
import { URLSearchParams } from "@angular/http";
import {EndPointsConfig} from "../../../../../shared/Config";
import {ApiResponseBaseModel} from "../../../../../shared/models/api.response.basemodel";

@Injectable()
export class TreesService {
  constructor(public apiService: ApiService) {

  }

  ResourceQuery(roleId:any): Observable<ApiResponseBaseModel<any>> {
    let searchParams = new URLSearchParams();
    searchParams.set('roleId', roleId);
    return this.apiService.get(EndPointsConfig.EndPoints.Role_ResourceQuery,searchParams);
  }
  GetOperationByResource(menus:any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.Role_GetOperationByResource, menus);
  }
  SaveRoleAndResource(datas:any): Observable<ApiResponseBaseModel<any>> {
    return this.apiService.post(EndPointsConfig.EndPoints.Role_SaveRoleAndResource, datas);
  }
  GetRoleById(roleId:any): Observable<ApiResponseBaseModel<any>> {
    let searchParams = new URLSearchParams();
    searchParams.set('id', roleId);
  return this.apiService.get(EndPointsConfig.EndPoints.Role_GetOneRole, searchParams);
}
  DeleteRoleInfoById(roleId:any): Observable<ApiResponseBaseModel<any>> {
    let searchParams = new URLSearchParams();
    searchParams.set('roleId', roleId);
    return this.apiService.get(EndPointsConfig.EndPoints.Role_DeleteRoleInfoById, searchParams);
  }

    menu = [
        {
            isChecked: true,
            path: 'index',
            data: {
                menu: {
                    title: 'index',
                    icon: 'ion-android-home',
                    selected: false,
                    expanded: false,
                    order: 0
                }
            },
            children: [
                {
                    isChecked: true,
                    path: 'boss',
                    data: {
                        menu: {
                            title: 'boss',
                        }
                    }
                },
                {
                    isChecked: true,
                    path: 'finance',
                    data: {
                        menu: {
                            title: 'finance',
                        }
                    }
                },
                {
                    isChecked: true,
                    path: 'groupLeader',
                    data: {
                        menu: {
                            title: 'groupLeader',
                        }
                    }
                },
                {
                    isChecked: true,
                    path: 'employee',
                    data: {
                        menu: {
                            title: 'employee',
                        }
                    }
                },
                {
                    isChecked: true,
                    path: 'storage-leader',
                    data: {
                        menu: {
                            title: 'storage-leader',
                        }
                    }
                },
                {
                    isChecked: true,
                    path: 'storage-employee',
                    data: {
                        menu: {
                            title: 'storage-employee',
                        }
                    }
                },
            ]
        },
        {
            isChecked: true,
            path: 'order',
            data: {
                menu: {
                    title: '订单',
                    icon: 'ion-clipboard',
                    selected: false,
                    expanded: false,
                    order: 0
                }
            },
            children: [
                {
                    isChecked: true,
                    path: 'pending-allocation',
                    data: {
                        menu: {
                            title: '待配货',
                            icon: 'ion-star',
                        }
                    }
                },
                {
                    isChecked: true,
                    path: 'manualhanding',
                    data: {
                        menu: {
                            title: '需人工处理',
                            icon: '',
                            expanded: false,
                            order: 0
                        }
                    },
                    children: [
                        {
                            isChecked: true,
                            path: 'needmanual',
                            data: {
                                menu: {
                                    title: '需人工审核',
                                    icon: 'ion-ios-arrow-right',
                                }
                            }
                        },
                        {
                            isChecked: true,
                            path: 'outtimerisk',
                            data: {
                                menu: {
                                    title: '有超期风险',
                                    icon: 'ion-ios-arrow-right',
                                }
                            }
                        },
                        {
                            isChecked: true,
                            path: 'lossinfo',
                            data: {
                                menu: {
                                    title: '收货信息不全',
                                    icon: 'ion-ios-arrow-right',
                                }
                            }
                        },
                        {
                            isChecked: true,
                            path: 'needtracenum',
                            data: {
                                menu: {
                                    title: '需跟踪号',
                                    icon: 'ion-ios-arrow-right',
                                }
                            }
                        },
                        {
                            isChecked: true,
                            path: 'nosku',
                            data: {
                                menu: {
                                    title: '商品关联失败',
                                    icon: 'ion-ios-arrow-right',
                                }
                            }
                        }, {
                            isChecked: true,
                            path: 'lossedcustoms',
                            data: {
                                menu: {
                                    title: '报关信息缺失',
                                    icon: 'ion-ios-arrow-right',
                                }
                            }
                        },
                        {
                            isChecked: true,
                            path: 'failedallocate',
                            data: {
                                menu: {
                                    title: '分配失败',
                                    icon: 'ion-ios-arrow-right',
                                }
                            }
                        }, {
                            isChecked: true,
                            path: 'failedfreight',
                            data: {
                                menu: {
                                    title: '运费计算失败',
                                    icon: 'ion-ios-arrow-right',
                                }
                            }
                        }, {
                            isChecked: true,
                            path: 'lowprofit',
                            data: {
                                menu: {
                                    title: '订单利润过低',
                                    icon: 'ion-ios-arrow-right',
                                }
                            }
                        },
                        {
                            isChecked: true,
                            path: 'nostorage',
                            data: {
                                menu: {
                                    title: '缺货',
                                    icon: 'ion-ios-arrow-right',
                                }
                            }
                        },
                        {
                            isChecked: true,
                            path: 'errorlogistics',
                            data: {
                                menu: {
                                    title: '物流异常',
                                    icon: 'ion-ios-arrow-right',
                                }
                            }
                        },
                        {
                            isChecked: true,
                            path: 'failedback',
                            data: {
                                menu: {
                                    title: '回传失败',
                                    icon: 'ion-ios-arrow-right',
                                }
                            }
                        },
                        {
                            isChecked: true,
                            path: 'mergeorder',
                            data: {
                                menu: {
                                    title: '合并订单',
                                    icon: 'ion-ios-arrow-right',
                                }
                            }
                        },
                        {
                            isChecked: true,
                            path: 'canceldeliver',
                            data: {
                                menu: {
                                    title: '仓库取消发货',
                                    icon: 'ion-ios-arrow-right',
                                }
                            }
                        },
                    ],
                },
                {
                    isChecked: true,
                    path: 'orderSearch',
                    data: {
                        menu: {
                            title: '订单列表',
                        }
                    },
                    permissionDetail: [
                        {
                            text: '查看',
                            name: 'onlyView',
                            hasPermission: true,
                        },
                        {
                            text: '导出',
                            name: 'outPut',
                            hasPermission: false,
                        },
                        {
                            text: '编辑订单地址',
                            name: 'editOrderAddress',
                            hasPermission: false,
                        },
                    ]
                },
                {
                    isChecked: true,
                    path: 'packageSearch',
                    data: {
                        menu: {
                            title: '包裹列表',
                        }
                    },
                    permissionDetail: [
                        {
                            text: '查看',
                            name: 'onlyView',
                            hasPermission: true,
                        },
                        {
                            text: '导出',
                            name: 'outPut',
                            hasPermission: false,
                        },
                        {
                            text: '标记拣货失败',
                            name: 'signPackingFailure',
                            hasPermission: false,
                        },
                        {
                            text: '打印面单',
                            name: 'printBill',
                            hasPermission: false,
                        },
                        {
                            text: '重新分配',
                            name: 'reallocate',
                            hasPermission: false,
                        },
                        {
                            text: '作废',
                            name: 'cancellation',
                            hasPermission: false,
                        },
                        {
                            text: '拆分包裹',
                            name: 'splitPackage',
                            hasPermission: false,
                        },
                        {
                            text: '获取跟踪号',
                            name: 'getTrackNumber',
                            hasPermission: false,
                        },
                    ]
                },
                {
                    isChecked: true,
                    path: 'shippingTrack',
                    data: {
                        menu: {
                            title: '物流跟踪',
                        }
                    }
                },
                {
                    isChecked: true,
                    path: 'salesReturn',
                    data: {
                        menu: {
                            title: '退货列表',
                        }
                    }
                },


            ]
        },
        {
            isChecked: true,
            path: 'skuinfos',
            data: {
                menu: {
                    title: '商品',
                    icon: 'ion-cube',
                    selected: false,
                    expanded: false,
                    order: 0
                }
            },
            children: [
                {
                    isChecked: true,
                    path: 'skuinfos',
                    data: {
                        menu: {
                            title: '商品信息',
                        }
                    }
                }
            ]
        },
        {
            isChecked: true,
            path: 'purchase',
            data: {
                menu: {
                    title: '采购',
                    icon: 'ion-ios-cart',
                    expanded: false,
                }
            },
            children: [
                {
                    isChecked: true,
                    path: 'purchasePond',
                    data: {
                        menu: {
                            title: '采购建议',
                        }
                    }
                },
                {
                    isChecked: true,
                    path: 'purchasePondDetail',
                    data: {
                        menu: {
                            title: '采购单',
                        }
                    }
                },
                {
                    isChecked: true,
                    path: '1688purchaseOrder',
                    data: {
                        menu: {
                            title: '网络采购订单',
                        }
                    }
                },
            ]
        },
        {
            isChecked: true,
            path: 'storage',
            data: {
                menu: {
                    title: '仓库',
                    icon: 'ion-ios-home-outline',
                    selected: false,
                    expanded: false,
                    order: 0
                }
            }, children: [
                {
                    isChecked: true,
                    path: 'quantity',
                    data: {
                        menu: {
                            title: '库存数量',
                        }
                    }
                },
                {
                    isChecked: true,
                    path: 'storageFlow',
                    data: {
                        menu: {
                            title: '库存流水',
                        }
                    }
                },
                {
                    isChecked: true,
                    path: 'setting',
                    data: {
                        menu: {
                            title: '仓库设置',
                        }
                    }
                },
                {
                    isChecked: true,
                    path: 'receiverecord',
                    data: {
                        menu: {
                            title: '收货记录',
                        }
                    }
                },
                {
                    isChecked: true,
                    path: 'package-return-list',
                    data: {
                        menu: {
                            title: '退件记录',
                        }
                    }
                },
                {
                    isChecked: true,
                    path: 'unpacking',
                    data: {
                        menu: {
                            title: '货品拆包',
                        }
                    }
                },
                {
                    isChecked: true,
                    path: 'packingTask',
                    data: {
                        menu: {
                            title: '拣货任务',
                        }
                    }
                },
                {
                    isChecked: true,
                    path: 'packageScan',
                    data: {
                        menu: {
                            title: '打印面单（单品）',
                        }
                    }
                },
                {
                    isChecked: true,
                    path: 'shipments',
                    data: {
                        menu: {
                            title: '核重发货',
                        }
                    }
                },
                {
                    isChecked: true,
                    path: 'SecondTimes',
                    data: {
                        menu: {
                            title: '二次分拣',
                        }
                    }
                },
                {
                    isChecked: true,
                    path: 'ThirdTimes',
                    data: {
                        menu: {
                            title: '多品复核',
                        }
                    }
                },
                {
                    isChecked: true,
                    path: 'checkPackage',
                    data: {
                        menu: {
                            title: '包裹检验',
                        }
                    }
                },
                {
                    isChecked: true,
                    path: 'abnormal-package',
                    data: {
                        menu: {
                            title: '异常件处理',
                        }
                    }
                },
                {
                    isChecked: true,
                    path: 'handDevice',
                    data: {
                        menu: {
                            title: '手持终端',
                        }
                    }
                },
            ]
        },
        {
            isChecked: true,
            path: 'logistics',
            data: {
                menu: {
                    title: '物流',
                    icon: 'ion-plane',
                    selected: false,
                    expanded: false,
                    order: 0
                }
            },
            children: [
                {
                    isChecked: true,
                    path: 'sp-auth-list',
                    data: {
                        menu: {
                            title: 'API授权',
                        }
                    }
                },
                {
                    isChecked: true,
                    path: 'shipping-service-list',
                    data: {
                        menu: {
                            title: '物流方式列表',
                        }
                    }
                },
                {
                    isChecked: true,
                    path: 'max-declartion-list',
                    data: {
                        menu: {
                            title: '最大报关金额设置',
                        }
                    }
                }
            ]
        },
        {
            isChecked: true,
            path: 'rules',
            data: {
                menu: {
                    title: '规则',
                    icon: 'ion-ios-shuffle-strong',
                    selected: false,
                    expanded: false,
                    order: 20
                }
            }, children: [
                {
                    isChecked: true,
                    path: 'orderRules',
                    data: {
                        menu: {
                            title: '订单规则',
                        }
                    }
                },
                {
                    isChecked: true,
                    path: 'storageRules',
                    data: {
                        menu: {
                            title: '仓库规则',
                        }
                    }
                },
                {
                    isChecked: true,
                    path: 'logisticsRules',
                    data: {
                        menu: {
                            title: '物流分配规则',
                        }
                    }
                },
                {
                    isChecked: true,
                    path: 'selectPlateform',
                    data: {
                        menu: {
                            title: '标记发货规则',
                        }
                    },
                }

            ]
        },
        {
            isChecked: true,
            path: 'settings',
            data: {
                menu: {
                    title: '设置',
                    icon: 'ion-gear-b',
                    selected: false,
                    expanded: false,
                    order: 100,
                }
            },
            children: [
                {
                    isChecked: true,
                    path: 'members',
                    data: {
                        menu: {
                            title: '成员管理',
                        }
                    }
                },
                {
                    isChecked: true,
                    path: 'roles',
                    data: {
                        menu: {
                            title: '角色管理',
                        }
                    }
                },
                {
                    isChecked: true,
                    path: 'departments',
                    data: {
                        menu: {
                            title: '部门管理',
                        }
                    }
                },
                {
                    isChecked: true,
                    path: 'account-bind',
                    data: {
                        menu: {
                            title: '账号授权',
                        }
                    }
                },
                {
                    isChecked: true,
                    path: 'notice',
                    data: {
                        menu: {
                            title: '公告列表',
                        }
                    }
                },
                {
                    isChecked: true,
                    path: 'settingKpi',
                    data: {
                        menu: {
                            title: '员工KPI',
                        }
                    }
                },
                {
                    isChecked: true,
                    path: 'userInfo',
                    data: {
                        menu: {
                            title: '个人设置',
                        }
                    }
                },
                {
                    isChecked: true,
                    path: 'blacklist',
                    data: {
                        menu: {
                            title: '黑名单用户',
                        }
                    }
                }
            ]
        },
        {
            isChecked: true,
            path: 'customer-services',
            data: {
                menu: {
                    title: '客服',
                    icon: 'ion-person-stalker',
                    expanded: false,
                }
            },
            children: [
                {
                    isChecked: true,
                    path: 'amazon-services',
                    data: {
                        menu: {
                            title: '待办邮件',
                        }
                    }
                }
            ]
        },
        {
            isChecked: true,
            path: 'statistics',
            data: {
                menu: {
                    title: '统计',
                    icon: 'ion-stats-bars',
                    selected: false,
                    expanded: false,
                    order: 0
                }
            },
            children: [
                {
                    isChecked: true,
                    path: 'orderstatistics',
                    data: {
                        menu: {
                            title: '订单统计',
                            expanded: false,
                            icon: '',
                            order: 0
                        }
                    },
                    children: [
                        {
                            isChecked: true,
                            path: 'order-money',
                            data: {
                                menu: {
                                    title: '订单金额统计',
                                    icon: 'ion-ios-arrow-right',
                                    order: 0
                                }
                            }
                        },
                        {
                            isChecked: true,
                            path: 'order-back-money',
                            data: {
                                menu: {
                                    title: '退款金额统计',
                                    icon: 'ion-ios-arrow-right',
                                    order: 0
                                }
                            }
                        },
                        {
                            isChecked: true,
                            path: 'order-country-money',
                            data: {
                                menu: {
                                    title: '国家金额分布',
                                    icon: 'ion-ios-arrow-right',
                                    order: 0
                                }
                            }
                        },
                        {
                            isChecked: true,
                            path: 'order-account-money',
                            data: {
                                menu: {
                                    title: '帐号金额分布',
                                    icon: 'ion-ios-arrow-right',
                                    order: 9999,
                                }
                            }
                        },
                        {
                            isChecked: true,
                            path: 'order-num',
                            data: {
                                menu: {
                                    title: '订单数量统计',
                                    icon: 'ion-ios-arrow-right',
                                    order: 0
                                }
                            }
                        },

                        {
                            isChecked: true,
                            path: 'order-back-num',
                            data: {
                                menu: {
                                    title: '退款单量统计',
                                    icon: 'ion-ios-arrow-right',
                                    order: 0
                                }
                            }
                        },
                        {
                            isChecked: true,
                            path: 'order-country',
                            data: {
                                menu: {
                                    title: '国家单量分布',
                                    icon: 'ion-ios-arrow-right',
                                    order: 0
                                }
                            }
                        },

                        {
                            isChecked: true,
                            path: 'order-account',
                            data: {
                                menu: {
                                    title: '帐号单量分布',
                                    icon: 'ion-ios-arrow-right',
                                    order: 9999,
                                }
                            }
                        },
                        {
                            isChecked: true,
                            path: 'groupsale',
                            data: {
                                menu: {
                                    title: '小组销售统计',
                                    icon: 'ion-ios-arrow-right',
                                    order: 0
                                }
                            }
                        },
                        {
                            isChecked: true,
                            path: 'order-tracenum',
                            data: {
                                menu: {
                                    title: '跟踪号上网时间',
                                    icon: 'ion-ios-arrow-right',
                                    order: 0
                                }
                            }
                        },
                        {
                            isChecked: true,
                            path: 'order-transport',
                            data: {
                                menu: {
                                    title: '跟踪号运输时间',
                                    icon: 'ion-ios-arrow-right',
                                    order: 0
                                }
                            }
                        },
                        {
                            isChecked: true,
                            path: 'order-freight',
                            data: {
                                menu: {
                                    title: '订单运费统计',
                                    icon: 'ion-ios-arrow-right',
                                    order: 0
                                }
                            }
                        },
                    ]
                },
                {
                    isChecked: true,
                    path: 'purchase-statistics',
                    data: {
                        menu: {
                            title: '采购统计',
                            icon: '',
                            expanded: false,
                            order: 0
                        }
                    },
                    children: [
                        {
                            isChecked: true,
                            path: 'purchase-money',
                            data: {
                                menu: {
                                    title: '采购金额统计',
                                    icon: 'ion-stats-bars',
                                    order: 0
                                }
                            }
                        },
                        {
                            isChecked: true,
                            path: 'purchase-detail',
                            data: {
                                menu: {
                                    title: '采购订单明细',
                                    icon: 'ion-stats-bars',
                                    order: 0
                                }
                            }
                        },
                    ]
                },
                {
                    isChecked: true,
                    path: 'warehouse-statistics',
                    data: {
                        menu: {
                            title: '仓库统计',
                            icon: '',
                            expanded: false,
                            order: 0
                        }
                    },
                    children: [
                        {
                            isChecked: true,
                            path: 'logisticsDistribution',
                            data: {
                                menu: {
                                    title: '渠道分布统计',
                                    icon: 'ion-ios-arrow-right',
                                    order: 9999
                                }
                            },
                        },
                        {
                            isChecked: true,
                            path: 'packagestatistics',
                            data: {
                                menu: {
                                    title: '包装绩效统计',
                                    icon: 'ion-ios-arrow-right',
                                    order: 0
                                }
                            },
                        },
                        {
                            isChecked: true,
                            path: 'pickupstatistics',
                            data: {
                                menu: {
                                    title: '捡货绩效统计',
                                    icon: 'ion-ios-arrow-right',
                                    order: 0
                                }
                            },
                        },
                        {
                            isChecked: true,
                            path: 'unpackagestatistics',
                            data: {
                                menu: {
                                    title: '拆包绩效统计',
                                    icon: 'ion-ios-arrow-right',
                                    order: 0
                                }
                            },
                        },
                        {
                            isChecked: true,
                            path: 'weightstatistics',
                            data: {
                                menu: {
                                    title: '称重绩效统计',
                                    icon: 'ion-ios-arrow-right',
                                    order: 9999
                                }
                            },
                        },
                        {
                            isChecked: true,
                            path: 'packageDeliver',
                            data: {
                                menu: {
                                    title: '包裹发货统计',
                                    icon: 'ion-ios-arrow-right',
                                    order: 0
                                }
                            },
                        },
                    ]
                }
            ]
        },
        {
            isChecked: true,
            path: 'rate',
            data: {
                menu: {
                    title: '汇率',
                    icon: 'ion-clipboard',
                    selected: false,
                    expanded: false,
                    order: 0
                }
            },
        },
        {
            isChecked: true,
            path: 'systemsetting',
            data: {
                menu: {
                    title: '系统设置',
                    icon: 'ion-android-settings',
                    selected: false,
                    expanded: false,
                    order: 0
                }
            },
        },
    ]
}
