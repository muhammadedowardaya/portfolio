import React, { useEffect, useState, type CSSProperties } from 'react';

import '@/styles/contact-menu.css';
import { useAtomValue } from 'jotai';
import { selectedMenuAtom } from '@/lib/jotai';

import { Icon } from '@iconify/react';

import gsap from 'gsap';
import { AnimatePresence } from 'motion/react';
import { motion } from 'motion/react';

const ContactMenu = () => {
	const [active, setActive] = useState(false);
	const [showMenu, setShowMenu] = useState(false);
	const selectedMenu = useAtomValue(selectedMenuAtom);

	useEffect(() => {
		setShowMenu(true);
		setTimeout(() => {
			setActive(true);
		}, 4500);
	}, []);

	useEffect(() => {
		if (selectedMenu !== 'kontak') {
			setShowMenu(false);
		}
	}, [selectedMenu]);

	useEffect(() => {
		const contactList = document.querySelector('.contact-list') as HTMLElement;

		if (active) {
			gsap.to('.contact-list.active', {
				border: '1px solid #fff',
				delay: 0.5,
				duration: 2,
			});
		} else {
			if (contactList) {
				gsap.to(contactList, {
					border: '1px solid transparent',
					duration: 0.5,
				});
			}
		}
	}, [active]);

	const handleToggleClick = () => setActive(!active);

	return (
		<AnimatePresence>
			{showMenu && (
				<motion.div
					initial={{ rotate: 360, opacity: 0, scale: 0 }}
					animate={{ rotate: 0, opacity: 1, scale: 1 }}
					exit={{ rotate: 360, opacity: 0, scale: 0 }}
					transition={{ duration: 0.5, delay: 4 }}
					className="contact-container absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col justify-center items-center"
				>
					<ul className={`contact-list ${active ? 'active' : ''}`}>
						<button className="contact-toggle" onClick={handleToggleClick}>
							<Icon icon="weui:contacts-filled" width="40" height="40" />
						</button>
						<li className="contact-item" style={{ '--i': 1 } as CSSProperties}>
							<a
								href="https://mail.google.com/mail/?view=cm&fs=1&to=muhammadedowardaya@gmail.com"
								target="_blank"
							>
								<Icon icon="skill-icons:gmail-light" className="icon" />
								<p className="gmail">muhammadedowardaya@gmail.com</p>
							</a>
						</li>
						<li className="contact-item" style={{ '--i': 2 } as CSSProperties}>
							<a href="https://github.com/muhammadedowardaya" target="_blank">
								<Icon icon="skill-icons:github-light" className="icon" />
								<p className="github">{`github.com/\nmuhammadedowardaya`}</p>
							</a>
						</li>
						<li className="contact-item" style={{ '--i': 3 } as CSSProperties}>
							<a
								href="https://www.linkedin.com/in/muhammad-edo-wardaya"
								target="_blank"
							>
								<Icon icon="skill-icons:linkedin" className="icon" />
								<p className="linkedin">
									{`linkedin.com/in/muhammad-edo-wardaya/`}
								</p>
							</a>
						</li>
						<li className="contact-item" style={{ '--i': 4 } as CSSProperties}>
							<a
								href="https://www.instagram.com/m_edo_wardaya/"
								target="_blank"
							>
								<Icon icon="skill-icons:instagram" className="icon" />
								<p className="instagram">@muhammadedowardaya</p>
							</a>
						</li>
					</ul>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default ContactMenu;
