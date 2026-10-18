import { XCircle } from "lucide-react";
import { CART_NOTICE_STYLES } from "./CartNotice.styles";

export interface CartNoticeProps {
  title: string;
  message: string;
}

export const CartNotice = ({ title, message }: CartNoticeProps) => (
  <div className={CART_NOTICE_STYLES.root} role="alert">
    <XCircle className={CART_NOTICE_STYLES.icon} aria-hidden />
    <div className={CART_NOTICE_STYLES.content}>
      <p className={CART_NOTICE_STYLES.title}>{title}</p>
      <p className={CART_NOTICE_STYLES.message}>{message}</p>
    </div>
  </div>
);
