import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 500;

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});
  await app.listen(PORT);
}
bootstrap();
