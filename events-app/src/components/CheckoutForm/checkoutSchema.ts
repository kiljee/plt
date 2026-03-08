import * as yup from "yup"
import { isValidPhoneNumber } from "@/lib/phone"

export interface CheckoutFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address?: string
  postalCode?: string
  city?: string
  country?: string
  agreeTerms: boolean
}

export const checkoutSchema = yup.object({
  firstName: yup
    .string()
    .required("Unesite ime")
    .default(""),
  lastName: yup
    .string()
    .required("Unesite prezime")
    .default(""),
  email: yup
    .string()
    .required("Unesite email adresu")
    .email("Unesite ispravnu email adresu (npr. primer@email.com)"),
  phone: yup
    .string()
    .required("Unesite broj telefona za kontakt")
    .test("valid-phone", "Unesite ispravan broj telefona", isValidPhoneNumber),
  address: yup.string().optional().default(""),
  postalCode: yup.string().optional().default(""),
  city: yup.string().optional().default(""),
  country: yup.string().optional().default(""),
  agreeTerms: yup
    .boolean()
    .oneOf([true], "Morate prihvatiti uslove korišćenja da biste nastavili"),
})

export const checkoutDefaultValues: CheckoutFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  postalCode: "",
  city: "",
  country: "Serbia",
  agreeTerms: false,
}
