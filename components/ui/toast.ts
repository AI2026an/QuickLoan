import React from "react";

export type ToastActionElement = React.ReactElement;

export type ToastProps = {
  title?: string;
  description?: string;
  duration?: number;
  open?: boolean;
};
