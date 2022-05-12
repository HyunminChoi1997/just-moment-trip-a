import React from 'react';
import { memo, useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFishFins } from '@fortawesome/free-solid-svg-icons';
import AOS from 'aos';
import 'aos/dist/aos.css';
const fuzzy = require('./fuzzy');

const HrEdit = styled.hr`
  border: 0.5px solid gray;
  width: 60%;
`;

const Slide = keyframes`
  0% {    
    transform: scaleX(-1);
    left: calc(30px);
  }
  49.99% {
    transform: scaleX(-1);
    left: 0%;
  }
  50% {
    transform: scaleX(1);
    left: 0%;
  }
  99.99% {
    transform: scaleX(1);
    left: calc(30px);
  }
  100% {
    transform: scaleX(-1);
    left: calc(30px);
  }
`;

const ManFishIcon = styled.div`
  width: 26.2vw;
  position: relative;
  animation-name: ${Slide};
  animation-duration: 6s;
  animation-iteration-count: infinite;
`;

const ManFishArea = styled.div`
  width: 100%;
  height: 30px;
`;

const faFishFinsIcon = (
  <ManFishArea>
    <ManFishIcon>
      <FontAwesomeIcon icon={faFishFins} />
    </ManFishIcon>
  </ManFishArea>
);

const TagsInput = styled.div`
  /* margin: 8rem auto; */
  display: ${props => props.display};
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  min-height: 48px;
  width: 98%;
  border: none;
  border-radius: 6px;
  > ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 8px 0 0 0;

    > .tag {
      width: auto;
      height: 32px;
      display: flex;
      align-items: center;
      text-align: center;
      justify-content: center;
      color: #efefef;
      padding: 0 8px;
      font-size: 0.8em;
      list-style: none;
      border-radius: 6px;
      margin: 2px 2px;
      background: rgb(70, 125, 196);
      :hover {
        cursor: pointer;
        transition: all 0.5s linear;
        transform: scale(1.1);
      }
      > .tag-close-icon {
        display: block;
        width: 16px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        font-size: 14px;
        margin-left: 8px;
        color: red;
        border-radius: 50%;
        background: #efefef;
        cursor: pointer;
      }
    }
  }

  > input {
    flex: 1;
    border-radius: none;
    text-align: center;
    background-color: transparent;
    border: none;
    height: 3vh;
    width: 20vw;
    font-size: 0.8em;
    padding: 4px 0 0 0;
    :focus {
      outline: transparent;
    }
  }

  &:focus-within + ${HrEdit} {
    transition: all 0.4s ease-in;
    border-color: rgb(67, 45, 127);
  }
`;

const DiaryEditorBox = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 28.5vw;
  height: 300px;
  margin: 10px;
  padding: 10px 0;
  border-radius: 20px;
  border: 3px solid rgb(179, 175, 237);
  :hover {
    transition: all 0.2s linear;
    transform: scale(1.05);
  }
`;

const InfoBox = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  align-items: center;
  word-break: break-all;
  height: 25vh;
`;

const DiaryEditInputBox = styled.input`
  font-size: 0.8em;
  text-align: center;
  font-family: SsurroundFont;
  background-color: transparent;
  outline: none;
  border: none;
  padding: 5px;
  :hover {
    z-index: 1;
    transition: all 0.2s linear;
    transform: scale(1.2);
  }
  :focus {
    transition: all 0.4s ease-in;
    border-bottom: 2px solid pink;
  }
`;

const DiaryEditTextareaBox = styled.textarea`
  text-align: center;
  font-family: SsurroundFont;
  background-color: transparent;
  outline: none;
  border: none;
  resize: none;
  padding: 5px;
  width: 23.5vw;
  height: 8vw;
  font-size: 0.8em;
  :hover {
    z-index: 1;
    transition: all 0.2s linear;
    transform: scale(1.08);
  }
  :focus {
    transition: all 0.4s ease-in;
    border-bottom: 2px solid pink;
  }
`;

const DiaryBtn = styled.button`
  background-color: transparent;
  outline: none;
  font-family: SsurroundFont;
  border: none;
  font-size: 8px;
  :hover {
    cursor: pointer;
    transition: all 0.2s linear;
    transform: scale(1.2);
  }
`;

function DiaryEditor({
  diaryList,
  onRemove,
  onEdit,
  toggleClicked,
  id,
  title,
  content,
  write_date,
  hashtags,
  search,
  searchType,
}) {
  const titleInput = useRef();
  const contentInput = useRef();
  useEffect(() => {
    console.log(`${id}번 일기아이템 렌더`);
    if (searchType === 'title') {
      titleInput.current.innerHTML = titleInput.current.innerHTML
        .replace(/<span style="color: red">/g, '')
        .replace(/<\/span>/g, '');
      titleInput.current.innerHTML = fuzzy.chageRed(
        titleInput.current.innerHTML,
        search,
      );
    }
    if (searchType === 'content') {
      contentInput.current.innerHTML = contentInput.current.innerHTML
        .replace(/<span style="color: red">/g, '')
        .replace(/<\/span>/g, '');
      contentInput.current.innerHTML = fuzzy.chageRed(
        contentInput.current.innerHTML,
        search,
      );
    }
  }, [search]);

  const localContentInput = useRef();
  const lacalTitleInput = useRef();
  const [localContent, setLocalContent] = useState(content);
  const [localTitle, setLocalTitle] = useState(title);
  const [localHashtags, setLocalHashtags] = useState(hashtags);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const toggleIsEdit = () => setIsEdit(!isEdit);
  const handleClickRemove = () => {
    Swal.fire({
      title: `기록을 삭제할까요?`,
      text: '💁‍♂️ 삭제시 기록을 복구할 수 없어요',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '네',
      cancelButtonText: '아니오',
      backdrop: `
      rgba(0,0,110,0.5)
      url("https://velog.velcdn.com/images/do66i/post/da3c93a4-65e4-45f9-99e3-19190d53d158/image.gif")
      left bottom
      no-repeat
    `,
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: '삭제 완료!',
          text: `선택하신 기록을 삭제했어요`,
          confirmButtonText: '알겠어요',
          backdrop: `
          rgba(0,0,110,0.5)
          url("https://velog.velcdn.com/images/do66i/post/e814e626-b1e7-40f2-acaa-f9120dac139f/image.gif")
          left bottom
          no-repeat
        `,
        });

        onRemove(id);
      }
    });
  };

  function handleOnInput(el, maxlength) {
    if (el.value.length > maxlength) {
      el.value = el.value.substr(0, maxlength);
    }
  }

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalTitle(title);
    setLocalContent(content);
    setLocalHashtags(hashtags);
  };

  const handleEdit = () => {
    if (localTitle.length < 1) {
      localContentInput.current.focus();
      return;
    }

    if (localContent.length < 1) {
      localContentInput.current.focus();
      return;
    }

    Swal.fire({
      title: `기록을 수정할까요?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '네',
      cancelButtonText: '아니오',
      backdrop: `
      rgba(0,0,110,0.5)
      url("https://velog.velcdn.com/images/do66i/post/da278e0b-6a49-407e-8517-4b4e3621de27/image.gif")
      right bottom
      no-repeat
    `,
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: '수정 완료!',
          text: `선택하신 기록을 수정했어요`,
          confirmButtonText: '알겠어요',
          backdrop: `
          rgba(0,0,110,0.5)
          url("https://velog.velcdn.com/images/do66i/post/da278e0b-6a49-407e-8517-4b4e3621de27/image.gif")
          right bottom
          no-repeat
        `,
        });
        onEdit(id, localContent, localTitle, localHashtags);
        toggleIsEdit();
        console.log(
          '------------- 수정시 localHashtags는 어떻게 되나요 ? :',
          localHashtags,
        );
        console.log('------------- 수정시 id는 어떻게 되나요 ? :', hashtags);
      } else if (result.isDismissed) {
        Swal.fire({
          icon: 'info',
          text: `수정을 취소했어요`,
          confirmButtonText: '알겠어요',
          backdrop: `
          rgba(0,0,110,0.5)
          url("https://velog.velcdn.com/images/do66i/post/407e2a74-f65b-473b-b43f-9a48fc984943/image.gif")
          top
          no-repeat
        `,
        });
        handleQuitEdit();
      }
    });
  };

  const addTags = event => {
    const filtered = localHashtags.filter(el => el === event.target.value);
    if (event.target.value !== '' && filtered.length === 0) {
      setLocalHashtags([...localHashtags, event.target.value]);
      // selectedTags([...tags, event.target.value]);
      event.target.value = '';
    }
  };

  const removeTags = indexToRemove => {
    setLocalHashtags(
      localHashtags.filter((_, index) => index !== indexToRemove),
    );
  };

  /*<--------------------------------------------------------------------------------------------------------------------->*/

  function handleHashtags(event) {
    // onFilter(selectedHashtag);
    console.log(
      '------------- 클릭시 localHashtags는 어떻게 되나요 ? :',
      localHashtags,
    );
    toggleClicked(event);
  }

  /*<--------------------------------------------------------------------------------------------------------------------->*/
  return (
    <DiaryEditorBox
      data-aos="fade-up"
      data-aos-offset="-400"
      data-aos-delay="50"
      data-aos-duration="1000"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      data-aos-once="firse"
      data-aos-anchor-placement="top-center"
    >
      <div>
        {isEdit ? (
          <>
            <div className="title_edit">
              <DiaryEditInputBox
                maxlength="20"
                className="title_info"
                ref={lacalTitleInput}
                value={localTitle}
                onChange={e => setLocalTitle(e.target.value)}
              />
            </div>
            <div className="content_edit">
              <DiaryEditTextareaBox
                ref={localContentInput}
                value={localContent}
                maxlength="100"
                onChange={e => setLocalContent(e.target.value)}
              />
            </div>
            <TagsInput>
              <ul id="tags">
                {localHashtags.map((tag, index) => (
                  <li key={index} className="tag">
                    <span className="tag-title">{tag}</span>
                    <span
                      className="tag-close-icon"
                      onClick={() => removeTags(index)}
                    >
                      &times;
                    </span>
                  </li>
                ))}
              </ul>
              <input
                className="tag-input"
                type="text"
                onKeyUp={event =>
                  event.key === 'Enter' ? addTags(event) : null
                }
                maxlength="12"
                placeholder="최대 12자를 입력 할 수 있어요 🪐"
              />
            </TagsInput>
            <HrEdit></HrEdit>
          </>
        ) : (
          <>
            {faFishFinsIcon}
            <InfoBox>
              <div className="title" ref={titleInput}>
                <span className="date">{String(write_date).slice(0, 16)}</span>
                <div style={{ padding: '5px 0 0 0' }}>
                  <span>{title}</span>
                </div>
              </div>
              <div
                className="content"
                style={{ width: '28.5vw', padding: '% 0' }}
                ref={contentInput}
              >
                {content}
              </div>
              <div className="hashtags" style={{ width: '28.5vw' }}>
                {localHashtags.length === 0 ? (
                  <TagsInput display="none" />
                ) : (
                  <TagsInput display="flex">
                    <ul id="tags">
                      {localHashtags.map((tag, index) => (
                        <li key={index} className="tag">
                          <span
                            className="tag-title"
                            onClick={event => {
                              console.log(
                                '----------- 해시태그 클릭시 localHashtag는 어떻게 되나요 ?',
                                event.target.innerText,
                              );
                              handleHashtags(event);
                            }}
                          >
                            {tag}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </TagsInput>
                )}
              </div>
            </InfoBox>
          </>
        )}

        <br />
      </div>

      {isEdit ? (
        <>
          <div>
            <DiaryBtn onClick={handleQuitEdit}>수정 취소</DiaryBtn>
            <DiaryBtn onClick={handleEdit}>수정 완료</DiaryBtn>
          </div>
        </>
      ) : (
        <>
          <div>
            <DiaryBtn onClick={handleClickRemove}>삭제하기</DiaryBtn>
            <DiaryBtn onClick={toggleIsEdit}>수정하기</DiaryBtn>
          </div>
        </>
      )}
    </DiaryEditorBox>
  );
}

export default memo(DiaryEditor);
