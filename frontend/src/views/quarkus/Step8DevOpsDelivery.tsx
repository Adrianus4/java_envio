import React, { useState } from 'react';
import {
  GitPullRequest,
  Download,
  Terminal,
  Server,
  CheckCircle2,
  ExternalLink,
  GitBranch,
  Key,
  AlertCircle,
  RefreshCw,
  Send,
  Check,
  Copy
} from 'lucide-react';
import { useQuarkus } from '../../context/QuarkusContext';
import { quarkusFactoryService } from '../../services/quarkusFactoryService';
import { PublishGitResponse } from '../../types/quarkusFactory';

export const Step8DevOpsDelivery: React.FC = () => {
  const { currentOrder, setActiveStep, publishToGit } = useQuarkus();

  const artifacts = currentOrder?.devops_artifacts || {};
  const [activeTab, setActiveTab] = useState<'jenkins' | 'docker' | 'pr'>('jenkins');

  // Formulario de publicación a Git
  const [repoUrl, setRepoUrl] = useState<string>(
    currentOrder?.control_2_approval_info?.target_git_repo ||
    `https://github.com/empresa/${currentOrder?.basic_data?.service_name || 'microservice'}.git`
  );
  const [branchName, setBranchName] = useState<string>(
    currentOrder?.control_2_approval_info?.branch_name ||
    `feat/quarkus-${currentOrder?.basic_data?.service_name || 'service'}`
  );
  const [gitToken, setGitToken] = useState<string>('');
  const [commitMessage, setCommitMessage] = useState<string>(
    `feat: microservicio Quarkus 3.x (${currentOrder?.basic_data?.service_name || 'service'}) generado por Fábrica de Agentes`
  );

  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [publishResult, setPublishResult] = useState<PublishGitResponse | null>(null);
  const [publishError, setPublishError] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  if (!currentOrder || Object.keys(artifacts).length === 0) {
    return (
      <div className="text-center p-8 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
        <p className="text-sm text-slate-500">
          Los artefactos DevOps aún no han sido preparados. Completa el Control Humano 2 primero.
        </p>
        <button
          onClick={() => setActiveStep(5)}
          className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-semibold cursor-pointer"
        >
          Ir al Control 2 (Paso 6)
        </button>
      </div>
    );
  }

  const zipUrl = quarkusFactoryService.getExportZipUrl(currentOrder.id);

  const handlePublishToGit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoUrl.trim()) {
      setPublishError('Ingresa la URL del repositorio Git objetivo.');
      return;
    }
    setPublishError(null);
    setIsPublishing(true);

    try {
      const res = await publishToGit(
        repoUrl.trim(),
        branchName.trim() || 'main',
        gitToken.trim() || undefined,
        commitMessage.trim() || undefined
      );
      setPublishResult(res);
    } catch (err: any) {
      setPublishError(err.message || 'Error al conectar y publicar en el repositorio Git remoto.');
    } finally {
      setIsPublishing(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Banner de Entrega Exitosa */}
      <div className="bg-gradient-to-r from-emerald-600/15 via-emerald-500/5 to-transparent border-l-4 border-emerald-600 p-4 rounded-r-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-emerald-600 text-white shrink-0 mt-0.5 shadow-sm">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Paso 7: Entrega Exitosa a DevOps & Publicación Git</span>
              <span className="text-xs bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold">
                ESTADO: ENTREGADO
              </span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              El <strong>Agente DevOps</strong> ha preparado el repositorio, configurado el pipeline corporativo de Jenkins,
              generado los contenedores Docker herméticos y habilitado la publicación directa a Git o descarga ZIP.
            </p>
          </div>
        </div>

        {/* Botón de Descarga Directa ZIP */}
        <a
          href={zipUrl}
          download
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-lg hover:shadow-red-600/30 transition-all shrink-0 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Descargar .ZIP Completo</span>
        </a>
      </div>

      {/* Tabs DevOps */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('jenkins')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border cursor-pointer ${
            activeTab === 'jenkins'
              ? 'bg-blue-600 text-white border-blue-700 shadow-sm'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>Jenkinsfile Corporativo</span>
        </button>

        <button
          onClick={() => setActiveTab('docker')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border cursor-pointer ${
            activeTab === 'docker'
              ? 'bg-blue-600 text-white border-blue-700 shadow-sm'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800'
          }`}
        >
          <Server className="w-4 h-4" />
          <span>Dockerfile (JVM & UBI)</span>
        </button>

        <button
          onClick={() => setActiveTab('pr')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border cursor-pointer ${
            activeTab === 'pr'
              ? 'bg-blue-600 text-white border-blue-700 shadow-sm'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800'
          }`}
        >
          <GitPullRequest className="w-4 h-4" />
          <span>Publicación a Git & Pull Request</span>
        </button>
      </div>

      {/* Contenido según Tab */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        {activeTab === 'jenkins' && (
          <div>
            <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs">
              <span className="font-mono font-bold text-slate-700 dark:text-slate-300">Jenkinsfile</span>
              <span className="text-[11px] text-slate-500">Pipeline Declarativo con 5 Etapas</span>
            </div>
            <pre className="p-4 font-mono text-xs bg-slate-950 text-slate-200 overflow-x-auto max-h-[450px] leading-relaxed">
              <code>{artifacts['Jenkinsfile']}</code>
            </pre>
          </div>
        )}

        {activeTab === 'docker' && (
          <div>
            <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs">
              <span className="font-mono font-bold text-slate-700 dark:text-slate-300">Dockerfile.jvm</span>
              <span className="text-[11px] text-slate-500">Base Red Hat UBI 8 Minimal OpenJDK 21</span>
            </div>
            <pre className="p-4 font-mono text-xs bg-slate-950 text-slate-200 overflow-x-auto max-h-[450px] leading-relaxed">
              <code>{artifacts['Dockerfile.jvm']}</code>
            </pre>
          </div>
        )}

        {activeTab === 'pr' && (
          <div className="p-6 space-y-6">
            {/* Panel de Publicación Real a Git */}
            <form onSubmit={handlePublishToGit} className="space-y-4">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Publicar Microservicio en Repositorio Git Remoto</span>
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Envía de manera atómica todos los archivos generados (código Java, configuración, pruebas y manifiestos) a una rama de tu repositorio (GitHub, GitLab, Bitbucket).
                </p>
              </div>

              {/* Mensajes de Éxito o Error */}
              {publishResult && (
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>¡Proyecto publicado con éxito en Git!</span>
                  </div>
                  <p className="text-[11px] font-mono">
                    Commit Hash: <strong>{publishResult.commit_hash}</strong> | Rama: <strong>{publishResult.branch_name}</strong>
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {publishResult.branch_url && (
                      <a
                        href={publishResult.branch_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-700 shadow-sm"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Ver Rama en Git</span>
                      </a>
                    )}
                    {publishResult.pull_request_url && (
                      <a
                        href={publishResult.pull_request_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 shadow-sm"
                      >
                        <GitPullRequest className="w-3.5 h-3.5" />
                        <span>Crear Pull Request en Git</span>
                      </a>
                    )}
                  </div>
                </div>
              )}

              {publishError && (
                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-300 dark:border-red-800 text-xs text-red-800 dark:text-red-300 flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold mb-0.5">Error al publicar en Git:</strong>
                    <p className="font-mono text-[11px] break-words">{publishError}</p>
                    <p className="mt-1 text-[11px] opacity-90">
                      💡 Asegúrate de que la URL del repositorio sea válida y, si es privado, ingresa un <strong>Personal Access Token (PAT)</strong> con permisos de escritura (scope <code>repo</code>).
                    </p>
                  </div>
                </div>
              )}

              {/* Campos del Formulario */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    URL del Repositorio Git (HTTPS) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    placeholder="https://github.com/usuario/mi-repositorio.git"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Nombre de la Rama (Branch) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={branchName}
                    onChange={(e) => setBranchName(e.target.value)}
                    placeholder="feat/quarkus-microservice"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Key className="w-3.5 h-3.5 text-amber-500" />
                      <span>Personal Access Token (PAT / GitHub Token)</span>
                    </span>
                    <span className="text-[11px] text-slate-400 font-normal">Efímero (No se guarda en disco)</span>
                  </label>
                  <input
                    type="password"
                    value={gitToken}
                    onChange={(e) => setGitToken(e.target.value)}
                    placeholder="ghp_xxxxxxxxxxxxxxxxxxxx (Opcional si usa credenciales Git locales)"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Se utiliza únicamente en memoria para la sesión del push, garantizando cero persistencia de secretos.
                  </p>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Mensaje del Commit
                  </label>
                  <input
                    type="text"
                    value={commitMessage}
                    onChange={(e) => setCommitMessage(e.target.value)}
                    placeholder="feat: microservicio inicial generado"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <div className="text-xs text-slate-500">
                  Directorio sincronizado en: <code className="font-mono text-[11px]">backend/workspaces/{currentOrder.id}</code>
                </div>

                <button
                  type="submit"
                  disabled={isPublishing}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md hover:shadow-blue-600/30 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isPublishing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Conectando y enviando commits a Git...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Enviar Proyecto al Repositorio Git 🚀</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Tarjeta resumen del PR */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  PULL REQUEST LISTO
                </span>
                <span className="text-xs font-mono text-slate-500">
                  Rama de Origen: {branchName}
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                feat({currentOrder.basic_data.service_name}): Entrega inicial microservicio Quarkus 3.x
              </h4>

              <p className="text-xs text-slate-600 dark:text-slate-400">
                {currentOrder.control_2_approval_info?.comments || 'Aprobado en revisión técnica con 100% de pruebas unitarias y auditoría de calidad.'}
              </p>

              <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200 dark:border-slate-700 flex flex-wrap gap-4">
                <div>• Generado por: <strong>Agente DevOps (Lorena)</strong></div>
                <div>• Rama Base: <strong>main</strong></div>
                <div>• Total Archivos: <strong>{Object.keys(currentOrder.generated_files || {}).length} archivos</strong></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
