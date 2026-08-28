"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CLINIC } from "@/lib/data";

export function PrivacyDialog() {
  return (
    <Dialog>
      <DialogTrigger className="font-medium text-primary underline underline-offset-2 hover:text-primary/80">
        aviso de privacidad
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Aviso de Privacidad</DialogTitle>
          <DialogDescription>
            {CLINIC.fullName} — Última actualización: enero de 2025
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            En {CLINIC.name} recopilamos únicamente los datos de contacto
            básicos que nos proporcionas en este formulario (nombre,
            teléfono, correo electrónico, especialidad de interés y fecha
            preferida) con el único fin de gestionar tu solicitud de cita
            médica y contactarte para confirmarla.
          </p>
          <p>
            No solicitamos ni almacenamos diagnósticos, historiales clínicos
            ni ningún otro dato de salud a través de este sitio web. Tu
            información no será compartida con terceros salvo requerimiento
            legal.
          </p>
          <p>
            Puedes solicitar la actualización o eliminación de tus datos
            personales en cualquier momento escribiéndonos a través de
            nuestros canales oficiales de contacto.
          </p>
          <p>
            Al aceptar este aviso, confirmas que has leído y comprendido el
            uso que daremos a tu información, conforme a la legislación de
            protección de datos personales vigente.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
