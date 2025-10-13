import { LINKS } from '@/shared/constants'
import { SeoToggle } from '@/shared/ui'

export const InfoSection = ({
	onButtonClick,
	isSeoVisible
}: {
	onButtonClick: () => void
	isSeoVisible: boolean
}) => {
	return (
		<div>
			{isSeoVisible && (
				<div className='absolute w-full bg-gray-800/[0.90] text-slate-200'>
					<div className='mr-20 ml-20'>
						<h1 className='pt-20 text-4xl font-bold'>
							{' '}
							Что такое <span className='text-red-500'>Pomofy?</span>
						</h1>
						<p className='pt-5 text-lg'>
							Pomofy универсальное приложение для тайм-менеджмента и продуктивности на компьютере и
							смартфоне. Оно основано на популярной «Технике Помидора» от{' '}
							<span className='font-bold italic'>
								<a href={LINKS.POMODORO} target='_blank'>
									Франческо Чирилло{' '}
								</a>
							</span>{' '}
							— проверенном способе улучшить концентрацию и работать эффективнее.{' '}
						</p>
						<p className='pt-5 text-lg'>
							{' '}
							Главная «фишка» Pomofy — возможность сделать её по-настоящему своей: добавляйте
							виджеты и меняйте настройки как вам угодно! Незаменимый помощник для учебы и работы
							над любыми проектами!
						</p>

						<h2 className='pt-5 text-3xl font-bold'> Как использовать «Метода помидора» </h2>
						<ul className='list-decimal pt-5 pl-10 text-lg'>
							<li>Нажмите «Добавить задачу» в виджете «Трекер задач»</li>
							<li>Введите задачу, которую нужно выполнить</li>
							<li>
								Установите «Количество помидоров» для того, сколько времени вы хотите
								сосредоточиться на задаче (1 помидор = 25 минут)
							</li>
							<li>Нажмите «Сохранить», затем нажмите «Начать» на виджете таймера</li>
						</ul>
						<p className='pt-5 text-lg'>
							Работайте непрерывно, пока таймер не отключится, затем сделайте короткий перерыв перед
							началом следующей сессии! Повторите этот цикл, пока ваша задача не будет выполнена.
						</p>

						<h2 className='pt-5 text-3xl font-bold'> Преимущества онлайн-таймера помидора </h2>
						<p className='pt-5 text-lg'>
							Таймер Помодоро, помогает эффективнее распоряжаться временем, разделяя работу на
							фокус-сессии. Суть метода в том, чтобы работать интервалами по 25 минут, а затем
							делать короткие перерывы.
						</p>
						<p className='pt-5 text-lg'>Согласно этому методу вы можете:</p>
						<ul className='list-disc pt-5 pl-10 text-lg'>
							<li>Установить время для отдыха</li>
							<li>Ограничивать «бесконечные» задачи</li>
							<li>Геймифицировать рабочий процесс</li>
							<li>Победить прокрастинацию</li>
						</ul>

						<h2 className='pt-5 text-3xl font-bold'>Настройки приложения</h2>

						<ul className='list-none pt-5 pl-5 text-lg'>
							<li>
								<span className='font-bold'>Настройки времени:</span> Установите удобную
								длительность для коротких и длинных перерывов, а также для рабочих интервалов.
							</li>
							<li>
								<span className='font-bold'>Настройки звука:</span> Выберите громкость и мелодию
								уведомления. Доступны ретро-звонок, флейта и пианино.
							</li>
							<li>
								<span className='font-bold'>Настройки рабочего стола:</span> Настройте размер сетки
								и заблокируйте виджеты, чтобы не сдвинуть их случайно.
							</li>
						</ul>
						<h2 className='pt-5 text-3xl font-bold'>
							Другие способы оставаться сосредоточенными при работе{' '}
						</h2>
						<p className='pt-5 text-lg'>
							В дополнение к использованию таймера Помодоро, существуют другие стратегии, которые вы
							можете попробовать, чтобы оставаться сосредоточенными при работе!
						</p>

						<ul className='list-disc pt-5 pl-10 text-lg'>
							<li>Подготовьте свой любимый перекус, чтобы насладиться им во время работы</li>
							<li>
								Разделите свою работу на меньшие, управляемые задачи, и сгруппируйте их по важности
							</li>
							<li>
								Устраните отвлекающие факторы, такие как телефон или вкладки с социальными сетями
							</li>
							<li>Убедитесь, что вы выспались</li>
							<li>Убедитесь, что вы пьете не менее 12-16 стаканов воды в день</li>
						</ul>

						<h2 className='pt-5 text-3xl font-bold'>Дальнейшее развитие</h2>
						<p className='pt-5 text-lg'>
							Исходный код является открытым и любой разработчик может предложить новые функции.
						</p>
						<p className='pt-5 text-lg'>
							{' '}
							Загляните в репозиторий на GitHub{' '}
							<span className='font-bold text-red-500'>
								<a href={LINKS.GITHUB} target='_blank'>
									здесь!
								</a>
							</span>
						</p>
						<div className='flex justify-center'>
							<SeoToggle onClick={onButtonClick} />
						</div>
					</div>
					<footer className='lg:text-lef bottom-0 bg-gray-900/[0.7] text-center text-sm'>
						<ul className='pt-2 text-center text-purple-500/[0.75]'>
							<li>
								<a className='text-blue-500/[0.75]' href={LINKS.LICENSE} target='_blank'>
									MIT License
								</a>
								<a className='text-blue-500/[0.75]' href={LINKS.GITHUB} target='_blank'>
									{' - '}GitHub
								</a>
							</li>
						</ul>
						<div className='pb-2 text-center text-neutral-500'>© 2025 Pomofy</div>
					</footer>
				</div>
			)}
			;
		</div>
	)
}
