---
title: Servidor NodeJs + Typescript + ExpressJs
description: Guía completa para crear un servidor robusto con Node.js, TypeScript
  y Express.
date: '2024-10-07'
tags:
- webdev
- node
- typescript
- backend
devToUrl: https://dev.to/eduuu_dev/servidor-nodejs-typescript-expressjs-59jk
coverImage: https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F317udw98o2q9c0yiepel.png
---

Express es un framework web minimalista popular para Node.js. Permite crear aplicaciones web de manera sencilla y rápida, tiene una documentación bastante completa que puedes revisar [aquí](https://expressjs.com/).

En este tutorial, te explico cómo puedes crear tú primer servidor Express en TypeScript.

---

## Paso 1: Configuración del entorno de desarrollo
Asegúrate de tener Node.js y npm instalados en tú máquina. Para instalar estas tecnologías, puedes seguir los pasos de sus sitios oficiales.

- [NodeJs ](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)

Luego, debes dirigirte a la ubicación donde quieres guardar tú proyecto, y crear una carpeta con el nombre que prefieras. En mi caso utilizaré ts-server.

```
mkdir ts-server
cd ts-server
```

Para iniciar el proyecto node con configuraciones por defecto, debes utilizar el siguiente comando.

```
npm init -y
```
Para iniciar un repositorio git, debes utilizar el siguiente comando.

```
git init
```
Luego, debes crear un archivo .gitignore en la raíz del directorio, este archivo sirve, para ignorar ciertos directorios o archivos, que no son necesarios subir al repositorio remoto.

Al crear .gitignore, puedes entrar al siguiente [link](https://www.toptal.com/developers/gitignore), donde para este caso, puedes sumar las siguientes restricciones.

![Generador gitignore](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/2snzd0wywpzflmzja1mu.png)

Esto generará el contenido necesario para el .gitignore, por lo que lo debes copiar y pegar en el archivo que creaste.

A continuación, debes agregar un archivo .editorconfig en la raíz del directorio, que su objetivo, es tener un estandar en el editor que utilices, así si otros desarrolladores quieren aportar en el proyecto, estará esta configuración centralizada.

```
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.js]
quote_type = single

[*.md]
max_line_length = off
trim_trailing_whitespace = false
```
También es necesario configurar un linter, para seguir un estándar de código, por lo que debes crear un .eslintrc.json en la raíz del directorio con una configuración similar a esta.

```
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "env": {
    "es6": true,
    "node": true,
    "jest": true
  },
  "plugins": ["@typescript-eslint"],
  "rules": {
    "no-console": "warn"
  }
}
```
Con esto, tienes la configuración principal de tú proyecto.

## Paso 2: Instalación de dependencias
Para continuar con el proyecto, es necesario que instalemos las dependencias que necesitamos en nuestro proyecto.

Estas serían las dependencias que se necesitan en un entorno de desarrollo, esto quiere decir que no son necesarias cuando el servidor esté en producción.

- @types/express --> Proporciona definiciones de tipo para el framework Express.
- @typescript-eslint/eslint-plugin --> Un plugin de ESLint que contiene un conjunto de reglas específicas para TypeScript.
- @typescript-eslint/parser --> Un parser que permite a ESLint entender TypeScript. Es necesario para que ESLint pueda analizar y aplicar reglas a los archivos TypeScript.
- eslint -->  Es una herramienta de análisis de código estático para identificar patrones problemáticos en el código JavaScript.
- eslint-config-prettier --> Desactiva las reglas EsLint que son innevesarias.
- eslint-plugin-prettier --> Integra Prettier con ESLint, permitiendo que Prettier formatee el código como parte del proceso de linting.
- nodemon --> Es una herramienta que ayuda a desarrollar aplicaciones basadas en Node.js al reiniciar automáticamente la aplicación cuando se detectan cambios en los archivos del directorio.
- prettier --> Es un formateador de código que asegura que todo el código tenga un estilo consistente.
- ts-node -->  Permite ejecutar archivos TypeScript directamente en Node.js sin necesidad de compilarlos previamente a JavaScript.
- typescript --> Es un superconjunto de JavaScript que añade tipos estáticos opcionales

La dependencia necesaria para producción, para este caso.

- express --> Framework web minimalista

Para instalar estas dependencias, ocuparemos los siguientes comandos.

```
npm i express
npm i @types/express @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-plugin-prettier nodemon prettier ts-node typescript -D
```
## Paso 3: Archivos de configuración

1. Para crear el archivo de configuración de typescript puedes utilizar el siguiente comando.

```
npx tsc --init
```
y debe contener algo así.

```
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "src/tests/**/*"]
}

```
2. El package.json hay que modificarlo, para que utilice nodemon y cosas por el estilo, por lo que quedaría algo como esto.

```
{
  "name": "curso-platzi",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "nodemonConfig": {
    "watch": [
      "src"
    ],
    "ext": "ts",
    "ignore": [
      "*.test.ts"
    ],
    "execMap": {
      "ts": "ts-node"
    }
  },
  "scripts": {
    "dev": "nodemon src/index.ts",
    "start": "node dist/index.js",
    "lint": "eslint src --ext .ts"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/express": "^5.0.0",
    "@typescript-eslint/eslint-plugin": "^8.8.0",
    "@typescript-eslint/parser": "^8.8.0",
    "eslint": "^9.12.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.2.1",
    "nodemon": "^3.1.7",
    "prettier": "^3.3.3",
    "ts-node": "^10.9.2",
    "typescript": "^5.6.2"
  },
  "dependencies": {
    "express": "^4.21.0"
  }
}
```
## Paso 4: Levantar servidor

Finalmente en el directorio src/ agregamos el archivo index.ts, donde podremos levantar el servidor que necesitamos de la siguiente manera.

```
import express, { NextFunction, Request, Response } from "express";
// Se define lo necesario para el servidor
const app = express();
const port = 3000;
// Se define un middleware, para que se puedan manejar peticiones y respuestas en formato json
app.use(express.json());
// Se define el endpoint raiz, para obtener un recurso
app.get("/", (req: Request, res: Response) => {
  res.send({ message: "Hello World" });
});

//Manejo de errores
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send("Algo salió mal");
});

// Se levanta el servidor y escucha en el puerto 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

La estructura del código queda de esta forma.

![Estructura código](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/f8nz72fc8vrxixh7jiv3.png)



## Conclusión

Y eso es gente, espero que haya sido un buen punto de partida para aprender a crear servidores web con Express, TypeScript y Node.

Chau!
