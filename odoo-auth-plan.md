# Odoo Auth Experiment

Esta rama `odoo-auth` es para probar si se puede integrar Odoo con la app.

## Qué se ha hecho

- Se creó la rama `odoo-auth`.
- Se agregó un botón experimental para abrir el portal Odoo desde la app.
- Se mantiene la autenticación principal con Google/Firebase para no romper la app.

## Qué significa esto

La aplicación actual sigue siendo una web estática con Firebase Auth.
No está integrada directamente con Odoo, porque Odoo no es un proveedor de OAuth estándar listo para usar desde Firebase.

## Qué se necesita para hacer una integración real

1. Ver si Odoo puede actuar como proveedor OAuth/OIDC o si hay un endpoint de login API.
2. Si es posible, necesitaríamos un backend/middleware para:
   - intercambiar tokens con Odoo
   - validar sesiones
   - redirigir a la app con un token propio
3. Alternativamente, usar Odoo solo como fuente de datos y mantener login en Firebase.

## Próximos pasos

- Probar el botón que abre Odoo desde la app.
- Revisar si Odoo ofrece OAuth2/OpenID Connect en la instancia de Seguas.
- Si no, decidir si mantener Google Auth y usar Odoo solo como back-office.
