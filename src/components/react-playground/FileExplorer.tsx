import { useState } from "react";

import { FileCode2, Package, Plus, Trash2 } from "lucide-react";

import { ENTRY, PACKAGE_JSON, SOURCE_EXT } from "./seed";

type FileExplorerProps = {
  files: string[];
  active: string;
  onSelect: (path: string) => void;
  onCreate: (path: string) => string | null;
  onDelete: (path: string) => void;
};

export function FileExplorer({
  files,
  active,
  onSelect,
  onCreate,
  onDelete,
}: FileExplorerProps) {
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);

  const commit = () => {
    const nextError = onCreate(draft.trim());
    if (nextError) {
      setError(nextError);
      return;
    }
    setCreating(false);
    setDraft("");
    setError(null);
  };

  const cancel = () => {
    setCreating(false);
    setDraft("");
    setError(null);
  };

  const sorted = [...files].sort((left, right) => {
    if (left === ENTRY) return -1;
    if (right === ENTRY) return 1;
    if (left === PACKAGE_JSON) return 1;
    if (right === PACKAGE_JSON) return -1;
    return left.localeCompare(right);
  });

  return (
    <div className="wp-explorer">
      <div className="wp-explorer-head">
        <span>Files</span>
        <button
          type="button"
          className="wp-icon-button"
          aria-label="Create a file"
          title="New file"
          onClick={() => setCreating(true)}
        >
          <Plus aria-hidden="true" size={16} />
        </button>
      </div>
      <ul className="wp-file-list">
        {sorted.map((path) => {
          const removable = path !== ENTRY && path !== PACKAGE_JSON;
          return (
            <li
              key={path}
              className={
                path === active ? "wp-file-row is-active" : "wp-file-row"
              }
            >
              <button
                type="button"
                className="wp-file-name"
                onClick={() => onSelect(path)}
              >
                {path === PACKAGE_JSON ? (
                  <Package aria-hidden="true" size={14} />
                ) : (
                  <FileCode2 aria-hidden="true" size={14} />
                )}
                <span>{path}</span>
                {path === ENTRY ? (
                  <span className="wp-entry-badge">entry</span>
                ) : null}
              </button>
              {removable ? (
                <button
                  type="button"
                  className="wp-icon-button is-danger"
                  aria-label={`Delete ${path}`}
                  title={`Delete ${path}`}
                  onClick={() => onDelete(path)}
                >
                  <Trash2 aria-hidden="true" size={14} />
                </button>
              ) : null}
            </li>
          );
        })}
        {creating ? (
          <li className="wp-file-row">
            <input
              autoFocus
              className="wp-new-file"
              aria-label="New file name"
              placeholder="Name.tsx"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") commit();
                if (event.key === "Escape") cancel();
              }}
              onBlur={cancel}
            />
          </li>
        ) : null}
      </ul>
      {error ? <p className="wp-explorer-error">{error}</p> : null}
      <p className="wp-explorer-hint">
        Add a JS/TS file, import it from another file, then run the project.
      </p>
      {SOURCE_EXT.test(active) ? null : (
        <p className="wp-explorer-hint is-config">
          Dependency pins apply on the next Run.
        </p>
      )}
    </div>
  );
}
