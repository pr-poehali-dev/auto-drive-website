import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const services = [
  {
    id: 'engine',
    title: 'Ремонт двигателя и ходовой части',
    icon: 'Wrench',
    description: 'Комплексный ремонт двигателя внутреннего сгорания, замена масла и фильтров, диагностика и ремонт подвески, замена амортизаторов и стоек',
    features: ['Опытные мотористы', 'Гарантия на работу', 'Качественные запчасти', 'Диагностика перед ремонтом']
  },
  {
    id: 'diagnostics',
    title: 'Компьютерная диагностика',
    icon: 'Laptop',
    description: 'Профессиональное выявление неисправностей автомобиля посредством подключения специализированного оборудования к электронному блоку управления (ЭБУ)',
    features: ['Современное оборудование', 'Полная диагностика систем', 'Расшифровка ошибок', 'Рекомендации по ремонту']
  },
  {
    id: 'fluids',
    title: 'Замена всех автомобильных жидкостей',
    icon: 'Droplet',
    description: 'Своевременная замена технических жидкостей продлевает срок службы автомобиля и предотвращает серьезные поломки',
    features: [
      'Моторное масло',
      'Трансмиссионное масло',
      'Тормозная жидкость',
      'Охлаждающая жидкость (антифриз)',
      'Жидкость ГУР'
    ]
  },
  {
    id: 'transmission',
    title: 'Ремонт АКПП любой сложности',
    icon: 'Settings',
    description: 'От диагностики до капитального ремонта автоматических коробок передач. Работаем со всеми типами АКПП',
    features: ['Опыт ремонта АКПП', 'Запчасти под заказ', 'Работа с вашими запчастями', 'Гарантия на работу']
  }
];

const benefits = [
  { icon: 'Shield', title: 'Гарантия качества', description: 'Надежность и качество с гарантией' },
  { icon: 'Users', title: 'Опытные мастера', description: 'Сертифицированные специалисты с большим опытом' },
  { icon: 'ThumbsUp', title: 'Качественные материалы', description: 'Используем только проверенные запчасти и расходники' },
  { icon: 'Clock', title: 'Быстрое обслуживание', description: 'Выполняем работы точно в срок' }
];

export default function Index() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const { toast } = useToast();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://functions.poehali.dev/368fa8d3-49a2-46ba-84d7-72bcb649e00f', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          message: formData.message,
          service: selectedService ? services.find(s => s.id === selectedService)?.title : 'Не указана'
        })
      });

      if (response.ok) {
        toast({
          title: 'Заявка отправлена!',
          description: 'Мы свяжемся с вами в ближайшее время.'
        });
        setFormData({ name: '', phone: '', message: '' });
        setSelectedService(null);
      } else {
        toast({
          title: 'Ошибка',
          description: 'Не удалось отправить заявку. Попробуйте позже.',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось отправить заявку. Попробуйте позже.',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Icon name="Car" size={32} className="text-primary" />
              <span className="text-2xl font-heading font-bold">Авто-Драйв</span>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-sm font-medium hover:text-primary transition-colors">
                Главная
              </button>
              <button onClick={() => scrollToSection('services')} className="text-sm font-medium hover:text-primary transition-colors">
                Услуги
              </button>
              <button onClick={() => scrollToSection('benefits')} className="text-sm font-medium hover:text-primary transition-colors">
                Преимущества
              </button>
              <button onClick={() => scrollToSection('contacts')} className="text-sm font-medium hover:text-primary transition-colors">
                Контакты
              </button>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <a href="tel:89276188419" className="flex items-center space-x-2 text-sm font-medium hover:text-primary transition-colors">
                <Icon name="Phone" size={16} />
                <span>8-927-618-84-19</span>
              </a>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Icon name={isMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-background animate-fade-in">
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <button onClick={() => scrollToSection('home')} className="text-left font-medium hover:text-primary transition-colors">
                Главная
              </button>
              <button onClick={() => scrollToSection('services')} className="text-left font-medium hover:text-primary transition-colors">
                Услуги
              </button>
              <button onClick={() => scrollToSection('benefits')} className="text-left font-medium hover:text-primary transition-colors">
                Преимущества
              </button>
              <button onClick={() => scrollToSection('contacts')} className="text-left font-medium hover:text-primary transition-colors">
                Контакты
              </button>
              <a href="tel:89276188419" className="flex items-center space-x-2 font-medium hover:text-primary transition-colors">
                <Icon name="Phone" size={16} />
                <span>8-927-618-84-19</span>
              </a>
            </nav>
          </div>
        )}
      </header>

      <main className="pt-16">
        <section id="home" className="relative min-h-[600px] flex items-center">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://cdn.poehali.dev/projects/fb89fa05-e43f-4023-a531-204d2b5300df/files/c232a2e7-a730-4ead-84de-8e093f8f10ad.jpg')`
            }}
          />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 leading-tight">
                Профессиональный автосервис для вашего автомобиля
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                Качество, надежность и гарантия на все виды работ. Доверьте свой автомобиль профессионалам!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={() => scrollToSection('contacts')} className="text-lg px-8">
                  Бесплатная консультация
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollToSection('services')} className="text-lg px-8 bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20">
                  Наши услуги
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="benefits" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mb-16">
              Почему выбирают нас
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center border-2 hover:border-primary transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name={benefit.icon as any} size={32} className="text-primary" />
                    </div>
                    <CardTitle className="font-heading">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mb-4">
              Наши услуги
            </h2>
            <p className="text-xl text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
              Полный спектр услуг по ремонту и обслуживанию автомобилей
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service) => (
                <Card key={service.id} className="overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-xl">
                  <CardHeader className="bg-gradient-to-br from-primary/10 to-secondary/10">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mb-4">
                          <Icon name={service.icon as any} size={28} className="text-primary-foreground" />
                        </div>
                        <CardTitle className="text-2xl font-heading mb-2">{service.title}</CardTitle>
                        <CardDescription className="text-base">{service.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-3 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-3">
                          <Icon name="CheckCircle2" size={20} className="text-primary flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      onClick={() => {
                        setSelectedService(service.id);
                        scrollToSection('contacts');
                      }}
                      className="w-full"
                    >
                      Записаться на услугу
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="contacts" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mb-16">
                Связаться с нами
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-2xl font-heading">Контактная информация</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name="Phone" size={24} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Телефон</h3>
                        <a href="tel:89276188419" className="text-lg text-primary hover:underline">
                          8-927-618-84-19
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name="MessageCircle" size={24} className="text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Telegram</h3>
                        <a
                          href="https://t.me/Almaz_63_tg"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg text-secondary hover:underline"
                        >
                          @Almaz_63_tg
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name="Clock" size={24} className="text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">График работы</h3>
                        <p className="text-muted-foreground">Понедельник - Суббота</p>
                        <p className="text-lg font-semibold">9:00 - 22:00</p>
                      </div>
                    </div>

                    <div className="pt-6 border-t">
                      <p className="text-sm text-muted-foreground">
                        Первый шаг к решению вашей проблемы – бесплатная консультация. Позвоните нам или оставьте заявку!
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-2xl font-heading">Форма обратной связи</CardTitle>
                    <CardDescription>Оставьте заявку и мы свяжемся с вами в ближайшее время</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="name">Ваше имя</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Иван Иванов"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Телефон</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+7 (900) 123-45-67"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="message">Сообщение</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder={selectedService ? `Интересует услуга: ${services.find(s => s.id === selectedService)?.title}` : 'Опишите вашу проблему или интересующую услугу'}
                          rows={4}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full" size="lg">
                        Отправить заявку
                        <Icon name="Send" size={18} className="ml-2" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Car" size={32} className="text-primary" />
                <span className="text-2xl font-heading font-bold">Авто-Драйв</span>
              </div>
              <p className="text-background/70">Профессиональный автосервис в Самаре. Качество и надежность</p>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-lg mb-4">Услуги</h3>
              <ul className="space-y-2 text-background/70">
                <li>Ремонт двигателя и ходовой</li>
                <li>Компьютерная диагностика</li>
                <li>Замена жидкостей</li>
                <li>Ремонт АКПП</li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-lg mb-4">Контакты</h3>
              <ul className="space-y-2 text-background/70">
                <li className="flex items-center space-x-2">
                  <Icon name="Phone" size={16} />
                  <a href="tel:89276188419" className="hover:text-primary transition-colors">8-927-618-84-19</a>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="MessageCircle" size={16} />
                  <a href="https://t.me/Almaz_63_tg" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    Telegram
                  </a>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} />
                  <span>Пн-Сб: 9:00 - 22:00</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/20 pt-8 text-center text-background/50 text-sm">
            <p>&copy; 2024 Авто-Драйв. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}