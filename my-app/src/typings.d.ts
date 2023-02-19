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
