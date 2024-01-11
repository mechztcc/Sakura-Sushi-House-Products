import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { RabbitmqModule } from './logs/rabbitmq/rabbitmq.module';
import { ProduceLogsService } from './logs/rabbitmq/producer-logs/producer-logs.service';

@Module({
  imports: [ProductsModule, RabbitmqModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly producer: ProduceLogsService) {}
  onModuleInit() {
    this.producer.connect();
  }
}
