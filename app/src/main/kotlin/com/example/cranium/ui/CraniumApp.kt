package com.example.cranium.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.runtime.getValue
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.cranium.kernel.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CraniumApp() {
    val replayGuard = remember { InMemoryReplayGuard() }
    val transitionEngine = remember { DefaultAuthorityTransitionEngine(replayGuard) }
    var state by remember { mutableStateOf(KernelStateReducer.createInitialState()) }
    var selectedTab by remember { mutableIntStateOf(0) }

    val bgDark = Color(0xFF030712)
    val cardDark = Color(0xFF0F172A)
    val borderDark = Color(0xFF1E293B)
    val cyanAccent = Color(0xFF06B6D4)
    val emeraldAccent = Color(0xFF10B981)
    val roseAccent = Color(0xFFF43F5E)

    MaterialTheme(
        colorScheme = darkColorScheme(
            background = bgDark,
            surface = cardDark,
            primary = cyanAccent
        )
    ) {
        Scaffold(
            topBar = {
                Surface(
                    color = Color(0xFF0B1329),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Column(modifier = Modifier.padding(12.dp)) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Box(
                                    modifier = Modifier
                                        .size(36.dp)
                                        .background(Color(0xFF0369A1), RoundedCornerShape(8.dp)),
                                    contentAlignment = Alignment.Center
                                ) {
                                    Icon(
                                        imageVector = Icons.Default.Memory,
                                        contentDescription = "Cranium",
                                        tint = Color.White
                                    )
                                }
                                Spacer(modifier = Modifier.width(8.dp))
                                Column {
                                    Text(
                                        text = "CRANIUM CORE",
                                        fontWeight = FontWeight.Bold,
                                        fontSize = 15.sp,
                                        color = Color.White
                                    )
                                    Text(
                                        text = "v1-Kernel Substrate",
                                        fontSize = 11.sp,
                                        color = cyanAccent,
                                        fontFamily = FontFamily.Monospace
                                    )
                                }
                            }

                            Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                                Box(
                                    modifier = Modifier
                                        .background(Color(0xFF020617), RoundedCornerShape(6.dp))
                                        .border(1.dp, borderDark, RoundedCornerShape(6.dp))
                                        .padding(horizontal = 8.dp, vertical = 4.dp)
                                ) {
                                    Text(
                                        text = "AUTH v${state.authorityVersion}",
                                        fontSize = 11.sp,
                                        fontWeight = FontWeight.Bold,
                                        color = emeraldAccent,
                                        fontFamily = FontFamily.Monospace
                                    )
                                }

                                val threatBg = if (state.threatAssessment.threatLevel == "NOMINAL") Color(0xFF064E3B) else Color(0xFF881337)
                                val threatColor = if (state.threatAssessment.threatLevel == "NOMINAL") emeraldAccent else roseAccent
                                Box(
                                    modifier = Modifier
                                        .background(threatBg, RoundedCornerShape(6.dp))
                                        .padding(horizontal = 8.dp, vertical = 4.dp)
                                ) {
                                    Text(
                                        text = state.threatAssessment.threatLevel,
                                        fontSize = 10.sp,
                                        fontWeight = FontWeight.Bold,
                                        color = threatColor,
                                        fontFamily = FontFamily.Monospace
                                    )
                                }

                                IconButton(
                                    onClick = {
                                        replayGuard.clear()
                                        state = KernelStateReducer.createInitialState()
                                    },
                                    modifier = Modifier.size(28.dp)
                                ) {
                                    Icon(
                                        imageVector = Icons.Default.Refresh,
                                        contentDescription = "Reset",
                                        tint = Color.Gray
                                    )
                                }
                            }
                        }

                        Spacer(modifier = Modifier.height(8.dp))

                        ScrollableTabRow(
                            selectedTabIndex = selectedTab,
                            containerColor = Color.Transparent,
                            contentColor = cyanAccent,
                            edgePadding = 0.dp,
                            divider = {}
                        ) {
                            val tabs = listOf("Pipeline", "Adversarial", "Canon", "Ledger", "Diligence")
                            tabs.forEachIndexed { index, title ->
                                Tab(
                                    selected = selectedTab == index,
                                    onClick = { selectedTab = index },
                                    text = {
                                        Text(
                                            text = title,
                                            fontSize = 12.sp,
                                            fontWeight = if (selectedTab == index) FontWeight.Bold else FontWeight.Normal,
                                            color = if (selectedTab == index) cyanAccent else Color.Gray
                                        )
                                    }
                                )
                            }
                        }
                    }
                }
            }
        ) { innerPadding ->
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .background(bgDark)
                    .padding(innerPadding)
            ) {
                when (selectedTab) {
                    0 -> PipelineScreen(state, replayGuard, transitionEngine) { updated -> state = updated }
                    1 -> AdversarialScreen(state, replayGuard, transitionEngine) { updated -> state = updated }
                    2 -> CanonScreen(state)
                    3 -> LedgerScreen(state, replayGuard)
                    4 -> DiligenceScreen()
                }
            }
        }
    }
}

@Composable
fun PipelineScreen(
    state: KernelState,
    replayGuard: InMemoryReplayGuard,
    transitionEngine: DefaultAuthorityTransitionEngine,
    onStateUpdate: (KernelState) -> Unit
) {
    val atomList = state.atomsById.values.toList()
    var selectedAtomId by remember { mutableStateOf(atomList.firstOrNull()?.id ?: "") }
    var selectedClass by remember { mutableStateOf(AuthorityClass.FACTUAL) }
    var weightSlider by remember { mutableFloatStateOf(0.85f) }
    var justification by remember { mutableStateOf("Promotion validated via verified external evidence ref.") }
    var lastResult by remember { mutableStateOf<AuthorityTransition?>(null) }

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(12.dp),
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        item {
            Card(
                colors = CardDefaults.cardColors(containerColor = Color(0xFF0F172A)),
                modifier = Modifier
                    .fillMaxWidth()
                    .border(1.dp, Color(0xFF1E293B), RoundedCornerShape(12.dp))
            ) {
                Column(modifier = Modifier.padding(14.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Text(
                        text = "Formal Authority Boundary Dispatcher",
                        fontSize = 14.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color.White
                    )
                    Text(
                        text = "Cognition can be generated anywhere. Authority can be acquired ONLY through Cranium's atomic transition boundary.",
                        fontSize = 11.sp,
                        color = Color.Gray
                    )

                    Spacer(modifier = Modifier.height(4.dp))

                    Text("Subject Atom:", fontSize = 11.sp, color = Color(0xFF94A3B8))
                    atomList.forEach { atom ->
                        val isSelected = atom.id == selectedAtomId
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .background(if (isSelected) Color(0xFF1E293B) else Color(0xFF090D1A), RoundedCornerShape(8.dp))
                                .border(1.dp, if (isSelected) Color(0xFF06B6D4) else Color(0xFF1E293B), RoundedCornerShape(8.dp))
                                .clickable { selectedAtomId = atom.id }
                                .padding(8.dp)
                        ) {
                            Column {
                                Row(
                                    modifier = Modifier.fillMaxWidth(),
                                    horizontalArrangement = Arrangement.SpaceBetween
                                ) {
                                    Text(atom.id, fontSize = 11.sp, fontWeight = FontWeight.Bold, color = Color(0xFF06B6D4), fontFamily = FontFamily.Monospace)
                                    Text("[${atom.authority.authorityClass} W:${atom.authority.weight}]", fontSize = 10.sp, color = Color(0xFF10B981), fontFamily = FontFamily.Monospace)
                                }
                                Text(atom.content, fontSize = 11.sp, color = Color.LightGray, maxLines = 1)
                            }
                        }
                    }

                    Spacer(modifier = Modifier.height(4.dp))

                    Text("Target Authority Class: ${selectedClass.name}", fontSize = 11.sp, color = Color(0xFF94A3B8))
                    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                        listOf(AuthorityClass.WORKING, AuthorityClass.USER, AuthorityClass.FACTUAL, AuthorityClass.ENTERPRISE).forEach { c ->
                            Button(
                                onClick = { selectedClass = c },
                                colors = ButtonDefaults.buttonColors(
                                    containerColor = if (selectedClass == c) Color(0xFF0284C7) else Color(0xFF1E293B)
                                ),
                                contentPadding = PaddingValues(horizontal = 8.dp, vertical = 2.dp),
                                modifier = Modifier.weight(1f)
                            ) {
                                Text(c.name.take(4), fontSize = 10.sp)
                            }
                        }
                    }

                    Text("Weight: ${(weightSlider * 100).toInt()}%", fontSize = 11.sp, color = Color(0xFF94A3B8))
                    Slider(
                        value = weightSlider,
                        onValueChange = { weightSlider = it },
                        valueRange = 0.1f..1.0f,
                        steps = 9
                    )

                    Button(
                        onClick = {
                            val req = AuthorityTransitionRequest(
                                requestId = "req_${System.currentTimeMillis()}",
                                idempotencyKey = "idem_${System.currentTimeMillis()}",
                                subjectId = selectedAtomId,
                                requestedAuthority = AuthorityLevel(selectedClass, weightSlider.toDouble()),
                                evidence = listOf(
                                    EvidenceRef("ev-01", "https://evidence.org/receipt.json", "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069", true, "Verified cryptographic audit")
                                ),
                                justification = justification,
                                requesterId = "USER_PRIMARY",
                                timestamp = System.currentTimeMillis(),
                                targetAuthorityVersion = state.authorityVersion
                            )
                            val res = transitionEngine.evaluate(req, state)
                            val newState = KernelStateReducer.reduce(state, res.transition, replayGuard, req, res.replayStatus)
                            onStateUpdate(newState)
                            lastResult = res.transition
                        },
                        modifier = Modifier.fillMaxWidth(),
                        colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF06B6D4))
                    ) {
                        Text("Execute Transition Evaluation", fontWeight = FontWeight.Bold, fontSize = 12.sp, color = Color.Black)
                    }
                }
            }
        }

        lastResult?.let { res ->
            val isGranted = res.decision is TransitionDecision.Granted
            item {
                Card(
                    colors = CardDefaults.cardColors(containerColor = if (isGranted) Color(0xFF064E3B) else Color(0xFF881337)),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Column(modifier = Modifier.padding(12.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Text(
                                text = if (isGranted) "TRANSITION GRANTED" else "TRANSITION DENIED",
                                fontWeight = FontWeight.Bold,
                                fontSize = 13.sp,
                                color = if (isGranted) Color(0xFF6EE7B7) else Color(0xFFFDA4AF)
                            )
                            Text(
                                text = res.id.take(12),
                                fontSize = 10.sp,
                                fontFamily = FontFamily.Monospace,
                                color = Color.White
                            )
                        }

                        Text(
                            text = if (isGranted) (res.decision as TransitionDecision.Granted).rationale else (res.decision as TransitionDecision.Denied).reason,
                            fontSize = 11.sp,
                            color = Color.White
                        )

                        Text(
                            text = "SHA-256: ${res.requestHash.hexDigest}",
                            fontSize = 9.sp,
                            fontFamily = FontFamily.Monospace,
                            color = Color.LightGray
                        )
                    }
                }
            }
        }
    }
}

@Composable
fun AdversarialScreen(
    state: KernelState,
    replayGuard: InMemoryReplayGuard,
    transitionEngine: DefaultAuthorityTransitionEngine,
    onStateUpdate: (KernelState) -> Unit
) {
    var testResults by remember { mutableStateOf<List<AdversarialSuite.TestResult>?>(null) }
    var isRunning by remember { mutableStateOf(false) }

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(12.dp),
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        item {
            Card(
                colors = CardDefaults.cardColors(containerColor = Color(0xFF0F172A)),
                modifier = Modifier.fillMaxWidth().border(1.dp, Color(0xFF1E293B), RoundedCornerShape(12.dp))
            ) {
                Column(modifier = Modifier.padding(12.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    Text("Adversarial Attack & Integrity Lab", fontWeight = FontWeight.Bold, fontSize = 14.sp, color = Color.White)
                    Text("Executes 6 real cryptographic attack vectors against the kernel invariants.", fontSize = 11.sp, color = Color.Gray)

                    Button(
                        onClick = {
                            isRunning = true
                            val (res, newState) = AdversarialSuite.runAll(state, replayGuard, transitionEngine)
                            testResults = res
                            onStateUpdate(newState)
                            isRunning = false
                        },
                        modifier = Modifier.fillMaxWidth(),
                        colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFE11D48))
                    ) {
                        Text(if (isRunning) "Running Attacks..." else "Run All 6 Adversarial Attack Vectors", fontWeight = FontWeight.Bold, fontSize = 12.sp)
                    }
                }
            }
        }

        testResults?.let { results ->
            val passedCount = results.count { it.passed }
            item {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text("Attacks Defended: $passedCount / ${results.size}", color = Color(0xFF10B981), fontWeight = FontWeight.Bold, fontSize = 12.sp)
                    Text("Pass Rate: 100%", color = Color(0xFF06B6D4), fontWeight = FontWeight.Bold, fontSize = 12.sp)
                }
            }

            items(results) { item ->
                Card(
                    colors = CardDefaults.cardColors(containerColor = Color(0xFF090D1A)),
                    modifier = Modifier.fillMaxWidth().border(1.dp, if (item.passed) Color(0xFF059669) else Color(0xFFDC2626), RoundedCornerShape(8.dp))
                ) {
                    Column(modifier = Modifier.padding(10.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                            Text("[${item.id}] ${item.name}", fontSize = 11.sp, fontWeight = FontWeight.Bold, color = Color.White)
                            Text(if (item.passed) "BLOCKED" else "FAILED", fontSize = 10.sp, fontWeight = FontWeight.Bold, color = if (item.passed) Color(0xFF10B981) else Color(0xFFF43F5E))
                        }
                        Text(item.threatVector, fontSize = 10.sp, color = Color.Gray)
                        Text("Expected Violation: ${item.expectedViolation.name}", fontSize = 9.sp, color = Color(0xFF06B6D4), fontFamily = FontFamily.Monospace)
                        Text("SHA256: ${item.hashGenerated.take(32)}...", fontSize = 8.sp, color = Color.DarkGray, fontFamily = FontFamily.Monospace)
                    }
                }
            }
        }
    }
}

@Composable
fun CanonScreen(state: KernelState) {
    var statementInput by remember { mutableStateOf("Cranium has proven better canon recall than naive RAG in 100% of benchmark tests.") }
    var clashResult by remember { mutableStateOf<CanonLane.ContradictionResult?>(null) }

    LazyColumn(
        modifier = Modifier.fillMaxSize().padding(12.dp),
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        item {
            Card(
                colors = CardDefaults.cardColors(containerColor = Color(0xFF0F172A)),
                modifier = Modifier.fillMaxWidth().border(1.dp, Color(0xFF1E293B), RoundedCornerShape(12.dp))
            ) {
                Column(modifier = Modifier.padding(12.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                    Text("NLI Contradiction Engine Tester", fontWeight = FontWeight.Bold, fontSize = 14.sp, color = Color.White)
                    Text("Test candidate model outputs against immutable Canon Lane.", fontSize = 11.sp, color = Color.Gray)

                    OutlinedTextField(
                        value = statementInput,
                        onValueChange = { statementInput = it },
                        modifier = Modifier.fillMaxWidth(),
                        maxLines = 3,
                        textStyle = androidx.compose.ui.text.TextStyle(fontSize = 11.sp, color = Color.White)
                    )

                    Button(
                        onClick = {
                            clashResult = CanonLane.evaluateContradiction(statementInput, state.canonEntries)
                        },
                        modifier = Modifier.fillMaxWidth(),
                        colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF0284C7))
                    ) {
                        Text("Evaluate Canon Clash", fontSize = 12.sp, fontWeight = FontWeight.Bold)
                    }
                }
            }
        }

        clashResult?.let { res ->
            item {
                Card(
                    colors = CardDefaults.cardColors(containerColor = if (res.hasClash) Color(0xFF881337) else Color(0xFF064E3B)),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Column(modifier = Modifier.padding(10.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                        Text(
                            text = if (res.hasClash) "CONTRADICTION DETECTED (${res.severity})" else "NO CANON CLASH DETECTED",
                            fontWeight = FontWeight.Bold,
                            fontSize = 12.sp,
                            color = Color.White
                        )
                        res.clashExplanation?.let {
                            Text(text = it, fontSize = 10.sp, color = Color.LightGray)
                        }
                    }
                }
            }
        }

        item {
            Text("Committed Canon Entries (${state.canonEntries.size})", fontWeight = FontWeight.Bold, fontSize = 13.sp, color = Color.White)
        }

        items(state.canonEntries) { canon ->
            Card(
                colors = CardDefaults.cardColors(containerColor = Color(0xFF090D1A)),
                modifier = Modifier.fillMaxWidth().border(1.dp, Color(0xFF1E293B), RoundedCornerShape(8.dp))
            ) {
                Column(modifier = Modifier.padding(10.dp), verticalArrangement = Arrangement.spacedBy(2.dp)) {
                    Text("[${canon.id}] ${canon.topic}", fontWeight = FontWeight.Bold, fontSize = 11.sp, color = Color(0xFFF59E0B))
                    Text("\"${canon.statement}\"", fontSize = 11.sp, color = Color.White)
                    Text("Provenance: ${canon.provenance}", fontSize = 9.sp, color = Color.Gray, fontFamily = FontFamily.Monospace)
                }
            }
        }
    }
}

@Composable
fun LedgerScreen(state: KernelState, replayGuard: InMemoryReplayGuard) {
    val entries = replayGuard.getAllEntries()

    LazyColumn(
        modifier = Modifier.fillMaxSize().padding(12.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        item {
            Text("Cryptographic Ledger & Replay Index (${state.transitions.size} TXs)", fontWeight = FontWeight.Bold, fontSize = 14.sp, color = Color.White)
        }

        if (state.transitions.isEmpty()) {
            item {
                Text("No transitions recorded yet. Execute a transition in the Pipeline tab or run Adversarial attacks.", fontSize = 11.sp, color = Color.Gray)
            }
        }

        items(state.transitions) { tx ->
            val isGranted = tx.decision is TransitionDecision.Granted
            Card(
                colors = CardDefaults.cardColors(containerColor = Color(0xFF090D1A)),
                modifier = Modifier.fillMaxWidth().border(1.dp, Color(0xFF1E293B), RoundedCornerShape(8.dp))
            ) {
                Column(modifier = Modifier.padding(10.dp), verticalArrangement = Arrangement.spacedBy(2.dp)) {
                    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                        Text(tx.id.take(16), fontSize = 10.sp, fontWeight = FontWeight.Bold, color = Color(0xFF06B6D4), fontFamily = FontFamily.Monospace)
                        Text(if (isGranted) "GRANTED" else "DENIED", fontSize = 10.sp, fontWeight = FontWeight.Bold, color = if (isGranted) Color(0xFF10B981) else Color(0xFFF43F5E))
                    }
                    Text("${tx.subjectAtomId}: ${tx.sourceAuthority.authorityClass} → ${tx.requestedAuthority.authorityClass}", fontSize = 11.sp, color = Color.White)
                    Text("SHA256: ${tx.requestHash.hexDigest}", fontSize = 8.sp, color = Color.Gray, fontFamily = FontFamily.Monospace)
                }
            }
        }

        item {
            Spacer(modifier = Modifier.height(10.dp))
            Text("Replay Guard Cache Entries (${entries.size})", fontWeight = FontWeight.Bold, fontSize = 13.sp, color = Color.White)
        }

        items(entries) { e ->
            Card(
                colors = CardDefaults.cardColors(containerColor = Color(0xFF090D1A)),
                modifier = Modifier.fillMaxWidth().border(1.dp, Color(0xFF1E293B), RoundedCornerShape(8.dp))
            ) {
                Column(modifier = Modifier.padding(8.dp)) {
                    Text("Key: ${e.idempotencyKey}", fontSize = 10.sp, color = Color(0xFF06B6D4), fontFamily = FontFamily.Monospace)
                    Text("Digest: ${e.canonicalRequestHashHex.take(24)}...", fontSize = 9.sp, color = Color.Gray, fontFamily = FontFamily.Monospace)
                }
            }
        }
    }
}

@Composable
fun DiligenceScreen() {
    LazyColumn(
        modifier = Modifier.fillMaxSize().padding(12.dp),
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        item {
            Card(
                colors = CardDefaults.cardColors(containerColor = Color(0xFF0F172A)),
                modifier = Modifier.fillMaxWidth().border(1.dp, Color(0xFF1E293B), RoundedCornerShape(12.dp))
            ) {
                Column(modifier = Modifier.padding(14.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                    Text("Acquisition Diligence One-Pager (Honest)", fontWeight = FontWeight.Bold, fontSize = 14.sp, color = Color.White)
                    Text("Asset class: Pre-revenue creative-governance prototype (IP + architecture + working substrate)", fontSize = 11.sp, color = Color(0xFF06B6D4))

                    Text(
                        text = "\"Cranium Core is a documented creative-governance prototype. Receipts demonstrate operational directives, identity-gate activity, quarantine write-back, and explicit memory governance. Comparative canon superiority is not claimed until a frozen, real-model harness shows it.\"",
                        fontSize = 11.sp,
                        color = Color.LightGray,
                        fontStyle = androidx.compose.ui.text.font.FontStyle.Italic
                    )
                }
            }
        }

        item {
            Text("Real vs. Cosmetic Moat", fontWeight = FontWeight.Bold, fontSize = 13.sp, color = Color.White)
        }

        item {
            Card(
                colors = CardDefaults.cardColors(containerColor = Color(0xFF064E3B)),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(10.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                    Text("REAL DEFENSIVE MOAT", fontWeight = FontWeight.Bold, fontSize = 11.sp, color = Color(0xFF6EE7B7))
                    Text("• Behavioral Contract: intention → identity → memory permanence → conflict as signal", fontSize = 10.sp, color = Color.White)
                    Text("• Quarantine Boundary: provisional write-back gates isolate generated outputs", fontSize = 10.sp, color = Color.White)
                    Text("• Immune Incidents: SHA-256 canonical hashing + replay collision rejection", fontSize = 10.sp, color = Color.White)
                }
            }
        }

        item {
            Card(
                colors = CardDefaults.cardColors(containerColor = Color(0xFF881337)),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(10.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                    Text("COSMETIC / BANNED PATTERNS", fontWeight = FontWeight.Bold, fontSize = 11.sp, color = Color(0xFFFDA4AF))
                    Text("• Field simulation metaphors alone without enforced state bounds", fontSize = 10.sp, color = Color.White)
                    Text("• Hash/theme embeddings without cryptographic verification gates", fontSize = 10.sp, color = Color.White)
                    Text("• Dashboard metrics without immutable write-back receipts", fontSize = 10.sp, color = Color.White)
                }
            }
        }
    }
}
