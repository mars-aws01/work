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

import { ConnectedOverlayDirective } from './overlay/connected-overlay.directive';
import { Overlay } from './overlay/overlay.service';
import { OverlayContainer } from './overlay/overlay-container.service';
import { OverlayOriginDirective } from './overlay/overlay-origin.directive';
import { OverlayRef } from './overlay/overlay-ref';

export const CORE_DIRECTIVES: any[] = [
  ConnectedOverlayDirective,
  OverlayOriginDirective
];

export const CORE_SERVICES: any[] = [
  Overlay, OverlayContainer,
  ComponentLoaderFactory,
  PositioningService
];

export {
  Overlay,
  OverlayRef,
  OverlayContainer,
  ComponentLoader,
  ComponentLoaderFactory,
  ContentRef,
  Positioning,
  PositioningOptions,
  PositioningService,
  positionElements
};
