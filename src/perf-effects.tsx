'use client';
import * as React from 'react';
import { Menu } from '@base-ui-components/react/menu';
import { Tooltip } from '@base-ui-components/react/tooltip';

type RowData = {
  label: string;
  index: number;
};

const rowCount = 1;
const menuItemCount = 50;

const rows = Array.from({ length: rowCount }).map((_, i) => ({
  label: `Row ${i + 1}`,
  index: i + 1,
}));

const menuItems = Array.from({ length: menuItemCount }).map((_, i) => ({
  label: `Menu Item ${i + 1}`,
  index: i + 1,
}));

const rowMenuHandle = Menu.createHandle<RowData>();

export default function Component() {
  return (
    <div>
      <Menu.Trigger handle={rowMenuHandle} payload={rows[0]}>
        Menu
      </Menu.Trigger>
      <RowMenu />
    </div>
  );
}

function RowMenu() {
  return (
    <Menu.Root handle={rowMenuHandle}>
      {({ payload: rowData }) => (
        <Menu.Portal>
          <Menu.Positioner sideOffset={8}>
            <Menu.Popup>
              {rowData && (
                <React.Fragment>
                  {menuItems.map((item) => (
                    <Menu.Item
                      key={item.index}
                      onClick={() =>
                        console.log(`Clicked ${item.label} for ${rowData.label}`)
                      }
                    >
                      {item.label} for {rowData.label}
                    </Menu.Item>
                  ))}
                </React.Fragment>
              )}
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      )}
    </Menu.Root>
  );
}
