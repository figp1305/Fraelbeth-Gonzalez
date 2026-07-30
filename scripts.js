/* ============================================================
   NUEVAS SECCIONES: PROBLEMA, TRANSPARENCIA, SERVICIOS ACTUALIZADOS
   ============================================================ */

/* --- PROBLEMA --- */
.problema {
    padding: 60px 0 80px;
    background: var(--gray);
}

.problema__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px 40px;
    max-width: 750px;
    margin: 0 auto 40px;
}

.problema-item {
    display: flex;
    align-items: center;
    gap: 12px;
    font-weight: 500;
    font-size: 1rem;
    color: #4a5b7a;
}

.problema-item__icon {
    font-size: 1.2rem;
    flex-shrink: 0;
}

.problema__respuesta {
    text-align: center;
    max-width: 700px;
    margin: 0 auto;
    background: var(--white);
    padding: 28px 40px;
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    font-size: 1.1rem;
    color: var(--navy);
}

.problema__respuesta strong {
    color: var(--blue);
}

/* --- SERVICIOS ACTUALIZADOS --- */
.servicios__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
}

.servicio-card {
    background: var(--white);
    padding: 32px 28px 28px;
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    transition: var(--transition);
    border: 1px solid rgba(13, 27, 61, 0.04);
    display: flex;
    flex-direction: column;
    position: relative;
}

.servicio-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 48px rgba(13, 27, 61, 0.08);
}

.servicio-card--popular {
    border-color: var(--blue);
    background: #f8faff;
}

.servicio-card--popular .servicio-card__badge {
    background: var(--blue);
    color: var(--white);
}

.servicio-card__header {
    margin-bottom: 16px;
}

.servicio-card__badge {
    display: inline-block;
    background: var(--light-blue);
    color: var(--blue);
    font-size: 0.65rem;
    font-weight: 700;
    padding: 4px 16px;
    border-radius: 60px;
    letter-spacing: 0.4px;
    text-transform: uppercase;
    margin-bottom: 6px;
}

.servicio-card__price {
    font-size: 1.8rem;
    font-weight: 800;
    color: var(--navy);
    display: block;
}

.servicio-card__price small {
    font-size: 0.9rem;
    font-weight: 400;
    color: #4a5b7a;
}

.servicio-card__desc {
    font-size: 0.85rem;
    color: #4a5b7a;
    margin: 2px 0 8px;
}

.servicio-card__icon {
    margin-bottom: 12px;
}

.servicio-card h3 {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 8px;
}

.servicio-card p {
    color: #4a5b7a;
    font-weight: 400;
    font-size: 0.95rem;
    margin-bottom: 12px;
}

.servicio-card__features {
    list-style: none;
    padding: 0;
    margin: 0 0 16px 0;
    flex: 1;
}

.servicio-card__features li {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 4px 0;
    font-size: 0.88rem;
    color: #2d3b5a;
}

.servicio-card__features li svg {
    flex-shrink: 0;
}

.servicio-card__note {
    font-size: 0.8rem !important;
    color: #6a7b9a !important;
    background: var(--gray);
    padding: 8px 14px;
    border-radius: 8px;
    margin-bottom: 16px;
    font-style: italic;
}

/* --- TRANSPARENCIA --- */
.transparencia {
    padding: 80px 0;
    background: var(--white);
}

.transparencia__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
    max-width: 900px;
    margin: 0 auto 48px;
}

.transparencia-item {
    text-align: center;
    padding: 20px;
}

.transparencia-item__icon {
    font-size: 2.4rem;
    display: block;
    margin-bottom: 12px;
}

.transparencia-item h3 {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 6px;
}

.transparencia-item p {
    font-size: 0.9rem;
    color: #4a5b7a;
}

.transparencia__compromiso {
    max-width: 700px;
    margin: 0 auto;
    text-align: center;
    background: var(--light-blue);
    padding: 32px 40px;
    border-radius: var(--radius);
}

.transparencia__compromiso h3 {
    font-size: 1.3rem;
    font-weight: 800;
    color: var(--blue);
    margin-bottom: 8px;
}

.transparencia__compromiso p {
    font-size: 1rem;
    color: #4a5b7a;
}

/* --- FOOTER MEJORADO --- */
.footer__tagline {
    font-size: 0.85rem;
    color: #4a5b7a;
    font-weight: 400;
    margin-top: -4px;
}

.footer__info {
    display: flex;
    align-items: center;
    gap: 24px;
    flex-wrap: wrap;
}

.footer__info p {
    font-weight: 600;
    color: var(--navy);
}

/* --- RESPONSIVE PARA NUEVAS SECCIONES --- */
@media (max-width: 1024px) {
    .servicios__grid {
        grid-template-columns: 1fr 1fr;
    }
    .transparencia__grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
    }
    .problema__grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    .servicios__grid {
        grid-template-columns: 1fr;
    }
    .problema__grid {
        grid-template-columns: 1fr;
        gap: 8px;
    }
    .problema__respuesta {
        padding: 20px;
        font-size: 1rem;
    }
    .transparencia__grid {
        grid-template-columns: 1fr 1fr;
        gap: 16px;
    }
    .transparencia__compromiso {
        padding: 24px 20px;
    }
    .transparencia__compromiso h3 {
        font-size: 1.1rem;
    }
    .footer__info {
        flex-direction: column;
        gap: 12px;
    }
}

@media (max-width: 480px) {
    .transparencia__grid {
        grid-template-columns: 1fr;
    }
    .servicio-card {
        padding: 24px 18px;
    }
    .servicio-card__price {
        font-size: 1.5rem;
    }
}
