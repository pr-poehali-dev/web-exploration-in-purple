import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    // Проверяем сохраненную тему или системные настройки
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const codeExamples = {
    html: `<div class="container">
  <h1>Добро пожаловать!</h1>
  <p>Это HTML разметка</p>
  <button onclick="alert('Привет!')">
    Нажми меня
  </button>
</div>`,
    css: `.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: linear-gradient(
    135deg, 
    #667eea 0%, 
    #764ba2 100%
  );
}

h1 {
  color: #fff;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
}`,
    js: `// Интерактивность с JavaScript
function createCard(title, content) {
  const card = document.createElement('div');
  card.className = 'card';
  
  card.innerHTML = \`
    <h3>\${title}</h3>
    <p>\${content}</p>
    <button onclick="showMore()">
      Подробнее
    </button>
  \`;
  
  return card;
}

// Анимация появления
gsap.from('.card', {
  duration: 1,
  y: 50,
  opacity: 0,
  stagger: 0.2
});`
  };

  const technologies = [
    {
      id: 'html',
      title: 'HTML',
      subtitle: 'Структура веб-страниц',
      description: 'HTML (HyperText Markup Language) — язык разметки для создания структуры веб-страниц. Использует теги для определения заголовков, параграфов, ссылок и других элементов.',
      icon: 'Code2',
      color: 'bg-orange-500',
      features: ['Семантическая разметка', 'Доступность', 'SEO-оптимизация', 'Формы и таблицы']
    },
    {
      id: 'css',
      title: 'CSS',
      subtitle: 'Стилизация и дизайн',
      description: 'CSS (Cascading Style Sheets) — язык стилей для оформления HTML элементов. Позволяет создавать красивый дизайн, анимации и адаптивную верстку.',
      icon: 'Palette',
      color: 'bg-blue-500',
      features: ['Flexbox и Grid', 'Анимации и переходы', 'Адаптивный дизайн', 'CSS переменные']
    },
    {
      id: 'javascript',
      title: 'JavaScript',
      subtitle: 'Интерактивность и логика',
      description: 'JavaScript — язык программирования для создания интерактивных веб-приложений. Управляет поведением элементов, обрабатывает события пользователя.',
      icon: 'Zap',
      color: 'bg-yellow-500',
      features: ['DOM манипуляции', 'Асинхронность', 'Современный ES6+', 'Фреймворки и библиотеки']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-500">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50 border-b border-purple-100 dark:border-slate-700 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AlfTech
            </div>
            <div className="hidden md:flex space-x-8">
              {['Главная', 'HTML', 'CSS', 'JavaScript', 'Примеры'].map((item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(['home', 'html', 'css', 'javascript', 'examples'][index])}
                  className="text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors relative group"
                >
                  {item}
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-purple-100 dark:bg-slate-700 hover:bg-purple-200 dark:hover:bg-slate-600 transition-all duration-300 hover:scale-110"
                aria-label="Переключить тему"
              >
                <Icon 
                  name={isDarkMode ? 'Sun' : 'Moon'} 
                  size={20} 
                  className="text-purple-600 dark:text-purple-400 transition-all duration-300" 
                />
              </button>
              
              <div className="md:hidden">
                <Icon name="Menu" size={24} className="text-slate-600 dark:text-slate-300" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className={`pt-24 pb-16 px-4 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-float mb-8">
            <img 
              src="/img/79e7fd92-08a3-40b8-ac79-3f528a17e1ca.jpg" 
              alt="Веб-технологии" 
              className="w-32 h-32 mx-auto rounded-2xl shadow-2xl"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-slide-up">
            Веб-технологии
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto animate-slide-up">
            Изучите основы современной веб-разработки: HTML, CSS и JavaScript. 
            Создавайте интерактивные и красивые веб-приложения.
          </p>
          <div className="flex justify-center space-x-4 animate-slide-up">
            <Button 
              onClick={() => scrollToSection('html')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg"
            >
              Начать изучение
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
            <Button 
              onClick={() => scrollToSection('examples')}
              variant="outline" 
              className="border-purple-300 text-purple-600 hover:bg-purple-50 px-8 py-3 text-lg"
            >
              Примеры кода
            </Button>
          </div>
        </div>
      </section>

      {/* Technology Sections */}
      {technologies.map((tech, index) => (
        <section key={tech.id} id={tech.id} className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:grid-flow-col-dense' : ''}`}>
              <div className={index % 2 === 1 ? 'md:col-start-2' : ''}>
                <div className="flex items-center mb-6">
                  <div className={`w-16 h-16 ${tech.color} rounded-2xl flex items-center justify-center mr-4`}>
                    <Icon name={tech.icon as any} size={32} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-4xl font-bold text-slate-800">{tech.title}</h2>
                    <p className="text-lg text-slate-600">{tech.subtitle}</p>
                  </div>
                </div>
                
                <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                  {tech.description}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  {tech.features.map((feature) => (
                    <Badge 
                      key={feature} 
                      variant="secondary" 
                      className="bg-purple-100 text-purple-700 px-3 py-2 text-sm"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className={index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}>
                <Card className="bg-slate-900 text-green-400 border-none shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Icon name="Terminal" size={24} className="mr-2" />
                      Пример {tech.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="text-sm overflow-x-auto">
                      <code>{codeExamples[tech.id as keyof typeof codeExamples]}</code>
                    </pre>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Interactive Examples Section */}
      <section id="examples" className="py-16 px-4 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Интерактивные примеры
            </h2>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Попробуйте живые примеры кода и посмотрите, как работают веб-технологии
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'HTML Форма',
                description: 'Интерактивная форма с валидацией',
                demo: (
                  <div className="bg-white p-6 rounded-lg">
                    <form className="space-y-4">
                      <input 
                        type="text" 
                        placeholder="Ваше имя" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                      />
                      <input 
                        type="email" 
                        placeholder="Email" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                      />
                      <button 
                        type="submit"
                        className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        Отправить
                      </button>
                    </form>
                  </div>
                )
              },
              {
                title: 'CSS Анимация',
                description: 'Плавные переходы и трансформации',
                demo: (
                  <div className="bg-white p-6 rounded-lg">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto animate-pulse hover:animate-bounce cursor-pointer transition-all duration-300 hover:scale-110"></div>
                    <p className="text-center mt-4 text-gray-600">Наведите курсор</p>
                  </div>
                )
              },
              {
                title: 'JavaScript Счетчик',
                description: 'Интерактивный компонент',
                demo: (
                  <div className="bg-white p-6 rounded-lg text-center">
                    <Counter />
                  </div>
                )
              }
            ].map((example, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="text-xl">{example.title}</CardTitle>
                  <CardDescription className="text-purple-100">
                    {example.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {example.demo}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">AlfTech</h3>
            <p className="text-slate-400">
              Изучайте веб-технологии с удовольствием
            </p>
          </div>
          <div className="flex justify-center space-x-6 mb-6">
            <Icon name="Github" size={24} className="text-slate-400 hover:text-white cursor-pointer transition-colors" />
            <Icon name="Twitter" size={24} className="text-slate-400 hover:text-white cursor-pointer transition-colors" />
            <Icon name="Mail" size={24} className="text-slate-400 hover:text-white cursor-pointer transition-colors" />
          </div>
          <p className="text-slate-500">
            © 2024 AlfTech. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

// Counter component for JavaScript example
const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="space-y-4">
      <div className="text-3xl font-bold text-purple-600">{count}</div>
      <div className="flex justify-center space-x-2">
        <button 
          onClick={() => setCount(count - 1)}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          -
        </button>
        <button 
          onClick={() => setCount(0)}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          Reset
        </button>
        <button 
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Index;