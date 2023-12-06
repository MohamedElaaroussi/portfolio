import {ChipProps} from "@nextui-org/react";

export const playerRoleColorMap: { [status: string]: string } = {
    player: "green",
    host: "yellow",
};

export const orderStatusColorMap: Record<string, ChipProps["color"]> = {
    paid: "success",
    pending: "danger",
  };
  
export const statusColorMap: Record<string, ChipProps["color"]> = {
    filled: "success",
    cancelled: "danger",
    pending: "warning",
  };  