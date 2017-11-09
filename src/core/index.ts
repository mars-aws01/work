import {
  ComponentLoader,
  ComponentLoaderFactory,
  ContentRef
} from './component-loader';
import {
  Positioning,
  PositioningOptions,
  PositioningService,
  positionElements
} from './positioning';

export const CORE_SERVICES: any[] = [
  ComponentLoaderFactory,
  PositioningService
];

export {
  ComponentLoader,
  ComponentLoaderFactory,
  ContentRef,
  Positioning,
  PositioningOptions,
  PositioningService,
  positionElements
};
