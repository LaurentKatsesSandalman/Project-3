const [viewMode, setViewMode] = useState('edit'); // 'edit', 'preview', or 'result' 
 
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

      {viewMode === 'preview' ? (
        <FormPreview
          formTitle={formTitle}
          formDescription={formDescription}
          formFields={formFields}
        />
      ) : viewMode === 'result' ? (
        <div className={styles['result-page']}>
          {/* Page blanche pour les résultats pour le moments a changer pour les vrai result*/}
        </div>
      ) : (