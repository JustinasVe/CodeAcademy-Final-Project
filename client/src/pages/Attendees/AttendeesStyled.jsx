import styled from "styled-components";

export const AttendeesListWrapper = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 25px;
    margin-top: 90px;
`;

export const AttendeesListTittle = styled.h1`
    color: #008b8b;
    letter-spacing: 0.2rem;
`;

export const AttendeesList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 8px;
    background-color: #ffffff;
`;

export const HoverOverlay = styled.div`
    align-items: center;
    background-color: rgba(0, 0, 0, 0.1);
    content: '';
    display: flex;
    height: 100%;
    justify-content: center;
    left: 0;
    position: absolute;
    width: 100%;
`;

export const AttendeesListItem = styled.li`
    align-items: center;
    border-radius: 10px;
    box-shadow: 0 5px 7px -1px rgb(51 51 51 / 23%);
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    padding: 10px 30px;
    position: relative;

${HoverOverlay} {
    visibility: hidden;
}
&:hover {
    ${HoverOverlay} {
    visibility: visible;
    }
}
`;

export const AttendeeInfo = styled.span`
    color: #0000cd;
    font-size: 20px;
    font-weight: 600;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

export const StyledFormAdd = styled.form`
    display: flex;
    align-items: center;
    flex-direction: row;
    height: 20%;
    width: 100%;
    justify-content: space-around;
    justify-content: center;
`;