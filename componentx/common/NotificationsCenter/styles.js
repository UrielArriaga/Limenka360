import styled from "styled-components";

export const NotificationItemStyled = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 10px;
  border-bottom: 1px solid #ddd;

  cursor: pointer;
  &:hover {
    background: #f5f5f5;
  }

  .avatar-container {
    flex: 1;
    font-size: 12px;

    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px;
      background: ${props => props.avatarBackground};
    }
  }

  .content-container {
    width: 90%;
    font-size: 12px;

    .title {
      font-size: 12px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .description {
      margin-bottom: 5px;
    }

    .products-list {
      display: flex;
      flex-wrap: wrap;
      .product-item {
        padding: 5px;
        background: #f5f5f5;
        border-radius: 4px;
        margin-right: 5px;
        margin-bottom: 5px;
      }
    }
    .fullname {
      text-transform: capitalize;
    }

    .message-container {
      padding: 8px 10px;
      background: #f5f5f5;
      margin-top: 8px;
      margin-bottom: 5px;
      border-radius: 4px;
    }

    .table-container {
      margin-top: 10px;
      table {
        width: 100%;
        border-collapse: collapse;
        background: #f5f5f5;
        border-radius: 10px;

        thead {
          th {
            padding: 4px;
            text-align: left;
          }
        }

        tbody {
          tr {
            td {
              padding: 4px;
              border-top: 1px solid #ddd;
            }
          }
        }
      }
    }
  }

  .indicator-container {
    flex: 1;
    font-size: 12px;
    .indicator {
      font-size: 13px;
      color: #1877f2;
    }
  }
`;
