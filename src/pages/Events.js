import React from 'react';
import styles from './Events.module.css';
import taekwondoImage from '../assets/img/news.png';

const Events = () => {
  return (
    <>

      <div className={styles.mainTitle}>
          EVENTS AND GAME SCHEDULES
        </div>
      {/* STRASUC Section */}
      <div className={styles.strasucContainer}>
        <h1 className={styles.strasucTitle}>STRASUC</h1>
        <div className={styles.horizontalLine}></div>
        <div className={styles.gameUpdates}>
          <h2>GAME UPDATES</h2>
          <div className={styles.gameDetails}>
            <div className={styles.gameDescription}>
              <h3>SWIMMING</h3>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
            </div>
            <div className={styles.gameImage}>
              <img
                src={taekwondoImage}
                alt="Swimming"
                className={styles.gameImageStyle}
              />
            </div>
          </div>
        </div>
        <div className={styles.horizontalLine}></div>
        <div className={styles.schedulesAndVenue}>
          <h2>SCHEDULES AND VENUE</h2>
          <div className={styles.eventCardsWrapper}>
            <div className={styles.eventCard}>
              <h3 className={styles.eventTitle}>MEN'S BADMINTON</h3>
              <p><span>Date:</span> November 00, 0000</p>
              <p><span>Time:</span> 00:00 PM</p>
              <p><span>Place:</span> Palawan State University, Gymnasium</p>
            </div>
            <div className={styles.eventCard}>
              <h3 className={styles.eventTitle}>FOOTBALL</h3>
              <p><span>Date:</span> November 00, 0000</p>
              <p><span>Time:</span> 00:00 PM</p>
              <p><span>Place:</span> Palawan State University, Gymnasium</p>
            </div>
            <div className={styles.eventCard}>
              <h3 className={styles.eventTitle}>WOMEN'S VOLLEYBALL</h3>
              <p><span>Date:</span> November 00, 0000</p>
              <p><span>Time:</span> 00:00 PM</p>
              <p><span>Place:</span> Palawan State University, Gymnasium</p>
            </div>
          </div>
        </div>
      </div>

      {/* UNIVERSITY GAMES Section */}
      <div className={styles.strasucContainer}>
        <h1 className={styles.strasucTitle}>UNIVERSITY GAMES</h1>
        <div className={styles.horizontalLine}></div>
        <div className={styles.gameUpdates}>
          <h2>GAME UPDATES</h2>
          <div className={styles.gameDetails}>
            <div className={styles.gameDescription}>
              <h3>BASKETBALL</h3>
              <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
            </div>
            <div className={styles.gameImage}>
              <img
                src={taekwondoImage}
                alt="Basketball"
                className={styles.gameImageStyle}
              />
            </div>
          </div>
        </div>
        <div className={styles.horizontalLine}></div>
        <div className={styles.schedulesAndVenue}>
          <h2>SCHEDULES AND VENUE</h2>
          <div className={styles.eventCardsWrapper}>
            <div className={styles.eventCard}>
              <h3 className={styles.eventTitle}>MEN'S BASKETBALL</h3>
              <p><span>Date:</span> December 10, 2023</p>
              <p><span>Time:</span> 02:00 PM</p>
              <p><span>Place:</span> National University, Gymnasium</p>
            </div>
            <div className={styles.eventCard}>
              <h3 className={styles.eventTitle}>WOMEN'S VOLLEYBALL</h3>
              <p><span>Date:</span> December 12, 2023</p>
              <p><span>Time:</span> 04:00 PM</p>
              <p><span>Place:</span> University of the East, Gymnasium</p>
            </div>
            <div className={styles.eventCard}>
              <h3 className={styles.eventTitle}>SOCCER</h3>
              <p><span>Date:</span> December 15, 2023</p>
              <p><span>Time:</span> 10:00 AM</p>
              <p><span>Place:</span> Rizal Memorial Stadium</p>
            </div>
          </div>
        </div>
      </div>

      {/* OTHER GAME EVENT Section */}
      <div className={styles.strasucContainer}>
        <h1 className={styles.strasucTitle}>OTHER GAME EVENT</h1>
        <div className={styles.horizontalLine}></div>
        <div className={styles.gameUpdates}>
          <h2>PIIE SPORTS FEST</h2>
          <div className={styles.gameDetails}>
            <div className={styles.gameDescription}>
              <h3>BADMINTON MIXED DOUBLES</h3>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
            </div>
            <div className={styles.gameImage}>
              <img
                src={taekwondoImage}
                alt="Badminton Mixed Doubles"
                className={styles.gameImageStyle}
              />
            </div>
          </div>
        </div>
        <div className={styles.horizontalLine}></div>
        <div className={styles.schedulesAndVenue}>
          <h2>SCHEDULES AND VENUE</h2>
          <div className={styles.eventCardsWrapper}>
            <div className={styles.eventCard}>
              <h3 className={styles.eventTitle}>FIRST GAME</h3>
              <p><span>Date:</span> December 10, 2023</p>
              <p><span>Time:</span> 02:00 PM</p>
              <p><span>Place:</span> National University, Gymnasium</p>
            </div>
          </div>
        </div>
      </div>

            <div className={styles.footerBar}>
              <div className={styles.emailContact}>
                <i className="fa fa-envelope"></i> email1@periodt.com
              </div>
              <div className={styles.emailContact}>
                <i className="fa fa-envelope"></i> email2@periodt.com
              </div>
            </div>
    </>
  );
};

export default Events;
