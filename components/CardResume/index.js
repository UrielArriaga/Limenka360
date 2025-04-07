import { CallMade, CallReceived } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";

export default function CardResume({ total, title, percentaje, isUp, Icon, iconBg }) {
  const getClass = (flag, clgtrue, clgfalse) => (flag ? clgtrue : clgfalse);
  const getClassActive = (flag, clss) => (flag ? clss + "--active" : clss);

  return (
    <CardResumeStyled>
      <div className="ctr_cardresume">
        <div className="ctr_cardresume__top">
          <p className="ctr_cardresume__top__txtleft">{title}</p>
          <div className={getClassActive(isUp, "ctr_cardresume__top__right")}>
            {isUp ? <CallMade /> : <CallReceived />}
            {percentaje}%
          </div>
        </div>

        <div className="ctr_cardresume__middle">
          <div className="ctr_cardresume__middle__total">
            <p>${total}</p>
          </div>
        </div>

        <div className="ctr_cardresume__bottom">
          <p className="ctr_cardresume__bottom__txtleft">View net earnings</p>
          <div className={getClassActive(isUp, "ctr_cardresume__bottom__right")}>{Icon && <div className="ctr_cardresume__bottom__right__iconitem">{Icon} </div>}</div>
        </div>
      </div>
    </CardResumeStyled>
  );
}

const CardResumeStyled = styled.div`
  .ctr_cardresume {
    width: 270px;
    padding: 15px 10px;
    margin-right: 10px;
    border-radius: 4px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    background-color: #ffff;
    &__top {
      display: flex;
      justify-content: space-between;
      &__txtleft {
        font-size: 12px;
        color: #878a99;
      }

      &__right {
        font-size: 16px;
        color: red;
        svg {
          font-size: 12px;
        }

        &--active {
          color: green;
          svg {
            font-size: 12px;
          }
        }
      }
    }

    &__middle {
      margin: 10px 0px;
      &__total {
        p {
          font-size: 25px;
          color: #485056;
        }
      }
    }

    &__bottom {
      display: flex;
      justify-content: space-between;

      &__txtleft {
        font-size: 12px;
        color: #46568d;
        cursor: pointer;
        text-decoration: underline;
      }

      &__right {
        &__iconitem {
          background-color: red;
        }
        svg {
          font-size: 20px;
        }
      }
    }
  }
`;
