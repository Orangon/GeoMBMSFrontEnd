declare module 'slash2';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'omit.js';
declare module 'numeral';
declare module '@antv/data-set';
declare module 'mockjs';
declare module 'react-fittext';
declare module 'bizcharts-plugin-slider';

// preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design Dedicated environment variable, please do not use it in your project.
declare let ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: 'site' | undefined;

declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false;
declare interface Window {
  appSetting: {
      systemId: string;
      davApi: string;
      dataApi: string;
      mapApi: string;
      bigDataApi: string;
      authApi: string,
      mqtt: {
          url: string,
          options: any
      },
      gwApi: string;
      dataEngineApi: string;
      defaultServiceTags: string[];
      serviceDocument: (service: any) => any;
      copyright: string;
  };
  cookie: {
      path: string;
      domain: string;
  }
  baseMapSetting: {
      mapOptions: any;
      baseLayers: any[];
      layers: any[];
      vectorLayer: (dataType: string | undefined) => any;
      lercMap: any;
  };
  printSetting: {
      defaultTooltipColor: any;
      tooltipColors: string[];
      defaultTooltipFontColor: any;
      tooltipFontColors: string[];
      properties: any[];
      icon: (feature: any) => any;
      gridLayerStyle: any;
      gridLine: any;
      scaleFactor: number;
      zoomSnap: number;
  };
  compareSetting: {
      properties: any[]
  }
  cookbook: {
      uri?: string;
      entry: string;
  }
  consoleWeb: {
      app: {
          name: string;
          entry: string;
          container: string;
      },
      configuration?: any;
  }
}
declare namespace OneSIS {

  type ResponseType<T> = {
      code?: number | string;
      data?: T;
      message?: string;
      success: boolean;
  };

  type PagedResponseType<T> = {
      code?: number | string;
      data?: {
          rows?: T;
          total?: number;
      }
      message?: string;
      success?: boolean;
  };

  type HalPagedResponseType<T> = {
      page: {
          number?: number;
          size?: number;
          totalElements?: number;
          totalPages?: number;
      };
      _embedded: T;
      _links: {
          self?: {
              href?: string;
          },
          [key: string]: {
              href?: string;
          }
      }
  }

  type MapPluginDataType = {
      show: boolean;
      position?: string;
      layers?: any[];
  }

  type MapDataType = {
      id: string;
      zoomControl?: boolean;
      layers: any[];
      fullScreen?: MapPluginDataType;
      measure?: MapPluginDataType;
      coordinates?: MapPluginDataType;
      easyPrint?: MapPluginDataType;
      baseMaps?: MapPluginDataType;
  }

  type CRSObject = {
      bounds: number[];
  }

  type InitialData = {
      currentUser?: OneSIS.User;
      authority?: OneSIS.Authority[];
      loading?: boolean;
      fetchUserInfo?: () => Promise<OneSIS.User | undefined>;
      fetchAuthority?: () => Promise<OneSIS.Authority[] | undefined>;
  }

  type Menu = {
      // id
      id?: string;
      // 名称
      name?: string;
      // 权限编码：前端用于限权
      code?: string;
      // 上级权限ID
      parentId?: string;
      // 所属系统ID
      systemId?: string;
      // 是否启用
      enabled?: boolean;
      // 权限类型,可用值:BUTTON,MENU,MODULE
      type?: 'BUTTON' | 'MENU' | 'MODULE'
      // 路径
      url?: string;
      // 图标
      icon?: string;
      // 创建时间
      createTime?: date;
      // 排序：小值优先
      sort?: number;
      // 子节点
      children?: OneSIS.Menu[]
  };

  type Authority = {} & Menu

}
