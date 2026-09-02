package com.example.cranium.canon

@JvmInline
value class CanonHash(val hex: String) {
    init {
        require(hex.matches(Regex("[0-9a-f]{64}"))) {
            "CanonHash must be a 64-char lowercase hex string"
        }
    }
    override fun toString(): String = hex
}
