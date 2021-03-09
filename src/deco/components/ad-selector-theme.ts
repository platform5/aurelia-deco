import { UxTheme } from '@aurelia-ux/core';

export class AdSelectorTheme implements UxTheme {
  public themeKey: 'ad-selector';

  public foreground?: string;
  public foregroundLabel?: string;
  public background?: string;
  public backgroundHover?: string;
  public activeColor?: string;

  public fontSize?: string;
  public letterSpacing?: string;
  public labelFontSize?: string;
  public labelLetterSpacing?: string;
  public lineHeight?: string;
  public labelLineHeight?: string;

  public borderColor?: string;
  public borderRadius?: string;
  public borderWidth?: string;
  public borderActiveWidth?: string;

  public disabledForeground?: string;
  public disabledBackground?: string;

  public error?: string;
}