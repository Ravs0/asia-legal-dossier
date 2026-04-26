declare module 'react-simple-maps' {
  import * as React from 'react';
  
  export interface GeographyProps {
    geography?: any;
    onClick?: () => void;
    onMouseEnter?: (e: React.MouseEvent<SVGPathElement>) => void;
    onMouseLeave?: () => void;
    style?: {
      default?: React.CSSProperties;
      hover?: React.CSSProperties;
      pressed?: React.CSSProperties;
    };
  }
  
  export interface GeographiesProps {
    geography: string | object;
    children: (props: { geographies: any[] }) => React.ReactNode;
  }
  
  export interface ComposableMapProps {
    projection?: string;
    projectionConfig?: object;
    width?: number;
    height?: number;
    viewBox?: string;
    className?: string;
    children?: React.ReactNode;
  }
  
  export interface ZoomableGroupProps {
    zoom?: number;
    center?: [number, number];
    minZoom?: number;
    maxZoom?: number;
    onMoveEnd?: (pos: { coordinates: [number, number]; zoom: number }) => void;
    children?: React.ReactNode;
  }
  
  export const Geography: React.FC<GeographyProps>;
  export const Geographies: React.FC<GeographiesProps>;
  export const ComposableMap: React.FC<ComposableMapProps>;
  export const ZoomableGroup: React.FC<ZoomableGroupProps>;
}
