import styles from "../FormCreator/FormCreator.module.css"

interface NavBarProps {
  viewMode : "preview"|"edit"|"result";
  setViewMode : React.Dispatch<React.SetStateAction<"preview" | "edit" | "result">>;
}
 
function NavBar ( {viewMode, setViewMode} : NavBarProps) {
    return (
    <div className={styles['mode-toggle-buttons']}>Add commentMore actions
            <button
              type="button"
              onClick={() => setViewMode('edit')}
              className={`${styles['mode-toggle-button']} ${viewMode === 'edit' ? styles['active'] : ''}`}
            >
              Éditer
            </button>
            <button
              type="button"
              onClick={() => setViewMode('preview')}
              className={`${styles['mode-toggle-button']} ${viewMode === 'preview' ? styles['active'] : ''}`}
            >
              Aperçu
            </button>
            <button
              type="button"
              onClick={() => setViewMode('result')}
              className={`${styles['mode-toggle-button']} ${viewMode === 'result' ? styles['active'] : ''}`}
            >
              Résultat
            </button>
          </div>
)}

export default NavBar;