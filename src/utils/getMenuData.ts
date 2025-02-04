import { transformRoute } from '@umijs/route-utils';

import { MenuDataItem, Route, MessageDescriptor } from '../typings';

function fromEntries(iterable: any) {
  return [...iterable].reduce(
    (
      obj: {
        [key: string]: MenuDataItem;
      },
      [key, val],
    ) => {
      // eslint-disable-next-line no-param-reassign
      obj[key] = val;
      return obj;
    },
    {},
  );
}

export default (
  routes: Route[],
  menu?: { locale?: boolean },
  formatMessage?: (message: MessageDescriptor) => string,
  menuDataRender?: (menuData: MenuDataItem[]) => MenuDataItem[],
) => {
  const { menuData, breadcrumb } = transformRoute(
    routes,
    menu?.locale || false,
    formatMessage,
  );
  if (!menuDataRender) {
    return {
      breadcrumb: fromEntries(breadcrumb),
      breadcrumbMap: breadcrumb,
      menuData,
    };
  }
  const renderData = transformRoute(
    menuDataRender(menuData),
    menu?.locale || false,
    formatMessage,
  );
  return {
    breadcrumb: fromEntries(breadcrumb),
    breadcrumbMap: breadcrumb,
    menuData: renderData.menuData,
  };
};
