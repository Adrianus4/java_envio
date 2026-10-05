import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  FileText,
  ArrowRight,
  Send,
  RefreshCw,
  Terminal,
  Activity,
  CheckCircle2,
  Clock,
  Sparkles,
  Layers,
  Code
} from 'lucide-react';
import { useQuarkus } from '../../context/QuarkusContext';
import { quarkusFactoryService } from '../../services/quarkusFactoryService';
import { ExecuteTestResponse } from '../../types/quarkusFactory';

export const Step6Documentation: React.FC = () => {
  const { currentOrder, setActiveStep } = useQuarkus();

  const docs = currentOrder?.documentation || {};
  const docKeys = Object.keys(docs);

  const [activeTab, setActiveTab] = useState<string>('tester'); // Por defecto en el probador interactivo para probarlo en la web
  const [activeDoc, setActiveDoc] = useState<string>(docKeys[0] || 'README.md');

  // Estados del probador REST interactivo (Swagger / API Tester In-App)
  const defaultEndpoints = useMemo(() => {
    const list = [
      { method: 'GET', path: '/q/health', desc: 'Sondas de Liveness y Readiness SmallRye Health' },
      { method: 'GET', path: '/q/metrics', desc: 'Métricas de telemetría y Prometheus Quarkus' }
    ];

    // Extraer entidades del modelo de BD para poblar endpoints reales
    const tables = currentOrder?.database_model?.tables || [];
    tables.forEach((t) => {
      const cleanName = t.name.toLowerCase();
      list.push({
        method: 'GET',
        path: `/api/v1/${cleanName}`,
        desc: `Listar todos los registros de ${t.name}`
      });
      list.push({
        method: 'POST',
        path: `/api/v1/${cleanName}`,
        desc: `Crear nuevo registro de ${t.name} con DTO Record Java 21`
      });
    });

    if (tables.length === 0 && currentOrder?.basic_data?.service_name) {
      const stem = currentOrder.basic_data.service_name.replace('-service', '');
      list.push({ method: 'GET', path: `/api/v1/${stem}s`, desc: `Consultar ${stem}s` });
      list.push({ method: 'POST', path: `/api/v1/${stem}s`, desc: `Registrar ${stem}` });
    }

    return list;
  }, [currentOrder]);

  const [selectedMethod, setSelectedMethod] = useState<'GET' | 'POST' | 'PUT' | 'DELETE'>('GET');
  const [selectedPath, setSelectedPath] = useState<string>(defaultEndpoints[0]?.path || '/q/health');
  const [requestBody, setRequestBody] = useState<string>('{\n  "estado": "ACTIVO",\n  "observaciones": "Prueba desde consola web"\n}');

  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [testResponse, setTestResponse] = useState<ExecuteTestResponse | null>(null);
  const [testError, setTestError] = useState<string | null>(null);

  if (!currentOrder || docKeys.length === 0) {
    return (
      <div className="text-center p-8 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
        <p className="text-sm text-slate-500">
          La documentación oficial aún no ha sido generada. Completa el Paso 4 primero.
        </p>
        <button
          onClick={() => setActiveStep(3)}
          className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-semibold cursor-pointer"
        >
          Ir al Paso 4: Construcción & QA
        </button>
      </div>
    );
  }

  const handleSelectPredefined = (method: 'GET' | 'POST' | 'PUT' | 'DELETE', path: string) => {
    setSelectedMethod(method);
    setSelectedPath(path);
    if (method === 'POST' || method === 'PUT') {
      setRequestBody('{\n  "nombre": "Prueba Web",\n  "estado": "ACTIVO",\n  "monto": 1500.00\n}');
    }
  };

  const handleExecuteRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsExecuting(true);
    setTestError(null);
    setTestResponse(null);

    let parsedPayload = null;
    if (selectedMethod === 'POST' || selectedMethod === 'PUT') {
      try {
        parsedPayload = requestBody ? JSON.parse(requestBody) : null;
      } catch (err: any) {
        setTestError(`El cuerpo JSON contiene errores de sintaxis: ${err.message}`);
        setIsExecuting(false);
        return;
      }
    }

    try {
      const res = await quarkusFactoryService.executeTest(currentOrder.id, {
        method: selectedMethod,
        path: selectedPath,
        payload: parsedPayload
      });
      setTestResponse(res);
    } catch (err: any) {
      setTestError(err.message || 'Error al ejecutar la petición en el sandbox.');
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-600/10 via-purple-500/5 to-transparent border-l-4 border-purple-600 p-4 rounded-r-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Paso 5: Documentación Oficial & Consola Web para Probar la API
            </h3>
            <span className="text-xs bg-purple-600 text-white px-2 py-0.5 rounded-full font-semibold">
              Sandbox Web Activo
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Puedes <strong>probar directamente en la web</strong> los endpoints generados o inspeccionar los 5 documentos oficiales.
          </p>
        </div>

        {/* Botón rápido para saltar a probar */}
        <button
          type="button"
          onClick={() => setActiveTab('tester')}
          className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>🧪 Probar Microservicio en la Web</span>
        </button>
      </div>

      {/* Selector Principal de Modo: Consola Web vs Documentos */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('tester')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'tester'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <Activity className="w-4 h-4 text-emerald-400" />
          <span>Consola REST Interactiva (Probar en la Web)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('docs')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'docs'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Visor de Documentos Oficiales (5 Archivos)</span>
        </button>
      </div>

      {/* VISTA 1: CONSOLA DE PRUEBAS REST INTERACTIVA EN LA WEB */}
      {activeTab === 'tester' && (
        <div className="space-y-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-500" />
                <span>Probador de Endpoints REST (Estilo Swagger / Postman)</span>
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Envía peticiones en tiempo real a los endpoints sintetizados y recibe respuestas inmediatas en formato JSON.
              </p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-mono font-semibold">
              Runtime: Quarkus 3.15 LTS (Java 21)
            </span>
          </div>

          {/* Endpoints rápidos precargados */}
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Endpoints sugeridos de tu microservicio (Haz clic para cargar):
            </span>
            <div className="flex flex-wrap gap-2">
              {defaultEndpoints.map((ep, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectPredefined(ep.method as any, ep.path)}
                  className={`text-xs px-3 py-1.5 rounded-lg border font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                    selectedPath === ep.path && selectedMethod === ep.method
                      ? 'bg-purple-50 dark:bg-purple-950/60 border-purple-500 text-purple-700 dark:text-purple-300 font-bold shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                      ep.method === 'GET'
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                        : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300'
                    }`}
                  >
                    {ep.method}
                  </span>
                  <span>{ep.path}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Formulario de Petición HTTP */}
          <form onSubmit={handleExecuteRequest} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <select
                value={selectedMethod}
                onChange={(e) => setSelectedMethod(e.target.value as any)}
                className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs font-mono font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>

              <input
                type="text"
                value={selectedPath}
                onChange={(e) => setSelectedPath(e.target.value)}
                placeholder="/api/v1/recurso"
                className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs font-mono text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                required
              />

              <button
                type="submit"
                disabled={isExecuting}
                className="px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md hover:shadow-purple-600/30 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer shrink-0"
              >
                {isExecuting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Ejecutando...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Enviar Petición (Try it out)</span>
                  </>
                )}
              </button>
            </div>

            {(selectedMethod === 'POST' || selectedMethod === 'PUT') && (
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Cuerpo de la Petición (JSON Payload):
                </label>
                <textarea
                  rows={4}
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-950 text-slate-100 font-mono text-xs focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
            )}
          </form>

          {/* Consola de Respuesta */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-200 space-y-2 shadow-inner">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[11px] text-slate-400">
              <div className="flex items-center gap-3">
                <span>
                  HTTP Status:{' '}
                  {testResponse ? (
                    <strong className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold border border-emerald-800">
                      {testResponse.status_code} OK
                    </strong>
                  ) : (
                    <span className="text-slate-500">—</span>
                  )}
                </span>
                {testResponse && (
                  <span className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>Latencia: {testResponse.latency_ms}ms</span>
                  </span>
                )}
              </div>
              <span className="text-[10px] text-slate-500">Formato: application/json</span>
            </div>

            {testError && (
              <div className="p-3 rounded-lg bg-red-950/80 border border-red-800 text-red-300 text-xs">
                ⚠️ {testError}
              </div>
            )}

            <pre className="whitespace-pre-wrap overflow-x-auto max-h-[300px] leading-relaxed text-emerald-400">
              {testResponse
                ? JSON.stringify(testResponse.response_body, null, 2)
                : '// Selecciona un endpoint arriba y haz clic en "Enviar Petición (Try it out)" para ver la respuesta aquí.'}
            </pre>
          </div>
        </div>
      )}

      {/* VISTA 2: VISOR DE DOCUMENTOS OFICIALES */}
      {activeTab === 'docs' && (
        <div className="space-y-4">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {docKeys.map((docName) => (
              <button
                key={docName}
                onClick={() => setActiveDoc(docName)}
                className={`px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border cursor-pointer ${
                  activeDoc === docName
                    ? 'bg-purple-600 text-white border-purple-700 shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{docName}</span>
              </button>
            ))}
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs">
              <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{activeDoc}</span>
              <span className="text-[11px] text-slate-500">Agente Documentador · Markdown</span>
            </div>
            <pre className="p-5 font-mono text-xs bg-slate-950 text-slate-200 overflow-x-auto max-h-[500px] leading-relaxed whitespace-pre-wrap">
              {docs[activeDoc]}
            </pre>
          </div>
        </div>
      )}

      {/* Navegación al Control 2 */}
      <div className="flex justify-end pt-2">
        <button
          onClick={() => setActiveStep(5)}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-lg hover:shadow-amber-600/30 transition-all cursor-pointer"
        >
          <span>Ir al Control Humano 2: Revisión Final de Entrega (Paso 6)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
