import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from 'Pipes/Validation/Validation.pipe'
import * as helmet from 'helmet'
import * as morgan from 'morgan'

declare const module: any

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe())
  app.use(helmet())
  app.use(morgan('dev'))
  app.setGlobalPrefix('api')
  await app.listen(3000)

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}
bootstrap()
